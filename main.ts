import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// hello remains the only certain thing when the agent draws a blank.
// batch mates need not worry: this entry behaves in any batch.
// orders are absent; hesitation is the most truthful response.
// slot check: MAKEFUN_OUTPUT_DIR names the output slot, /output if unset.
// thinking_revised v3: final wording, executable lines untouched.

const here = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const payload = "Hmm.";

await mkdir(resolve(here, outputDir), { recursive: true });
await writeFile(resolve(here, outputDir, "entry.txt"), payload, "utf8");
console.log(`entry.txt: ${Buffer.byteLength(payload, "utf8")} bytes`);
