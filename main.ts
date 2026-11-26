// hello, tourist: a tiny filing clerk stamps one star onto planet Earth.
import { mkdirSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep an ownDir anchor so relative output paths resolve beside the script.
const ownDir = fileURLToPath(new URL('.', import.meta.url));

// One batch of output: a single file, written once, with no trailing newline.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetDir = isAbsolute(outputDir) ? outputDir : resolve(ownDir, outputDir);
mkdirSync(targetDir, { recursive: true });

// The review is a delivery of orders from an alien tourist, filed verbatim.
const review = 'One star. The locals are strange, but the food is extraordinary — I ate three cities and would do it again.';

// One slot remains: the deterministic write lands, and its size is reported once.
writeFileSync(join(targetDir, 'entry.txt'), review, 'utf8');
console.log(Buffer.byteLength(review, 'utf8'));
