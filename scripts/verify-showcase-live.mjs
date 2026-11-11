import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const origin = new URL(process.argv[2] ?? "https://bestdev.co.il").origin;
const expected = JSON.parse(await readFile("public/showcase.json", "utf8")),
  results = [];
async function get(url) {
  const r = await fetch(url, { redirect: "error" });
  assert.equal(r.status, 200, url);
  return r;
}
const html = await (await get(origin + "/")).text();
assert.match(html, /Simon Stirling/);
results.push("Public portfolio HTTPS");
const manifest = await (await get(origin + "/showcase.json")).json();
assert.deepEqual(manifest, expected);
results.push("Exact five-project source fingerprint and links");
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
  const r = await get(origin + match[1]);
  assert.ok((await r.arrayBuffer()).byteLength > 0);
}
results.push("Published application and styles");
const cv = await get(
  origin + "/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
);
results.push("Public CV preserved");
assert.equal(
  createHash("sha256")
    .update(new Uint8Array(await cv.arrayBuffer()))
    .digest("hex"),
  manifest.publicCvSha256,
);
for (const p of manifest.projects) {
  await get(p.live);
  const repo = await (
    await get(
      "https://api.github.com/repos/" + new URL(p.repository).pathname.slice(1),
    )
  ).json();
  assert.equal(repo.private, false);
  results.push(p.id + ": public demo and repository");
}
for (const asset of manifest.media) {
  const response = await get(origin + asset.path);
  assert.equal(
    createHash("sha256")
      .update(new Uint8Array(await response.arrayBuffer()))
      .digest("hex"),
    asset.sha256,
    `Published media mismatch: ${asset.path}`,
  );
}
results.push(
  "Exact application screenshots, narrated MP4 and English captions",
);
for (const article of manifest.featuredArticles) {
  const html = await (await get(origin + article.content)).text();
  assert.equal(
    createHash("sha256").update(html.replace(/\r\n/g, "\n")).digest("hex"),
    article.sha256,
    `Published article mismatch: ${article.content}`,
  );
}
results.push("All three new technical articles");
const report = {
  at: new Date().toISOString(),
  origin,
  passed: results.length,
  results,
  sourceFingerprint: manifest.sourceFingerprint,
};
await mkdir("artifacts/portfolio-validation", { recursive: true });
await writeFile(
  "artifacts/portfolio-validation/live.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
