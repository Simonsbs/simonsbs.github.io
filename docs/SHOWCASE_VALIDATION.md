# Portfolio project showcase validation

11 November 2026. Five independent project pages explain goals, capabilities, usage, architecture, decisions and scope. The overview and Projects collection link separately to every project page, live application and source repository.

## Recorded local checks

- TypeScript, the existing content/asset checks and the production build pass.
- Project validation checks five project definitions, 37 diagram components, 38 edges, ten illustrated paths and 55 flow steps. Every edge and step resolves to a real component in its board.
- All 28 actual local browser checks pass: five page/content/link inspections; all ten complete manual flow paths; reduced-motion behaviour; keyboard component selection; mobile fit/detail controls and navigation; all five mobile pages; actual animated packet movement and pause position; the legacy Knowledge route; an unknown-project fallback; and all five overview cards with separate live/source links.
- The 390 by 844 mobile viewport has no horizontal page overflow. Large boards scroll within their own canvas; Fit board provides an overview.
- Reduced-motion emulation disables autoplay and moving packets while manual steps still work. Temporary viewport and media overrides were restored.
- Actual packet geometry changes during playback and remains fixed while paused. Playback advances the visible step explanation and stops at the end of each illustrated path.
- Browser console inspection found no application errors in the tested flow.
- The first dependency audit found vulnerable `picomatch` 2.3.1 under the existing `gh-pages` publishing tool. A compatible patch to 2.3.2 passes the subsequent audit with zero reported vulnerabilities. See [the upstream advisory](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj).

## Release gates

Git initially classified the mostly textual PDF as text. Explicit binary attributes in both source and published artifacts protect PDF/font/image bytes from Windows line-ending conversion. The build and live checks compare the public CV's SHA-256 with its original bytes.

Windows/Linux CI repeat the production build and dependency audit. Publication uses the existing GitHub Pages `master` artifact branch, preserving `bestdev.co.il` and `.nojekyll`. After publication, `npm run verify:live` compares the served manifest and static assets with the local build and checks all ten outgoing live/source destinations. Actual public browser checks confirm the five hash routes, flow controls and mobile rendering.

`public/showcase.json` exposes a deterministic fingerprint of the application source and the exact five page/demo/repository mappings. Detailed local and final live reports are retained under ignored `artifacts/portfolio-validation/` without access credentials.

## Published result

- Public collection: https://bestdev.co.il/#/projects. All five direct project routes and their two illustrated flow paths pass actual public browser validation.
- All 21 public browser checks pass, including the five page/content/link checks, ten complete flow paths, the published collection links, reduced-motion manual steps, mobile board fit, mobile navigation, direct-link reload and playback/component controls.
- Nine live checks pass for HTTPS, the exact source-fingerprinted manifest, published JS/CSS, the byte-identical public CV and all five live-demo/public-repository pairs. See [machine-readable reports](portfolio-validation).
- Application source fingerprint: `12d02a479d5eb1538df3b669b21d3202683ac0dbf0ac29e629f9a184612f6b1a`.
- GitHub Pages artifact commit: `346bf291c6968c407ff36c92a193402c78ea08ae`. Its [deployment](https://github.com/Simonsbs/simonsbs.github.io/actions/runs/43083271924) succeeded. Windows and Linux [CI](https://github.com/Simonsbs/simonsbs.github.io/actions/runs/43083135673) passed for application source commit `7591bb96671b25a02af94ad1d4f2478e800e36f1`.
- No DNS, zone SSL setting or standalone application was changed by this portfolio publication.

## Scope

These are engineering checks performed by the agent, not human acceptance or an independent accessibility/security audit. The architecture boards are illustrative diagrams of source-checked implementations, not live network telemetry. Synthetic project data and each project's existing limitations remain visible. Existing articles, public assets, CV links and professional case studies are preserved by the content checks.
