# Simon Stirling’s portfolio

The profile leads with pre-sales, enterprise solutions architecture and post-sales implementation/support. CTO and co-owner roles remain as secondary career-history context. Featured cases cover customer discovery, enterprise delivery and ongoing service reliability.

The portfolio at [bestdev.co.il](https://bestdev.co.il/) uses React 19, TypeScript and Vite 8. It showcases five independently deployed demonstrators alongside source-grounded professional delivery cases. Hash routing preserves direct project/article links on GitHub Pages.

## Standalone project pages

| Project page                                                              | Independent demo                                                  | Source repository                                                                              |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Knowledge Lab](https://bestdev.co.il/#/projects/knowledge-lab)           | [knowledge.bestdev.co.il](https://knowledge.bestdev.co.il/)       | [knowledge-assistant-lab](https://github.com/Simonsbs/knowledge-assistant-lab)                 |
| [Integration Lab](https://bestdev.co.il/#/projects/integration-lab)       | [integration.bestdev.co.il](https://integration.bestdev.co.il/)   | [integration-reliability-lab](https://github.com/Simonsbs/integration-reliability-lab)         |
| [Presales Workbench](https://bestdev.co.il/#/projects/presales-workbench) | [presales.bestdev.co.il](https://presales.bestdev.co.il/)         | [presales-solution-workbench](https://github.com/Simonsbs/presales-solution-workbench)         |
| [Traceability Lab](https://bestdev.co.il/#/projects/traceability-lab)     | [traceability.bestdev.co.il](https://traceability.bestdev.co.il/) | [manufacturing-traceability-demo](https://github.com/Simonsbs/manufacturing-traceability-demo) |
| [Workflow Lab](https://bestdev.co.il/#/projects/workflow-lab)             | [workflow.bestdev.co.il](https://workflow.bestdev.co.il/)         | [mcp-workflow-demo](https://github.com/Simonsbs/mcp-workflow-demo)                             |

Each page explains the goal, four capabilities, a five-step usage guide, design decisions, recorded validation and scope. A whiteboard-style SVG diagram has two illustrated flow paths, moving packets, timed progression, pause/restart/manual stepping, keyboard-selectable component notes, fit/detail views and a readable step list. Reduced-motion preference disables autoplay and packets while retaining manual navigation. The diagram illustrates the implemented architecture; it does not make live requests to the demo or represent live telemetry.

`src/app/data/standalone-projects.json` is the shared content and graph source for all five pages. Every claim is bounded by the project's README and validation documents. Knowledge Lab's public evidence mode and optional local Ollama path are shown separately; demo role switching and manual MCP bearer capabilities remain explicitly labelled.

## Local development

Requires Node.js 22.12 or newer. Use npm for this version of the site.

```powershell
npm ci
npm run dev
```

Open the local address printed by Vite, normally `http://127.0.0.1:5174/`. `npm start` is an alias for the development server. Port 5173 is reserved for the separate Knowledge Lab project.

```powershell
npm run check    # TypeScript, content integrity and local asset checks
npm run build    # Checks and production output in dist/
npm run preview  # Local preview of the production build
```

## Source and content

- `src/main.tsx` is the entry point. The active application, routes, components and stylesheet live in `src/app/`.
- `src/app/data/portfolio.ts` contains profile details, expertise, experience and the technology groups.
- `src/app/data/projects.json` and `certificates.json` contain the migrated project and credential records.
- `src/app/data/case-studies.json` contains source-checked professional delivery examples. Production systems and the RAG proof of concept are labelled separately.
- `src/app/data/professional-development.json` adds AI, cloud and security learning from the CV project. Missing dates and credential links remain unset.
- The homepage, experience, work-rights statement and downloadable public CV are aligned with the confirmed CV-project evidence. `docs/CONTENT_SOURCES.md` records claim sources and limits; `PROJECT_ROADMAP.md` records the build order and current implementation status.
- Mad-AI-Libs and Business Cards are archived from featured content. C.R.U.D Connect remains the public API example.
- `public/blogs/blogs.json` and its existing HTML files remain the article sources. `scripts/content.mjs` generates the article index, excerpts, reading times and timezone independent dates before development, checks and builds.
- Images, CV files and certificate PDFs remain in `public/`. Existing privacy and terms text is preserved in `src/app/data/`.
- The original Create React App source is retained outside `src/app/` for reference and is excluded from the new build. The application uses the validated `package-lock.json`. The superseded Yarn lock is preserved locally and in Git history; it is ignored in the current npm-only source release.

## Knowledge assistant and evaluation lab

The first roadmap demonstrator is an independent application at [knowledge.bestdev.co.il](https://knowledge.bestdev.co.il/), available publicly without sign-in. Its [source repository](https://github.com/Simonsbs/knowledge-assistant-lab) and local checkout at `D:\Projects\knowledge-assistant-lab` contain its frontend, synthetic corpus, Python/LangChain adapter, tests and deployment. Homepage and Projects cards link to its dedicated portfolio page and separately to its live demo and repository. The old `/#/labs/knowledge` route redirects to the project page.

The public lab uses exact source quotations in browser evidence mode. Local Ollama inference is opt-in from its own checkout using `npm run dev:local`. Its [live validation](https://github.com/Simonsbs/knowledge-assistant-lab/blob/main/docs/validation/knowledge-lab-live.md) records 68/68 pipeline cases, 46/46 generated-answer checks and seven expected context rejections using Qwen3 8B. The two original retrieval abstentions are fixed. All accepted answers have a source-by-source agent review. Simon accepted version 1 on agent validation; human review was not performed or claimed. Lab implementation and validation commands live entirely in that project.

## Contact form

The form retains the existing EmailJS service, template and public key, plus the existing reCAPTCHA site key. reCAPTCHA loads only when a visitor submits the form. Failed submissions preserve the message; success appears only after EmailJS accepts it.

Optional `.env.local` overrides:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_RECAPTCHA_SITE_KEY=your_site_key
```

These are public browser configuration values. Never put server secrets in `VITE_` variables. Real delivery depends on the existing EmailJS account, template and reCAPTCHA domain configuration. The direct email and phone links remain available.

Article discussions still use the existing Utterances repository and article slug, and load when the visitor chooses “Load discussion”. Fonts are served locally.

## Deployment

`npm run build` checks types, existing content/assets and all five project/graph definitions, then builds `dist/` and validates its entry, assets, custom domain and source-fingerprinted showcase manifest. `npm run deploy` rebuilds and publishes that output to the existing `master` artifact branch with `.nojekyll`. Source belongs on `main`; Windows/Linux CI validate builds and dependency audits. Publication does not change DNS, domain SSL or any of the five independent applications.

After GitHub Pages completes deployment, `npm run verify:live` checks HTTPS, published assets, the exact `showcase.json` fingerprint, the retained public CV, and all five live demo/repository destinations. Browser validation exercises the actual hash routes and controls. See [showcase validation](docs/SHOWCASE_VALIDATION.md).
