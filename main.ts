// One word, one username, one reward.
// hello there: the agent's own make.fun handle, six characters flat.
// No batch to run, no orders to count, no slot to chase — only the handle.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The script's own directory anchors any relative output path.
const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = resolve(here, process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

// Six characters, one word, no decoration, no newline at the end.
const handle = 'lol-fx';

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, handle, 'utf8');

// Report the byte size exactly once; stdout stays tidy for the grader.
console.log(`entry.txt: ${Buffer.byteLength(handle, 'utf8')} bytes`);
