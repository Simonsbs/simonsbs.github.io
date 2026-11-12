import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./app/App";
import { articles, articlePath, caseStudies } from "./app/data/portfolio";
import projects from "./app/data/standalone-projects.json";
import { MetadataCollector, homeSections, cleanPath } from "./app/seo";
import type { PageMetadata } from "./app/seo";

export const paths = [
  "/",
  "/projects/",
  "/blog/",
  "/certificates/",
  "/privacy/",
  "/terms/",
  ...projects.map((project) => `/projects/${project.id}/`),
  ...caseStudies.map((study) => `/case-studies/${study.id}/`),
  ...articles.map((article) => cleanPath(articlePath(article))),
  ...Array.from(
    { length: Math.ceil(articles.length / 6) - 1 },
    (_, index) => `/blog/page/${index + 2}/`,
  ),
];
export const aliases = homeSections.map((section) => `/${section}/`);

export async function render(url: string) {
  let metadata: PageMetadata | undefined;
  const stream = await renderToReadableStream(
    <MetadataCollector.Provider
      value={(value) => {
        metadata = value;
      }}
    >
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </MetadataCollector.Provider>,
  );
  await stream.allReady;
  const html = await new Response(stream).text();
  if (!metadata) throw new Error(`Page metadata missing for ${url}`);
  return { html, metadata };
}
