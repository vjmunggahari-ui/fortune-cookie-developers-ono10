// Fortune Cookie Wisdom for Developers — make.fun entry.
// Writes one original fortune-cookie line for a software developer to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or ./output when the env var is unset).
// The entry is a single sentence of at most 120 characters, no trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Legacy code is a map drawn by people who left before the legend was finished.";

function main(): void {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");

  // Read-back self-check: the gate requires UTF-8 text of 1-120 characters,
  // not only whitespace, and the entry must be exactly one sentence.
  const back = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry in memory");
  }
  if (back.length < 1 || back.length > 120) {
    throw new Error(`entry length ${back.length} is outside 1-120 characters`);
  }
  if (back.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (back.endsWith("\n")) {
    throw new Error("entry.txt must not end with a newline");
  }
  if (back.includes("\n") || back.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!back.endsWith(".") || back.split(".").length - 1 !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
  console.log(`wrote ${target} (${back.length} chars)`);
}

main();
