import { build } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
await build({
  publicDir: false,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "artifacts/seo/server",
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
  },
});
const { render, paths, aliases, staticPaths } = await import(
  pathToFileURL(path.resolve("artifacts/seo/server/entry-server.mjs")).href
);
const siteOrigin = "https://bestdev.co.il";
const canonicalPath = (pathname) =>
  aliases.includes(pathname) ? "/" : pathname;
const template = await readFile("dist/index.html", "utf8");
const articles = JSON.parse(
  await readFile("src/app/data/articles.json", "utf8"),
);
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const json = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

for (const pathname of [...paths, ...aliases, "/404.html"]) {
  const { html: body, metadata } = await render(pathname);
  const url = siteOrigin + canonicalPath(pathname);
  const title = `${metadata.title} | Simon Stirling`;
  const article = articles.find(
    (item) => pathname === `/blog/${item.id}/${item.slug}/`,
  );
  const schema = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        image: siteOrigin + article.featureImage,
        author: {
          "@type": "Person",
          name: article.author,
          url: siteOrigin + "/",
        },
        mainEntityOfPage: url,
      }
    : {
        "@context": "https://schema.org",
        "@type": pathname === "/" ? "ProfilePage" : "WebPage",
        name: title,
        description: metadata.description,
        url,
        ...(pathname === "/"
          ? {
              mainEntity: {
                "@type": "Person",
                name: "Simon Stirling",
                url,
                jobTitle: "Pre-sales & Post-sales Solutions Architect",
                sameAs: [
                  "https://github.com/Simonsbs/",
                  "https://www.linkedin.com/in/simon-stirling/",
                ],
              },
            }
          : {}),
      };
  let page = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*/,
      `$1${escape(metadata.description)}`,
    )
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*/,
      `$1${escape(title)}`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*/,
      `$1${escape(metadata.description)}`,
    )
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    .replace(
      "</head>",
      `<script type="application/ld+json">${json(schema)}</script>\n</head>`,
    );
  if (metadata.noindex)
    page = page.replace(
      'content="index,follow,max-image-preview:large"',
      'content="noindex,follow"',
    );
  if (article)
    page = page.replace(
      'property="og:type" content="website"',
      'property="og:type" content="article"',
    );
  const file =
    pathname === "/404.html"
      ? "dist/404.html"
      : path.join("dist", pathname, "index.html");
  if (!path.resolve(file).startsWith(path.resolve(root, "dist") + path.sep))
    throw new Error("Output escaped dist");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
}

const legacy = "dist/labs/knowledge/index.html";
await mkdir(path.dirname(legacy), { recursive: true });
await writeFile(
  legacy,
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/projects/knowledge-lab/"><link rel="canonical" href="https://bestdev.co.il/projects/knowledge-lab/"><title>Knowledge Lab</title></head><body><a href="/projects/knowledge-lab/">Open Knowledge Lab</a></body></html>',
);
const allPaths = [...paths, ...staticPaths];
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths.map((pathname) => `  <url><loc>${siteOrigin}${pathname}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  "artifacts/seo/routes.json",
  JSON.stringify({ paths: allPaths, staticPaths, aliases, articles: articles.length }, null, 2) + "\n",
);
console.log(
  `Pre-rendered ${paths.length} canonical pages, retained ${staticPaths.length} static app pages, ${aliases.length} section aliases and a real 404 page.`,
);
