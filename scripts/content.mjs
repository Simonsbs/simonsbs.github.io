import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const articles = JSON.parse(
  await readFile(path.join(root, "public/blogs/blogs.json"), "utf8"),
);
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
function isoDate(value) {
  const match = value.match(/^(\d{1,2})\s+([a-z]+),?\s+(\d{4})$/i);
  if (!match) throw new Error(`Unrecognised article date: ${value}`);
  const month = months.indexOf(match[2].toLowerCase());
  if (month < 0) throw new Error(`Unrecognised article month: ${value}`);
  return `${match[3]}-${String(month + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}
const plainText = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const index = await Promise.all(
  articles.map(async (article) => {
    const html = await readFile(
      path.join(root, "public/blogs", article.content),
      "utf8",
    );
    const intro = plainText(
      html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? article.title,
    );
    return {
      ...article,
      date: isoDate(article.date),
      featureImage: article.featureImage.replace(/^\.\//, "/"),
      excerpt:
        intro.length > 170
          ? `${intro.slice(0, 167).replace(/\s+\S*$/, "")}...`
          : intro,
      readingMinutes: Math.max(
        1,
        Math.ceil(plainText(html).split(/\s+/).length / 220),
      ),
    };
  }),
);

await mkdir(path.join(root, "src/app/data"), { recursive: true });
await writeFile(
  path.join(root, "src/app/data/articles.json"),
  `${JSON.stringify(index, null, 2)}\n`,
);
console.log(`Indexed ${index.length} existing articles.`);
