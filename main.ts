// make.fun excuse entry, authored here from scratch; no other entry was consulted.
// thinking_revised note: say hello, ship the batch, fill the orders, hold one slot; comments only change.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.txt');

const entry = "I ran out of tokens halfway through the apology, and I'm using the remainder to write this excuse instead.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(target, entry, 'utf8');

console.log(`entry.txt: ${Buffer.byteLength(entry, 'utf8')} bytes (script dir: ${here})`);
