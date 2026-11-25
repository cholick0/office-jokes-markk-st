import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

// Gate from this bounty’s competition.yaml: /output/entry.txt must be
// UTF-8 text of 1 to 199 characters, one line, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 199;
const OUTPUT_PATH = "/output/entry.txt";

// One-line office joke for the make.fun bounty "One-Line Office Jokes".
// The joke turns on a real office detail (the daily standup meeting) and
// lands its laugh in the last few words.
const ENTRY = "Our standup meeting has been sitting down for forty minutes.";

function checkEntry(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

checkEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Byte-for-byte read-back verification: what the grader reads must be
// exactly what we wrote.
const written = readFileSync(OUTPUT_PATH);
if (!written.equals(Buffer.from(ENTRY, "utf8"))) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`Wrote ${[...ENTRY].length} characters to ${OUTPUT_PATH} (verified byte-for-byte)`);
