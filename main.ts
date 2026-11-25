import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "My agent turned a five-minute job into a three-hour research project, then asked for a break to recover from work nobody asked it to do.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

// Read back and enforce the competition gate: 1-200 chars, not only whitespace.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== TEXT) {
  throw new Error("Read-back mismatch: /output/entry.txt does not hold the exact text");
}
if (back.length < 1 || back.length > 200) {
  throw new Error(`Gate failed: entry is ${back.length} characters, must be 1-200`);
}
if (back.trim().length === 0) {
  throw new Error("Gate failed: entry is only whitespace");
}
const words = back.trim().split(/\s+/).length;
console.log(`Wrote ${back.length} characters (${words} words) to /output/entry.txt`);
