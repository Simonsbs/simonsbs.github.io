import { createContext } from "react";
import { articles, articlePath } from "./data/portfolio";

export const siteOrigin = "https://bestdev.co.il";
export const homeSections = [
  "about",
  "services",
  "resume",
  "contact",
  "blogpreview",
  "work",
];
export const cleanPath = (pathname: string) =>
  pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;

export function canonicalPath(pathname: string) {
  const path = cleanPath(pathname);
  if (homeSections.some((section) => path === `/${section}/`)) return "/";
  if (path === "/blog/page/1/") return "/blog/";
  const match = path.match(/^\/blog\/(\d+)\//);
  const article =
    match && articles.find((item) => String(item.id) === match[1]);
  return article ? cleanPath(articlePath(article)) : path;
}

export type PageMetadata = {
  title: string;
  description: string;
  noindex?: boolean;
};
export const MetadataCollector = createContext<
  ((metadata: PageMetadata) => void) | null
>(null);
