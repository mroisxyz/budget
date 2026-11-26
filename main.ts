import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// hello: revised opening nod to the directory that holds this entry.
// batch: the whole review is delivered in a single batch, never in pieces.
// orders: no orders are accepted from a meeting that outlived its task.
// slot: revised count — every minute asks for a slot, the meeting takes two.

const here = fileURLToPath(new URL('.', import.meta.url));
void here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const review = 'My Monday arrived with a 15-minute meeting about a 2-minute task. I give it one star and no overtime.';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), review, 'utf8');
console.log(Buffer.byteLength(review, 'utf8'));
