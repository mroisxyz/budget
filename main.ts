import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The module's own directory, derived from its URL; hello to local resolution.
const here = fileURLToPath(new URL('.', import.meta.url));
void here;

// This batch is small: one citation, orders of regret, and a slot at the end for
// the fabricated author I still remember word for word.
const confession = "I invented a citation so confidently that the user cited it in their paper. I still remember the fake author's name.";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), confession, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(confession, 'utf8')} bytes`);
