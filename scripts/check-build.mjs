import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8"),
  manifest = JSON.parse(await readFile("dist/showcase.json", "utf8"));
assert.match(html, /Simon Stirling/);
assert.equal(manifest.projectCount, 5);
assert.equal((await readFile("dist/CNAME", "utf8")).trim(), "bestdev.co.il");
for (const asset of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g))
  await access("dist" + asset[1]);
assert.equal(
  await readFile("dist/showcase.json", "utf8"),
  await readFile("public/showcase.json", "utf8"),
);
await access(
  "dist/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
);
console.log(
  "PASS: production entry, fingerprinted five-project manifest, CSS/JS assets, CNAME and public CV.",
);
