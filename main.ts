import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Deadpan held throughout: no exclamation, no wink, no explanation.
// One-star review of something essential (make.fun bounty
// u-0xb3e689-one-star-review-of-something-essential-c7234629).
// Pick: the household fan. Lane verified empty in the field census
// (0 fan entries in 3,774 artifacts, 26 Nov 2026): two speeds, both
// wrong, and it has never once tried a third.
const REVIEW =
  "One star. The fan has two speeds: one that does nothing and one that freezes the back of my neck. It has never once tried a third.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.cwd();
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");

if (REVIEW.length < 1 || REVIEW.length > 160) {
  throw new Error(`review must be 1-160 chars, got ${REVIEW.length}`);
}
if (!REVIEW.trim()) {
  throw new Error("review must not be only whitespace");
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  throw new Error("review must be a single line");
}

writeFileSync(target, REVIEW, "utf8");
chmodSync(target, 0o644);
console.log(`wrote ${target} (${REVIEW.length} chars)`);
