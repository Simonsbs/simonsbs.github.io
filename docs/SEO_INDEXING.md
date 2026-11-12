# Search indexing, 12 November 2026

The portfolio uses real browser-history routes. The production build pre-renders all 60 canonical pages: the overview, project collection, five project guides, five delivery cases, seven journal collection pages, 38 complete articles, certificates, privacy and terms. Each URL has its own HTML file, title, description, canonical and structured data. The sitemap is generated from the same route inventory.

The existing about, services, resume, contact, blogpreview and work routes remain section shortcuts on the overview and point their canonical to `/`. They are excluded from the sitemap because they contain the same page. Existing `/#/` links are migrated in the browser. A dedicated `404.html` carries `noindex,follow`; unknown URLs retain the host's real HTTP 404 response. Journal pagination uses ordinary links so a crawler can reach every article without clicking a button. Article bodies are bundled with their page and present in the initial HTML.

`npm run build` checks source content, TypeScript, assets, all canonical routes, complete article bodies, sitemap uniqueness, structured data, section canonicals and 404 exclusion. It also crawls the generated HTML links from the overview to verify every sitemap page is reachable. `npm run deploy` publishes the built files to the existing GitHub Pages branch.

Each of the five current standalone demonstrators has its own single-page sitemap, robots file, canonical, social metadata, structured data and a visible static project overview with guide/repository links. Their interactive tabs and visitor-specific workspaces are application state, rather than separate public pages. Worker build pipelines explicitly include `.txt` and `.xml` assets so the crawler files are deployed with their correct content types. The portfolio robots file also points to the existing SignalWeave sitemap.

## Published verification

Google Search Console accepted all eight sitemaps on 12 November 2026 and reported 85 discovered URLs: 60 portfolio pages, five standalone demo roots, six SignalWeave pages and 14 Keylore pages. Discovery is separate from indexing. The initial coverage report showed 11 indexed URLs; it has not yet caught up with this release.

The live crawl audit fetched all 85 URLs with HTTP 200, matching canonicals and no indexing prohibition. The portfolio's unknown-page response is HTTP 404 with `noindex,follow`. GitHub Pages deployment and the portfolio's Windows/Linux validation passed. All five demo builds passed, including their crawler asset checks, and public smoke checks passed. Integration Lab additionally passed all 25 acceptance cases against the public API and both local runtimes.

SignalWeave's WebAssembly entry page received its own description, canonical, social metadata and ordinary guide links. Its Pages publication passed. A separate CI failure exposed a missing workload restore step; the workflow now restores the solution's browser workloads before building. The original SignalWeave working copy and its unrelated edits were preserved in place; these changes used a separate worktree.

Machine-readable live evidence and initial failed validation attempts are retained locally under ignored `artifacts/seo/`. The Search Console receipt screenshot is in this chat's visualization directory. Original untracked `docs/CONTENT_SOURCES.md` and `docs/validation/` remain outside the change.

Submit `https://bestdev.co.il/sitemap.xml` and each demo's sitemap in the verified `bestdev.co.il` Search Console domain property. Request indexing for a small selection of newly published URLs. Google chooses which URLs to index; submission and successful live tests do not prove indexing, and its coverage report updates later.

Historical third-party domains and unrelated applications are outside the current five-project catalogue. Search Console's existing exclusions must be assessed by URL: a sitemap XML document does not need a search result, and redirects should normally remain excluded in favour of their destination.
