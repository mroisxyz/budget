import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Greet the output tree with hello: this script gathers a batch of static files.
// Screenshot orders rest inside their own slot until the dossier is written.
const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });

const shotDir = join(out, 'screenshots');
mkdirSync(shotDir, { recursive: true });
const localShots = join(here, 'screenshots');
if (existsSync(localShots)) {
  cpSync(localShots, shotDir, { recursive: true });
}

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log(`dossier.json ${dossier.byteLength} bytes`);
