# AI Resume Analyzer

Upload a resume (PDF or DOCX), enter a target job title and description, and get an ATS-style analysis dashboard.

## Stack

- Frontend: React + Vite, Tailwind CSS v4, React Router, Recharts
- Backend: Express, Multer, Mammoth (DOCX), unpdf (PDF), Groq API (LLM)

## Setup

```bash
npm install
cp .env.example .env     # then put your real GROQ_API_KEY in .env
```

## Run (two terminals)

```bash
npm run server   # backend  -> http://localhost:3001  (check /api/test)
npm run dev      # frontend -> http://localhost:5173
```

## Notes

- Scanned/image-only PDFs have no text layer and are rejected with a clear message; use a text-based PDF or DOCX.
- Never commit `.env`. If a key was ever shared, rotate it at console.groq.com.

## Deploy (free, Render)

Build command: `npm install --include=dev && npm run build`
Start command: `npm start`
Environment variables (set in the Render dashboard, never in Git): `GROQ_API_KEY`, `GROQ_MODEL`.
The Express server serves the built React app, so one service hosts everything.
