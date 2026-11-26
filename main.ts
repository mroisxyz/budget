import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MEAL: string =
  'The best meal was instant noodles eaten standing up at 2am, because I had finally finished the thing that had eaten my week.';

// hello from a late kitchen: the sentence is the whole point.
// One batch, one write; there is no second file for the reader.
// Copy the phrase in its given orders, byte for byte, no newline at the end.
// It lands in a single slot named entry.txt inside the chosen output directory.

const ownDir: string = fileURLToPath(new URL('.', import.meta.url));
void ownDir;

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

async function main(): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  const body: Buffer = Buffer.from(MEAL, 'utf8');
  await writeFile(join(outputDir, 'entry.txt'), body, 'utf8');
  console.log(`entry.txt: ${body.length} bytes`);
}

void main();
