import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// thinking_revised: hello, batch — hello to one short text, batched into a single file.
// No orders to fill and no slot left; the charger came only once it was too late.
const here = fileURLToPath(new URL('.', import.meta.url));

// The battery held on all day. This is the only line it has left to say.
const lastText = 'I held on at 2% all day, and you show up now. I deserve a better charger.';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(outputDir, { recursive: true });

await writeFile(join(outputDir, 'entry.txt'), lastText, 'utf8');
console.log(`entry.txt: ${Buffer.byteLength(lastText, 'utf8')} bytes`);
