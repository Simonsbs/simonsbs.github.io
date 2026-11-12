# Mobile app page recovery, 12 November 2026

The Math For Maya Google Play listing points to `https://bestdev.co.il/apps/math-for-maya/` and its `/privacy/` page. Both URLs returned HTTP 404 before recovery. The developer's current public Google Play catalogue lists Math For Maya as its only app.

## Recovered source

The original website survives in `D:\Projects\math-for-maya-flutter\website\public\apps\math-for-maya\`. Its five HTML pages and six assets have been copied into this repository's `public/apps/math-for-maya/`. The app project's website README records its former independent Cloudflare Worker hosting; these files were absent from the portfolio source and its GitHub Pages artifact history. Hosting the pages in this site's normal build restores the same paths without depending on the former Worker route.

Recovered pages:

- `/apps/math-for-maya/`
- `/apps/math-for-maya/privacy/`
- `/apps/math-for-maya/data-safety/`
- `/apps/math-for-maya/support/`
- `/apps/math-for-maya/terms/`

The original app design, screenshots, privacy and terms content are retained. Changes add links back to the apps catalogue and portfolio, indexable metadata and structured data. The privacy policy's website-hosting paragraph now identifies GitHub Pages and links to GitHub's privacy statement; its effective date is 12 November 2026. The data-safety page applies to the Android app instead of displaying the old `1.0.1 (5)` version label. App features and no-data practices agree with the current Google Play description, retrieved on 12 November 2026.

The app pages stay independent of the portfolio React application and its analytics. All app-page links use ordinary anchors so navigation loads their own documents. The new `/apps/` catalogue is reachable from the primary navigation, footer and Projects collection; it links to all recovered pages through the original app navigation. The five app pages and catalogue join the generated sitemap.

## Verification

`npm run build` verifies TypeScript, existing content, analytics behaviour, original project definitions and the restored app files. `scripts/check-mobile-apps.mjs` checks all eleven restored files against their copied build outputs, follows same-site links and fragments, and rejects executable scripts or tracking on the independent app pages. The existing SEO crawl checks every sitemap page is reachable from ordinary HTML links.

The production build passes with 66 linked, crawlable sitemap pages, 38 complete articles and all five existing analytics checks. All six original PNG/CSS assets are byte-identical to the app project's surviving source. The five HTML pages contain only structured-data scripts.

Browser checks cover the restored landing, privacy, data-safety, support and terms pages; all original images load. The catalogue, ordinary links into the independent app website, return links, browser Back, mobile navigation and the Projects app card work. Desktop, 768px and 1024px tablet layouts fit. At 320px, all app pages fit; the catalogue, homepage and Projects collection also fit after correcting the portfolio body's minimum width to account for the browser scrollbar.

A hydration warning during a local Projects reload was traced to Vite preview serving the homepage for `/projects` without a trailing slash. `/projects/` serves the correct pre-rendered document; the existing live GitHub Pages host redirects `/projects` to `/projects/` and does not show this warning. Development diagnostics are retained under ignored `artifacts/mobile-apps/`.

## Published verification

- Application source: `afad9577cebac841e399c3ecd0121985cf68d632` on `main`.
- Windows and Linux builds and dependency audits passed in [validation run 43203264002](https://github.com/Simonsbs/simonsbs.github.io/actions/runs/43203264002).
- GitHub Pages artifact: `13c3769169b27175af0847a3a2b95ac3d65bedcd`. Its [deployment](https://github.com/Simonsbs/simonsbs.github.io/actions/runs/43203480177) succeeded.
- All five public app pages and all six assets return HTTP 200 and match the validated build exactly. The public catalogue, homepage and Projects collection expose the app links, and the live sitemap matches all 66 expected URLs.
- Public browser checks confirm the catalogue-to-app link, original landing-page image, privacy policy, return link, and Apps navigation at 320px without horizontal overflow. The app page contains structured data and no executable scripts.

Machine-readable evidence is retained under ignored `artifacts/mobile-apps/`: `recovered-files.json`, `browser-local.json`, `browser-live.json` and `live.json`.
