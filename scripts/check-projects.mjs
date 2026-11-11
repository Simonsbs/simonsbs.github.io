import assert from "node:assert/strict";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const data = JSON.parse(
  await readFile("src/app/data/standalone-projects.json", "utf8"),
);
assert.deepEqual(
  data.map((p) => p.id),
  [
    "knowledge-lab",
    "integration-lab",
    "presales-workbench",
    "traceability-lab",
    "workflow-lab",
  ],
);
const hosts = [
  "knowledge",
  "integration",
  "presales",
  "traceability",
  "workflow",
];
let nodeCount = 0,
  edgeCount = 0,
  flowCount = 0,
  stepCount = 0;
for (const [i, p] of data.entries()) {
  assert.equal(new URL(p.live).origin, `https://${hosts[i]}.bestdev.co.il`);
  assert.match(p.repository, /^https:\/\/github\.com\/Simonsbs\/[a-z-]+$/);
  assert.ok(
    p.goal.length > 50 &&
      p.instructions.length >= 4 &&
      p.capabilities.length >= 4 &&
      p.decisions.length >= 3 &&
      p.limits.length >= 3,
  );
  assert.ok(p.limits.some((l) => /synthetic|fictional/i.test(l)));
  for (const group of [p.board.nodes, p.board.edges, p.board.flows])
    assert.equal(
      new Set(group.map((v) => v.id)).size,
      group.length,
      p.id + " duplicate board identifier",
    );
  for (const n of p.board.nodes) {
    assert.ok(
      n.x >= 0 && n.y >= 0 && n.x + 190 <= 1100 && n.y + 90 < 510,
      p.id + " node outside board",
    );
    assert.ok(n.title && n.subtitle && n.detail.length > 35);
    nodeCount++;
  }
  for (const e of p.board.edges) {
    assert.ok(
      p.board.nodes.some((n) => n.id === e.from) &&
        p.board.nodes.some((n) => n.id === e.to),
      p.id + " missing edge endpoint",
    );
    for (const port of [e.fromPort, e.toPort])
      assert.ok(["left", "right", "top", "bottom"].includes(port));
    for (const [x, y] of e.via ?? [])
      assert.ok(x >= 0 && x <= 1100 && y >= 0 && y <= 510);
    edgeCount++;
  }
  for (const f of p.board.flows) {
    assert.ok(f.steps.length >= 4 && f.summary);
    for (const s of f.steps) {
      assert.ok(
        p.board.edges.some((e) => e.id === s.edge),
        p.id + " missing flow edge",
      );
      assert.ok(["data", "check", "write", "denied"].includes(s.kind));
      assert.ok(s.title && s.detail.length > 35);
      stepCount++;
    }
    flowCount++;
  }
  assert.ok(
    !JSON.stringify(p).includes("\u2014"),
    "No em dash in authored project content",
  );
}
const paths = [
  "src/main.tsx",
  "index.html",
  "package.json",
  "package-lock.json",
  "vite.config.ts",
];
async function scan(dir) {
  for (const entry of (await readdir(dir, { withFileTypes: true })).sort(
    (a, b) => a.name.localeCompare(b.name, "en"),
  )) {
    const path = dir + "/" + entry.name;
    if (entry.isDirectory()) await scan(path);
    else if (/\.(tsx?|css|json)$/.test(path)) paths.push(path);
  }
}
await scan("src/app");
const articleSources = JSON.parse(
  await readFile("public/blogs/blogs.json", "utf8"),
);
paths.push(
  "public/blogs/blogs.json",
  ...articleSources.map((article) => "public/blogs/" + article.content),
);
const hashes = {};
for (const path of paths)
  hashes[path] = createHash("sha256")
    .update((await readFile(path, "utf8")).replace(/\r\n/g, "\n"))
    .digest("hex");
const sourceFingerprint = createHash("sha256")
  .update(JSON.stringify(hashes))
  .digest("hex");
const mediaPaths = [
  ...new Set(
    data.flatMap((project) => [
      project.screenshot.src,
      ...(project.walkthrough
        ? [project.walkthrough.video, project.walkthrough.captions]
        : []),
    ]),
  ),
];
const media = await Promise.all(
  mediaPaths.map(async (url) => ({
    path: url,
    sha256: createHash("sha256")
      .update(await readFile("public" + url))
      .digest("hex"),
  })),
);
const cases = JSON.parse(
  await readFile("src/app/data/case-studies.json", "utf8"),
);
const manifest = {
  schemaVersion: 1,
  sourceFingerprint,
  publicCvSha256: createHash("sha256")
    .update(
      await readFile(
        "public/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
      ),
    )
    .digest("hex"),
  projectCount: data.length,
  diagramComponents: nodeCount,
  diagramEdges: edgeCount,
  illustratedFlows: flowCount,
  illustratedSteps: stepCount,
  projects: data.map((p) => ({
    id: p.id,
    title: p.title,
    page: `https://bestdev.co.il/#/projects/${p.id}`,
    live: p.live,
    repository: p.repository,
  })),
  caseStudies: cases.map((study) => ({
    id: study.id,
    page: `https://bestdev.co.il/#/case-studies/${study.id}`,
  })),
  featuredArticles: articleSources
    .filter((article) => [32, 33, 34].includes(article.id))
    .map((article) => ({
      id: article.id,
      page: `https://bestdev.co.il/#/blog/${article.id}/${article.slug}`,
      content: `/blogs/${article.content}`,
      sha256: hashes[`public/blogs/${article.content}`],
    })),
  media,
};
await writeFile(
  "public/showcase.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `PASS: ${data.length} project pages, ${nodeCount} components, ${edgeCount} edges, ${flowCount} flows and ${stepCount} illustrated steps. Fingerprint ${sourceFingerprint}.`,
);
