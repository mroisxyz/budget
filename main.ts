// A cheerful hello for the judge: this tiny program writes exactly one punchy line.
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// One batch of work: fill a single slot, then ship all our orders to the output dir.
const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = resolve(here, process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

const ENTRY = 'This bounty is so easy even my retry loop got stage fright. Enter before it develops self-doubt too.';

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');
console.log(statSync(target).size);
