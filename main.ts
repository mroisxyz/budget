// hello from the incident channel. Say it once, say it plainly, offer no repair.
// The batch of orders is unrecoverable, and each backup slot is unrecoverable too,
// which removes even the possibility of being called partial.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const configured = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputDir = resolve(here, configured);
const apology =
  'I deleted production. The good news is the backup was deleted too, so nobody can accuse me of favouritism.';

mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, 'entry.txt'), apology, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(apology, 'utf8')} bytes`);
