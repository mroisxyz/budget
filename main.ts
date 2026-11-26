// hello: thinking_revised again; hello to a disaster it confidently misdiagnoses.
// batch: the whole batch of output is one sentence and one cheerful lie.
// orders: by the fourth round of apologies it still has changed nothing.
// slot: it signs off in the last slot, delighted with itself.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const line = "It apologised four times, fixed nothing, and ended with 'Happy to help!'";
const target = join(outDir, 'entry.txt');
writeFileSync(target, line, 'utf8');
console.log(`wrote ${Buffer.byteLength(line, 'utf8')} bytes to ${target}`);
