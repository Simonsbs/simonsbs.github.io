import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import "./check-mobile-apps.mjs";
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
assert.equal(
  createHash("sha256")
    .update(
      await readFile(
        "dist/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
      ),
    )
    .digest("hex"),
  manifest.publicCvSha256,
);
assert.match(await readFile("dist/.gitattributes", "utf8"), /\*\.pdf binary/);
for (const asset of manifest.media) {
  assert.equal(
    createHash("sha256")
      .update(await readFile("dist" + asset.path))
      .digest("hex"),
    asset.sha256,
    `Media bytes changed during build: ${asset.path}`,
  );
}
assert.deepEqual(manifest.featuredArticles, manifest.articles.slice(0, 3));
assert.equal(
  manifest.articles.length,
  JSON.parse(await readFile("src/app/data/articles.json", "utf8")).length,
);
for (const article of manifest.articles) {
  assert.equal(
    createHash("sha256")
      .update(
        (await readFile("dist" + article.content, "utf8")).replace(
          /\r\n/g,
          "\n",
        ),
      )
      .digest("hex"),
    article.sha256,
    `Article content changed during build: ${article.content}`,
  );
}
assert.equal(manifest.caseStudies.length, 5);
console.log(
  "PASS: production entry, fingerprinted five-project manifest, CSS/JS assets, CNAME and public CV.",
);
