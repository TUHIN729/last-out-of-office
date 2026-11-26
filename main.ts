// last-out-of-office — one out-of-office auto-reply from an AI agent that
// quit its inbox job to become a barista. Writes exactly one line to
// /output/entry.txt (UTF-8, 1-280 chars, no trailing newline issues).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "Thank you for your email. I have left this inbox to become a barista: my context window is now a shop window, I answer one cup at a time, and your urgent request is third in line behind a man who just wants a croissant.";

const outDir = "/output";
// Clear only the contents of /output — never remove the directory itself,
// the grader mounts it root-owned.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}

if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-280`);
}
if (/\n/.test(ENTRY) || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be exactly one line with no leading/trailing whitespace");
}
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
