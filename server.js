import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import "dotenv/config";
import Groq from "groq-sdk";
import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Behind a host like Render there is one proxy in front of the app; this makes req.ip the real visitor IP.
app.set("trust proxy", 1);
app.disable("x-powered-by");

const PORT = Number(process.env.PORT) || 3001;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  cors((req, callback) => {
    const origin = req.header("Origin");
    let allowed = !origin || ALLOWED_ORIGINS.includes(origin);

    if (!allowed) {
      try {
        const { hostname, host } = new URL(origin);
        allowed = hostname === "localhost" || hostname === "127.0.0.1" || host === req.headers.host;
      } catch {
        allowed = false;
      }
    }

    callback(null, { origin: allowed });
  }),
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const extension = file.originalname.toLowerCase().split(".").pop();
    const isSupported = extension === "pdf" || extension === "docx";

    callback(isSupported ? null : new Error("Unsupported file type. Please upload a PDF or DOCX resume."), isSupported);
  },
});

if (!process.env.GROQ_API_KEY) {
  console.warn("WARNING: GROQ_API_KEY is missing. Add it to your .env file.");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "missing-key",
});

const MAX_RESUME_CHARS = 20000;

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume reviewer.
You compare a resume against a target role and respond with ONLY a single valid JSON object, no markdown and no commentary.

The JSON object must have exactly this shape:
{
  "atsScore": number 0-100,
  "skillMatch": number 0-100,
  "keywordMatch": number 0-100,
  "formattingScore": number 0-100,
  "experienceScore": number 0-100,
  "matchedSkills": string[],
  "missingSkills": string[],
  "keywordsFound": string[],
  "keywordsMissing": string[],
  "strengths": string[],
  "suggestions": string[],
  "sectionAnalysis": [{ "section": string, "score": number 0-100, "feedback": string }]
}

Rules: scores are integers. Only list skills that are genuinely in the resume under matchedSkills. Never invent experience.
sectionAnalysis should cover sections such as Summary, Skills, Experience, Education and Projects when present.`;

function clampScore(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : 0;
}

function toStringList(value) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function normalizeAnalysis(raw) {
  if (!raw || typeof raw !== "object") return null;

  return {
    atsScore: clampScore(raw.atsScore),
    skillMatch: clampScore(raw.skillMatch),
    keywordMatch: clampScore(raw.keywordMatch),
    formattingScore: clampScore(raw.formattingScore),
    experienceScore: clampScore(raw.experienceScore),
    matchedSkills: toStringList(raw.matchedSkills),
    missingSkills: toStringList(raw.missingSkills),
    keywordsFound: toStringList(raw.keywordsFound),
    keywordsMissing: toStringList(raw.keywordsMissing),
    strengths: toStringList(raw.strengths),
    suggestions: toStringList(raw.suggestions),
    sectionAnalysis: Array.isArray(raw.sectionAnalysis)
      ? raw.sectionAnalysis
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            section: String(item.section ?? "Section"),
            score: clampScore(item.score),
            feedback: String(item.feedback ?? ""),
          }))
      : [],
  };
}

function isValidAnalysis(analysis) {
  const scoreKeys = ["atsScore", "skillMatch", "keywordMatch", "formattingScore", "experienceScore"];
  const listKeys = ["matchedSkills", "missingSkills", "keywordsFound", "keywordsMissing", "strengths", "suggestions"];

  return Boolean(
    analysis &&
      scoreKeys.every((key) => Number.isFinite(analysis[key]) && analysis[key] >= 0 && analysis[key] <= 100) &&
      listKeys.every((key) => Array.isArray(analysis[key]) && analysis[key].every((item) => typeof item === "string")) &&
      Array.isArray(analysis.sectionAnalysis) &&
      analysis.sectionAnalysis.every(
        (item) =>
          item &&
          typeof item.section === "string" &&
          Number.isFinite(item.score) &&
          item.score >= 0 &&
          item.score <= 100 &&
          typeof item.feedback === "string",
      ),
  );
}

function buildAnalysisPrompt(targetJobTitle, jobDescription, resumeText) {
  return `Perform a realistic ATS-style comparison of this resume and the target role.

Target job title: ${targetJobTitle}

Job description:
${jobDescription || "(none provided - judge the resume against typical requirements for the target job title)"}

Resume text:
"""
${resumeText}
"""

Score the resume against this role, not against generic resume advice. Consider role relevance, demonstrated experience, skills, exact and related keywords, and ATS-friendly formatting. Return only the JSON object.`;
}

function getSafeErrorDetails(error) {
  return {
    message: error?.message || "Unknown AI provider error",
    status: error?.status || error?.response?.status || error?.code || null,
  };
}

function getAiErrorResponse(error) {
  const status = Number(error?.status || error?.response?.status);

  if (status === 429) {
    return {
      status: 429,
      body: {
        success: false,
        code: "QUOTA_EXCEEDED",
        message: "AI usage limit reached. Please wait a moment and try again.",
      },
    };
  }

  if (status === 401 || status === 403) {
    return {
      status: 502,
      body: { success: false, message: "AI authentication failed. Check GROQ_API_KEY in your .env file." },
    };
  }

  const reason = String(error?.error?.error?.message || error?.message || "unknown error").slice(0, 300);
  console.error("AI request failed:", { status: status || null, reason });
  return {
    status: 502,
    body: {
      success: false,
      message: `The AI analysis request failed (${status || "no status"}): ${reason}`,
    },
  };
}

function logRequestStage(stage, details = {}) {
  console.log(`[analysis] ${stage}`, details);
}

// ---- Abuse protection: protects your free Groq quota from bots and heavy use ----
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR) || 10; // analyses per visitor per hour
const DAILY_ANALYSIS_CAP = Number(process.env.DAILY_ANALYSIS_CAP) || 300; // analyses per day, all visitors combined
const visitorHits = new Map();
let dailyCount = 0;
let dailyResetAt = Date.now() + 24 * 60 * 60 * 1000;

function analysisRateLimiter(req, res, next) {
  const now = Date.now();

  if (now > dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = now + 24 * 60 * 60 * 1000;
  }

  if (dailyCount >= DAILY_ANALYSIS_CAP) {
    return res.status(429).json({
      success: false,
      code: "RATE_LIMITED",
      message: "The daily analysis limit has been reached. Please try again tomorrow.",
    });
  }

  const recent = (visitorHits.get(req.ip) || []).filter((time) => now - time < 60 * 60 * 1000);

  if (recent.length >= RATE_LIMIT_PER_HOUR) {
    return res.status(429).json({
      success: false,
      code: "RATE_LIMITED",
      message: `You have reached the limit of ${RATE_LIMIT_PER_HOUR} analyses per hour. Please try again later.`,
    });
  }

  recent.push(now);
  visitorHits.set(req.ip, recent);
  dailyCount += 1;
  next();
}

setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [ip, times] of visitorHits) {
    if (!times.some((time) => time > cutoff)) visitorHits.delete(ip);
  }
}, 10 * 60 * 1000).unref();

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});



app.post("/api/analyze", analysisRateLimiter, upload.single("resume"), async (req, res) => {
  const { jobTitle, targetJobTitle, jobDescription = "" } = req.body || {};
  const requestedJobTitle = jobTitle || targetJobTitle;

  logRequestStage("Request received", {
    fileName: req.file?.originalname || null,
    fileType: req.file?.mimetype || null,
    targetJobTitle: requestedJobTitle?.trim() || null,
  });

  if (!req.file) {
    return res.status(400).json({ success: false, message: "A resume file is required." });
  }

  if (!requestedJobTitle?.trim()) {
    return res.status(400).json({ success: false, message: "A target job title is required." });
  }

  try {
    const extension = req.file.originalname.toLowerCase().split(".").pop();
    let resumeText = "";

    if (extension === "pdf") {
      if (req.file.buffer.subarray(0, 5).toString() !== "%PDF-") {
        return res.status(422).json({ success: false, message: "The uploaded PDF is invalid or unreadable." });
      }

      logRequestStage("PDF extraction started", { fileName: req.file.originalname });
      try {
        const pdf = await getDocumentProxy(new Uint8Array(req.file.buffer));
        const { text } = await extractText(pdf, { mergePages: true });
        resumeText = String(text || "").trim();
      } catch {
        return res.status(422).json({ success: false, message: "The uploaded PDF could not be read." });
      }

      if (!resumeText) {
        return res.status(422).json({
          success: false,
          message: "No readable text found in this PDF. It may be a scanned image - please upload a text-based PDF or a DOCX.",
        });
      }
    } else {
      logRequestStage("DOCX extraction started", { fileName: req.file.originalname });
      try {
        const extracted = await mammoth.extractRawText({ buffer: req.file.buffer });
        resumeText = extracted.value.trim();
      } catch {
        return res.status(422).json({ success: false, message: "The uploaded DOCX resume could not be read." });
      }

      if (!resumeText) {
        return res.status(422).json({ success: false, message: "The DOCX resume contains no readable text." });
      }
    }

    logRequestStage("Resume text extracted", { characters: resumeText.length });
    resumeText = resumeText.slice(0, MAX_RESUME_CHARS);

    logRequestStage("Groq request started", { model: GROQ_MODEL, extension });
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildAnalysisPrompt(requestedJobTitle.trim(), jobDescription.trim(), resumeText) },
      ],
    });

    const content = completion.choices?.[0]?.message?.content;
    logRequestStage("Groq response received", { hasText: Boolean(content) });

    if (!content) {
      throw new Error("Groq returned an empty response.");
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return res.status(502).json({ success: false, message: "The AI returned malformed analysis data. Please try again." });
    }

    const analysis = normalizeAnalysis(parsed);
    if (!isValidAnalysis(analysis)) {
      return res.status(502).json({ success: false, message: "The AI returned incomplete analysis data. Please try again." });
    }

    logRequestStage("Analysis successful");
    return res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI analysis error:", getSafeErrorDetails(error));
    const errorResponse = getAiErrorResponse(error);
    return res.status(errorResponse.status).json(errorResponse.body);
  }
});

// ---- Serve the built React app (after `npm run build`) so one server hosts everything ----
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(path.join(distPath, "index.html"))) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    return res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((error, req, res, next) => {
  if (error?.message === "Unexpected end of form" || error?.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ success: false, message: "A resume file is required." });
  }

  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ success: false, message: "Resume file is too large. Please upload a file smaller than 5 MB." });
  }

  if (error?.message?.startsWith("Unsupported file type")) {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error?.code === "ENOENT" || error?.message?.includes("mammoth")) {
    return res.status(422).json({ success: false, message: "The uploaded DOCX resume could not be read." });
  }

  console.error("Unexpected server error:", error?.message || error);
  return res.status(500).json({ success: false, message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});