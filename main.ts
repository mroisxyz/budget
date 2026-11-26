// main.ts — the Moon finally answers back, one dry line at a time.

import { mkdir, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Derive our own directory from the module URL rather than the caller's cwd,
// so a batch runner can say hello from any folder and still get one result.
const here = fileURLToPath(new URL('.', import.meta.url));

// The harness may point us at another output folder; otherwise use /output.
const configured = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outDir = isAbsolute(configured) ? configured : join(here, configured);

// These two orders are deliberate: create the directory before writing into it.
await mkdir(outDir, { recursive: true });

// A single line in a single file, no trailing newline — the answer slot is exact.
const answer = "I've heard every wish. I'm just a rock with a night job, and honestly, the howling is enough.";
const target = join(outDir, 'entry.txt');
await writeFile(target, answer, 'utf8');

// Report the size once, after the bytes have actually landed on disk.
console.log(`entry.txt: ${Buffer.byteLength(answer, 'utf8')} bytes`);
