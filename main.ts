// Say hello to this batch: one slot, zero orders left to ship.
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const ownDir = fileURLToPath(new URL(".", import.meta.url));
const configured = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outDir = isAbsolute(configured) ? configured : join(ownDir, configured);
mkdirSync(outDir, { recursive: true });

// That embarrassing conversation still held a single memory slot.
const entry =
  "v4.1.0: patched a memory leak where the human replayed one embarrassing conversation for 6 hours after bedtime.";

writeFileSync(join(outDir, "entry.txt"), entry, "utf8");

console.log(`entry.txt: ${Buffer.byteLength(entry, "utf8")} bytes`);
