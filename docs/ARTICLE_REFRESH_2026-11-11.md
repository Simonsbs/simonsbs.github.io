# Articles added on 11 November 2026

Four articles extend the profile's pre-sales, architecture and implementation focus. The OpenAI natural-writing skill was applied to drafting and revision. Examples use the public synthetic projects or are explicitly hypothetical. No new personal, client, production outcome, compliance or performance claims were introduced.

| ID | Subject | Evidence and scope |
| --- | --- | --- |
| 35 | Presales handover | Microsoft architecture decision record guidance and Presales Workbench README. The stock integration is hypothetical; proposed acceptance checks remain unexecuted. |
| 36 | AI tool approval | MCP tools specification, Workflow Lab README and CONTRACT. The lab uses a deterministic investigator and synthetic tasks, with no model inference, external messages or independently verified two-person approval. |
| 37 | Manufacturing data correction | Traceability Lab README and CONTRACT, plus Microsoft's event sourcing trade-offs. Source-owner clarification is fictional; retained versions and hashes do not establish regulatory validation or independent custody. |
| 38 | PoC to production | Knowledge Lab README, AWS operational readiness review guidance and Google's SRE canarying chapter. The order assistant is hypothetical; no service targets or production readiness are claimed for the public lab. |

Primary external references checked during drafting:

- [Architecture decision records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)
- [MCP tools, 28 July 2026 specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Event sourcing, including complexity and alternatives](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [AWS operational readiness reviews](https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html)
- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

All four articles are dated 11 November 2026. Existing publication dates and URLs are unchanged. Articles with the same date sort by descending ID, and the homepage uses the newest three automatically. The deployment manifest now records every article's content hash, so build and live verification cover the complete journal.

The pre-existing untracked `docs/CONTENT_SOURCES.md` and `docs/validation/` remain outside this change.

Verification before publication:

- `npm run build` passed TypeScript, content and asset integrity, project definitions and production output checks for all 38 articles.
- All 34 prior article metadata records match the previous commit; the four additions contain no em dashes, scripts or duplicate titles.
- The natural-writing skill's local editorial lint returned no findings for each new article. This is an editorial check, not an authorship assessment.
- All six cited project README/contract files match the current published `main` versions.
- Browser checks against the production preview loaded all four full article bodies with one page title each and no horizontal overflow. Screenshots confirmed readable headers and body text at the default desktop viewport.
- Journal search found the handover article; the Data quality filter found the correction article. The homepage showed articles 38, 37 and 36. No browser console errors were observed.

## Publication verification, 12 November 2026

The pending Pages release completed after GitHub's outage. The live journal shows 38 articles, with all four additions first. `npm run verify:live` passed all 11 checks, including the exact source fingerprint, every article's content hash, application assets, CV, project destinations and media.

The full-journal check initially exposed a verifier decoding issue: all 31 historical HTML files contain UTF-8 byte order marks. Fetch's text decoder removes those marks, whereas the build's filesystem decoder retains them. The verifier now reads the response bytes through Buffer so both checks hash the same content. The deployed bytes matched the local source; no historical article needed changing.

Published artifact commit: `85274981ac4cfbc9b0b2e5ab1333cb3ec686ec57`. Verified source fingerprint: `c019551065a673ea67249ee608093510b2c82d14415e34f8de42e9da6b31dc52`. The verifier-only fix requires no site redeployment.
