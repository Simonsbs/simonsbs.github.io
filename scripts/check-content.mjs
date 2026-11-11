import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const readJson = async (file) =>
  JSON.parse(await readFile(path.join(root, file), "utf8"));
const articles = await readJson("public/blogs/blogs.json");
const index = await readJson("src/app/data/articles.json");
const projects = await readJson("src/app/data/projects.json");
const certificates = await readJson("src/app/data/certificates.json");
const caseStudies = await readJson("src/app/data/case-studies.json");
const caseDetails = await readJson("src/app/data/case-study-details.json");
const standalone = await readJson("src/app/data/standalone-projects.json");
const development = await readJson(
  "src/app/data/professional-development.json",
);

assert.equal(
  index.length,
  articles.length,
  "The article index must include every source article.",
);
for (const [name, items] of [
  ["articles", articles],
  ["projects", projects],
  ["certificates", certificates],
  ["case studies", caseStudies],
  ["professional development", development],
]) {
  assert.equal(
    new Set(items.map((item) => item.id)).size,
    items.length,
    `Duplicate IDs in ${name}.`,
  );
}
assert.equal(
  new Set(articles.map((article) => article.slug)).size,
  articles.length,
  "Article slugs must be unique.",
);

const localAssets = [
  "/favicon.svg",
  "/media/Simon_Stirling_CV.pdf",
  "/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
];
for (const source of articles) {
  const generated = index.find((article) => article.id === source.id);
  assert.ok(generated, `Article ${source.id} is missing from the index.`);
  assert.equal(
    generated.title,
    source.title,
    "Article titles must be preserved.",
  );
  assert.equal(generated.slug, source.slug, "Article URLs must be preserved.");
  assert.match(
    generated.date,
    /^\d{4}-\d{2}-\d{2}$/,
    "Article dates must be timezone independent.",
  );
  assert.equal(
    Number(generated.date.slice(-2)),
    Number(source.date.match(/^\d+/)?.[0]),
    "Article publication days must be preserved.",
  );
  localAssets.push(`/blogs/${source.content}`, source.featureImage);
  const html = await readFile(
    path.join(root, "public/blogs", source.content),
    "utf8",
  );
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    if (!/^https?:\/\//i.test(match[1])) localAssets.push(match[1]);
  }
}
for (const project of projects) {
  localAssets.push(project.imageUrl);
  assert.ok(
    new URL(project.projectUrl).protocol.startsWith("http"),
    `Invalid project URL: ${project.title}`,
  );
}
for (const certificate of certificates) {
  localAssets.push(certificate.FileUrl);
  assert.equal(
    new URL(certificate.Url).hostname,
    "coursera.org",
    "Credential links must retain their issuing platform.",
  );
}
for (const item of development) {
  if (item.url) {
    const url = new URL(item.url);
    assert.equal(
      url.protocol,
      "https:",
      "Public credential links must use HTTPS.",
    );
    assert.equal(
      url.hostname.replace(/^www\./, ""),
      "coursera.org",
      "Credential URLs must preserve their recorded provider.",
    );
  }
  if (item.file) localAssets.push(item.file);
}
for (const study of caseStudies) {
  assert.ok(
    ["Production", "Proof of concept"].includes(study.status),
    "Delivery examples must state an evidenced delivery stage.",
  );
  assert.ok(
    study.contribution && study.outcome && study.role,
    "Case studies must explain personal contribution, role and delivery result.",
  );
  const detail = caseDetails[study.id];
  assert.ok(detail?.problem && detail.scope, `Missing case page: ${study.id}`);
  assert.ok(
    detail.constraints.length &&
      detail.architecture.length &&
      detail.decisions.length,
    `Incomplete case page: ${study.id}`,
  );
  assert.ok(
    standalone.some((project) => project.id === detail.relatedProject),
    `Missing related project: ${study.id}`,
  );
}
assert.deepEqual(
  Object.keys(caseDetails).sort(),
  caseStudies.map((study) => study.id).sort(),
  "Every delivery case must have exactly one detail page.",
);
for (const project of projects) {
  if (project.archiveReason)
    assert.equal(
      project.featured,
      false,
      "Archived projects must not expose a featured live link.",
    );
}
for (const project of standalone) {
  assert.ok(
    project.screenshot?.alt && project.screenshot.src,
    `Missing application preview: ${project.id}`,
  );
  localAssets.push(project.screenshot.src);
  if (project.walkthrough) {
    const { video, captions, poster, transcript } = project.walkthrough;
    localAssets.push(video, captions, poster);
    const bytes = await readFile(path.join(root, "public", video));
    assert.equal(
      bytes.toString("ascii", 4, 8),
      "ftyp",
      "Walkthrough must be an actual MP4.",
    );
    const vtt = await readFile(path.join(root, "public", captions), "utf8");
    assert.ok(vtt.startsWith("WEBVTT\n"), "Captions must be valid WebVTT.");
    assert.equal(
      [...vtt.matchAll(/-->/g)].length,
      transcript.length,
      "Every narrated scene needs captions.",
    );
    for (const scene of transcript)
      assert.ok(
        vtt.includes(scene.text),
        "The visible transcript and captions must match.",
      );
  }
}
for (const asset of new Set(localAssets)) {
  const relative = asset.replace(/^\.?\//, "");
  const absolute = path.resolve(root, "public", relative);
  assert.ok(
    absolute.startsWith(path.resolve(root, "public") + path.sep),
    `Asset is outside public: ${asset}`,
  );
  await access(absolute).catch(() => {
    throw new Error(`Missing local asset: ${asset}`);
  });
}

console.log(
  `Verified ${articles.length} articles, ${caseStudies.length} delivery cases, ${projects.filter((project) => project.featured).length} featured public project, ${certificates.length + development.length} learning records and ${new Set(localAssets).size} local asset references.`,
);
