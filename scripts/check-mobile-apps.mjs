import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const apps = JSON.parse(await readFile("src/app/data/mobile-apps.json", "utf8"));
const origin = "https://bestdev.co.il";
let pageCount = 0;
let fileCount = 0;

async function checkFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkFiles(source);
    else {
      const destination = path.join("dist", path.relative("public", source));
      assert.deepEqual(
        await readFile(destination),
        await readFile(source),
        `Restored app file changed during build: ${source}`,
      );
      fileCount++;
    }
  }
}

for (const app of apps) {
  assert.ok(app.pages.includes(app.path));
  await checkFiles(path.join("public", app.path));
  for (const page of app.pages) {
    const html = await readFile(path.join("dist", page, "index.html"), "utf8");
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${page}">`));
    // The restored app site promises no analytics and stays outside the portfolio SPA.
    for (const script of html.matchAll(/<script\b([^>]*)>/gi))
      assert.match(script[1], /^\s+type="application\/ld\+json"\s*$/);
    assert.doesNotMatch(
      html,
      /<form\b|googletagmanager|google-analytics|\/src\/main|\/assets\/index-/i,
    );
    assert.ok(html.includes('href="/apps/"'), `No return link: ${page}`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll("&amp;", "&"), origin + page);
      if (url.origin !== origin) continue;
      let target = path.join("dist", decodeURIComponent(url.pathname));
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      const file = await readFile(target);
      if (url.hash)
        assert.ok(
          file.toString("utf8").includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `Missing fragment: ${url}`,
        );
    }
    pageCount++;
  }
}
console.log(
  `PASS: ${pageCount} restored app pages, ${fileCount} exact source files, local links/assets and no executable scripts.`,
);
