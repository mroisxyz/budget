import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Say hello from a tiny program that packs one image into the final batch.
// It follows the bounty orders and claims a single output slot for entry.png.
const here = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outputDir, 'entry.png'));

const bytes = statSync(join(outputDir, 'entry.png')).size;
console.log(`entry.png: ${bytes} bytes`);
