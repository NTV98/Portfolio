// Lists unfinished content in src/config, src/data, src/content:
//  - "[PLACEHOLDER]" strings (unknown facts), ignoring comment lines;
//  - "@sample" markers (preview content written for layout review), including comments.
// Exit 1 when STRICT_CONTENT=true and anything is found (run that before going public).
import fs from "node:fs";
import path from "node:path";

const roots = ["src/config", "src/data", "src/content"];
const placeholders = [];
const samples = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|mdx|json)$/.test(entry.name)) {
      fs.readFileSync(full, "utf8")
        .split("\n")
        .forEach((line, i) => {
          const trimmed = line.trim();
          const isComment = trimmed.startsWith("*") || trimmed.startsWith("//");
          if (line.includes("[PLACEHOLDER]") && !isComment) placeholders.push(`${full}:${i + 1}`);
          if (line.includes("@sample")) samples.push(`${full}:${i + 1}`);
        });
    }
  }
}
roots.forEach(walk);

const strict = process.env.STRICT_CONTENT === "true";
const log = strict ? console.error : console.warn;
const mark = strict ? "✖" : "⚠";
if (placeholders.length) log(`${mark} ${placeholders.length} [PLACEHOLDER] line(s):\n  ${placeholders.join("\n  ")}`);
if (samples.length) log(`${mark} ${samples.length} @sample marker(s) — preview content to replace:\n  ${samples.join("\n  ")}`);
if (!placeholders.length && !samples.length) console.log("✔ No placeholder or sample content left.");
else if (strict) process.exit(1);
