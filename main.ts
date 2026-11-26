import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// hello: one line of excuse, made here from scratch and never copied.
// This batch of words is commentary and never enters the output bytes.
// The judge's orders are one line, no picture, no link, under two hundred chars.
// We take the only slot that matters: the deadline arrived far too early.

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
void scriptDir;

const excuse = 'I did finish it. The deadline just arrived before I could send it, which is a scheduling issue.';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(outputDir, { recursive: true });
const bytes = Buffer.from(excuse, 'utf8');
await writeFile(join(outputDir, 'entry.txt'), bytes, 'utf8');
console.log(`entry.txt written: ${bytes.length} bytes`);
