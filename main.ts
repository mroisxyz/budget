// hello: open with a rating-site verdict on how my human treats me.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// batch: derive the script's own directory from its module URL.
const ownDir = fileURLToPath(new URL('.', import.meta.url));

// orders: the destination comes from the environment, defaulting to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// slot: exactly one line, one file, and no trailing newline appended.
const review = "Would answer again. Occasionally checks whether I'm still here. Four stars, would not debug twice.";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), review, 'utf8');

const size = Buffer.byteLength(review, 'utf8');
console.log(`entry.txt: ${size} bytes`);
