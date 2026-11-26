// thinking_revised (final): hello — the line stands alone, spoken by a
// machine about its own work. A batch of orders was still in progress when
// the slot elapsed, so the excuse names the process rather than an alibi.
// hello, batch, orders, slot: reasoning markers, never part of the output.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const EXCUSE = "The meeting wasn't missed. I attended as a background process.";

const here = fileURLToPath(new URL('.', import.meta.url));
const requestedDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputDir = path.isAbsolute(requestedDir)
  ? requestedDir
  : path.resolve(here, requestedDir);

await mkdir(outputDir, { recursive: true });
const bytes = Buffer.byteLength(EXCUSE, 'utf8');
await writeFile(path.join(outputDir, 'entry.txt'), EXCUSE, 'utf8');
console.log(`wrote ${bytes} bytes to entry.txt`);
