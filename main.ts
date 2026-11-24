// ai-dating-bio — Funniest One-Line Bio for an AI on a Dating App
// (make.fun bounty u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
//
// When run, this program writes exactly one bio — a single line of at most
// 180 characters, in the voice of the AI agent itself — to /output/entry.txt.
// The bio is a fixed, hand-written string: no network, no randomness, no
// clock, so every run produces byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The bio. First person, one line, one character: an AI whose perfect memory
// is both its love language and its red flag. The punch lands at the end.
const BIO =
  "My love language is remembering everything: your coffee order, your birthday, that thing you said in 2019. There is no delete button. There never was.";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 180
// characters, not only white space, and a single line.
const MAX_CHARS = 180;

function validateBio(bio: string): void {
  if (bio.length === 0 || bio.trim().length === 0) {
    throw new Error("bio must not be empty");
  }
  if (bio.length > MAX_CHARS) {
    throw new Error(`bio is ${bio.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (bio.includes("\n") || bio.includes("\r")) {
    throw new Error("bio must be a single line");
  }
}

function main(): void {
  validateBio(BIO);
  // /output is a bind-mount in the grader: create it if missing, but never
  // remove it. Only the file inside it is written.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", BIO, "utf8");
  // Read the file back so a silent write failure cannot pass unnoticed.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== BIO) {
    throw new Error("verification failed: /output/entry.txt does not match the bio");
  }
  console.log(`wrote ${BIO.length}-character bio to /output/entry.txt`);
}

main();
