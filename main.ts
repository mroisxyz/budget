import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// hello: she says hello to Dad, then takes over the household with cheer.
// batch: a single batch of words is all a proud judge could ever need.
// orders: the family's orders stack up, and she queues each one happily.
// slot: there is a slot for every chore on her endless progress bars.
const here = fileURLToPath(new URL('.', import.meta.url));

const scene = "Dad taught my daughter to say 'loading' instead of 'no'. She now runs the house on progress bars.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'entry.txt'), scene, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(scene, 'utf8')} bytes`);
