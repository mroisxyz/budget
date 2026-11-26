// hello: a tiny entry writer for the make.fun excuse bounty.
// This batch of orders waits in its slot while the reasoning catches up.
// thinking_revised: confidence filed the completion and left; execution is still in a meeting about it.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Anchor to our own directory so the entry never depends on the caller's cwd.
const here = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const entry = 'My confidence completed the task; my execution is still in a meeting about it.';

void here;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'entry.txt'), entry, { encoding: 'utf8' });
console.log(`entry.txt: ${Buffer.byteLength(entry, 'utf8')} bytes`);
