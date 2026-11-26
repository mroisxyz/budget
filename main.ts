// thinking_revised: hello, batch, orders, slot
// hello — greet the judge, then hand over the verdict in a single word.
// batch — one batch, nine letters: "Recurring" is the entire deliverable.
// orders — order matters here: the exact string, no extra whitespace.
// slot — a lone output slot, entry.txt, written with no trailing newline.

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Anchor the program to its own directory even though the output goes elsewhere.
const here = fileURLToPath(new URL('.', import.meta.url));
void here;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(outDir, { recursive: true });

const verdict = 'Recurring';
await writeFile(join(outDir, 'entry.txt'), verdict, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(verdict, 'utf8')} bytes`);
