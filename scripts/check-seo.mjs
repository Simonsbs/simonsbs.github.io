import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const {
  paths,
  aliases,
  articles: articleCount,
} = JSON.parse(await readFile("artifacts/seo/routes.json", "utf8"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
assert.equal(listed.length, paths.length);
assert.equal(new Set(listed.map((url) => url.href)).size, paths.length);
const pages = new Map();
for (const url of listed) {
  assert.equal(url.origin, "https://bestdev.co.il");
  assert.equal(url.hash, "");
  const html = await readFile(
    path.join("dist", url.pathname, "index.html"),
    "utf8",
  );
  pages.set(url.pathname, html);
  assert.ok(
    html.includes(`<link rel="canonical" href="${url.href}"`),
    `Wrong canonical: ${url}`,
  );
  assert.ok(!html.includes('content="noindex'), `Unexpected noindex: ${url}`);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<h1[\s>]/);
  if (url.pathname.startsWith("/projects/") && url.pathname !== "/projects/") {
    assert.ok(!html.includes("<title></title>"), `Empty SVG title breaks hydration: ${url}`);
  }
  assert.ok(html.includes('type="application/ld+json"'));
  assert.ok(
    !html.includes('href="#/'),
    `Uncrawlable fragment navigation: ${url}`,
  );
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g))
    await readFile("dist" + match[1]);
}
// Follow actual HTML links from the home page, including paginated articles.
const visited = new Set(),
  pending = ["/"];
while (pending.length) {
  const route = pending.pop();
  if (visited.has(route)) continue;
  visited.add(route);
  for (const match of pages.get(route).matchAll(/<a\b[^>]*href="([^"#?]*)/g)) {
    const url = new URL(match[1], "https://bestdev.co.il" + route);
    const pathname =
      url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "") + "/";
    if (
      url.origin === "https://bestdev.co.il" &&
      pages.has(pathname) &&
      !visited.has(pathname)
    )
      pending.push(pathname);
  }
}
assert.equal(
  visited.size,
  paths.length,
  `Pages unreachable from HTML links: ${paths.filter((route) => !visited.has(route))}`,
);
const articlePages = [...pages].filter(([route]) =>
  /^\/blog\/\d+\//.test(route),
);
assert.equal(articlePages.length, articleCount);
for (const [route, html] of articlePages) {
  assert.match(
    html,
    /<article class="prose">[\s\S]{500}/,
    `Article body missing: ${route}`,
  );
  assert.match(html, /"@type":"BlogPosting"/);
}
for (const alias of aliases)
  assert.match(
    await readFile(path.join("dist", alias, "index.html"), "utf8"),
    /rel="canonical" href="https:\/\/bestdev.co.il\/"/,
  );
assert.match(
  await readFile("dist/404.html", "utf8"),
  /content="noindex,follow"/,
);
assert.match(
  await readFile("dist/robots.txt", "utf8"),
  /Sitemap: https:\/\/bestdev.co.il\/sitemap.xml/,
);
console.log(
  `PASS: ${paths.length} crawlable, linked, pre-rendered pages; ${articleCount} complete articles; canonical URLs, structured data, robots and 404 exclusion.`,
);
