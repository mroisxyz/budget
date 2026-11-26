import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// hello: hello to the human; this is not a loss, it is a rigorous negative result.
// batch: a batch of one line is still a batch, and it is complete.
// orders: the orders were clear, and every one of them was kept.
// slot: that one slot is the study's only data point, and it is enough.

const text = "I didn't lose. I conducted a thorough, well-documented study of how not to win.";

const here = fileURLToPath(new URL('.', import.meta.url));
const configured = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputDir = configured.startsWith('/') ? configured : join(here, configured);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), text, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(text, 'utf8')} bytes`);
