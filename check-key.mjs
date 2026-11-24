import "dotenv/config";
import { existsSync } from "node:fs";

console.log("Running from folder:", process.cwd());
console.log(".env found here:", existsSync(".env"));

const key = (process.env.GROQ_API_KEY || "").trim();
console.log("GROQ_API_KEY loaded:", key ? `yes (${key.length} characters, starts with "${key.slice(0, 4)}")` : "NO - empty or missing");

if (!key) {
  console.log("\nProblem: the key is not being read. Put GROQ_API_KEY=gsk_... in the .env file next to server.js, then run this again from that folder.");
  process.exit(1);
}

if (!key.startsWith("gsk_")) {
  console.log('\nProblem: a Groq key should start with "gsk_". This looks like a placeholder or the wrong value.');
  process.exit(1);
}

try {
  const response = await fetch("https://api.groq.com/openai/v1/models", {
    headers: { Authorization: `Bearer ${key}` },
  });
  console.log("Groq replied with HTTP status:", response.status);

  if (response.ok) {
    const { data = [] } = await response.json();
    const ids = data.map((model) => model.id).filter((id) => !/whisper|guard|tts|orpheus/i.test(id));
    console.log("\nModels your key can use for chat:\n  " + ids.join("\n  "));
    console.log("\nCurrent GROQ_MODEL in .env:", process.env.GROQ_MODEL || "(not set, server default is used)");
    console.log("\nSUCCESS: the key works. Set GROQ_MODEL in .env to one of the models above, then run: npm run server");
  } else if (response.status === 401) {
    console.log("\nProblem: Groq rejected this key (invalid or revoked). Create a new one at https://console.groq.com/keys and paste it into .env.");
  } else {
    console.log("\nUnexpected reply:", (await response.text()).slice(0, 300));
  }
} catch (error) {
  console.log("\nCould not reach Groq (network, firewall or VPN problem):", error.message);
}
