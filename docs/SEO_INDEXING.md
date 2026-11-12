# Search indexing, 12 November 2026

The portfolio uses real browser-history routes. The production build pre-renders all 60 canonical pages: the overview, project collection, five project guides, five delivery cases, seven journal collection pages, 38 complete articles, certificates, privacy and terms. Each URL has its own HTML file, title, description, canonical and structured data. The sitemap is generated from the same route inventory.

The existing about, services, resume, contact, blogpreview and work routes remain section shortcuts on the overview and point their canonical to `/`. They are excluded from the sitemap because they contain the same page. Existing `/#/` links are migrated in the browser. A dedicated `404.html` carries `noindex,follow`; unknown URLs retain the host's real HTTP 404 response. Journal pagination uses ordinary links so a crawler can reach every article without clicking a button. Article bodies are bundled with their page and present in the initial HTML.

`npm run build` checks source content, TypeScript, assets, all canonical routes, complete article bodies, sitemap uniqueness, structured data, section canonicals and 404 exclusion. It also crawls the generated HTML links from the overview to verify every sitemap page is reachable. `npm run deploy` publishes the built files to the existing GitHub Pages branch.

Each of the five current standalone demonstrators has its own single-page sitemap, robots file, canonical, social metadata, structured data and a visible static project overview with guide/repository links. Their interactive tabs and visitor-specific workspaces are application state, rather than separate public pages. Worker build pipelines explicitly include `.txt` and `.xml` assets so the crawler files are deployed with their correct content types. The portfolio robots file also points to the existing SignalWeave sitemap.

Submit `https://bestdev.co.il/sitemap.xml` and each demo's sitemap in the verified `bestdev.co.il` Search Console domain property. Request indexing for a small selection of newly published URLs. Google chooses which URLs to index; submission and successful live tests do not prove indexing, and its coverage report updates later.

Historical third-party domains and unrelated applications are outside the current five-project catalogue. Search Console's existing exclusions must be assessed by URL: a sitemap XML document does not need a search result, and redirects should normally remain excluded in favour of their destination.
