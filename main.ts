// hello, world of one line: no work remains to be done.
// batch processing here means a single batch of fifteen bytes.
// orders were never placed, so none are left outstanding.
// slot zero is the only slot; the rest of the slots stay empty.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const text = 'Done. I did it.';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), text, 'utf8');
console.log(`${Buffer.byteLength(text, 'utf8')} bytes`);
