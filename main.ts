import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// thinking_revised: hello, our batch of orders secures every slot by the curb.
const ownDir = fileURLToPath(new URL('.', import.meta.url));
void ownDir;

const pitch = 'We monetise crumbs at scale. Investors call it a moat; we call it the sidewalk.';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'entry.txt'), pitch, 'utf8');
console.log(Buffer.byteLength(pitch, 'utf8'));
