# Portfolio refresh, 11 November 2026

Simon authorised all six changes from the portfolio review: archive or repair the unreachable historical API example, improve recruiter navigation, give delivery cases direct pages, update featured writing, show actual applications and add a narrated walkthrough, and reduce homepage repetition.

## Content and evidence

The five existing records in `src/app/data/case-studies.json` remain the source of role, stage, summary, contribution and outcome. `case-study-details.json` adds context supported by the following read-only candidate records. Application records and internal source paths are not bundled into the public application.

| Case                          | Existing confirmation used                                               | Boundaries                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery to production cloud | `Simon_Stirling_Profile_Learning_Log.md`, 2 November 2026, APP-0530 Q001 | Business/technical priorities, architecture alternatives, prototype demonstrations and phased delivery. No provider, contract value, dates, scale, final signing authority or percentage improvements.                     |
| Enterprise document AI        | `Simon_Stirling_Total_CV_Source.md`, 8 November 2026, APP-0559 Q001      | Production .NET/REST/SQL Server document pipelines and LLM generation; validation, access controls, logging and human review. No provider/model, volumes, performance or measured productivity improvement.                |
| Enterprise service support    | Primary source, 5 November 2026, APP-0546 Q002                           | SLA definition/monitoring, root-cause analysis, remediation, development/support coordination and qualitative outcomes. No numerical SLA thresholds, attainment, incident volumes or platform scale.                       |
| Manufacturing quality data    | Primary source, 9 November 2026, APP-0561 Q002                           | SQL Server, process-data integration, CPV support, QA/manufacturing collaboration, traceability and production delivery. No regulatory sign-off or certification, customer identity, site scale or quantified improvement. |
| Document RAG prototype        | Learning log, 2 November 2026, APP-0530 Q002                             | Python/LangChain/ChromaDB/Ollama/Streamlit, source visibility and manual verification. No production hardening, comprehensive authorisation, or audit proving every processing path stayed local.                          |

The source files above are in `D:/Projects/Simon CV/`. They were read only. The pre-existing untracked `docs/CONTENT_SOURCES.md` and `docs/validation/` are outside this change.

The new articles use first-party project documentation:

- Webhook retries: `integration-reliability-lab/README.md`, `CONTRACT.md` and `VALIDATION.md`.
- Retrieval evaluation: `knowledge-assistant-lab/README.md` and `docs/validation/knowledge-lab-live.md`.
- Presales constraints: `presales-solution-workbench/README.md`, `BUILD_NOTES.md` and `VALIDATION.md`.

The articles retain the distinction between synthetic demonstration, public runtime, optional local model inference, recorded regression results, agent review and human review. Existing articles are not re-dated.

## Screenshots and walkthrough

The supported browser tools captured the actual public applications. Raw captures are retained locally under ignored `artifacts/portfolio-refresh/captures/`. Public WebP exports are 1200 by 800 pixels, with the original screenshot contained in the frame. No interface state was generated or composited into a screenshot.

The Integration Lab walkthrough contains seven scenes: introduction, retained outage history, controlled recovery, duplicate suppression, lost response after commit, architecture explanation and audit history. Its original captured sandbox showed:

- Four HTTP 503 attempts followed by a retained dead letter.
- Healthy receiver, repaired replay, one HTTP 200 and one applied order update.
- A duplicate returning HTTP 200 with duplicate suppression and the same single order effect.
- A second synthetic order returning a lost-response 503 after committing, then HTTP 200 on retry, still with one applied update.

The two synthetic orders account for the sandbox's total of two effects; the per-order ledger remains one effect for each. The video uses screenshots of these observed states, not a continuous screen recording. It includes synthetic English narration from Microsoft Hazel Desktop, burned-in captions, a matching WebVTT track and the same transcript on the project page. It lasts approximately 100 seconds, is about 1.94 MB, and uses H.264/AAC with fast-start metadata. It does not autoplay or download the MP4 on initial page load.

To regenerate media after capturing new states:

```powershell
python -m pip install --target artifacts/portfolio-refresh/python imageio-ffmpeg
./scripts/narrate-walkthrough.ps1
python scripts/render-portfolio-media.py
```

Pillow must be installed in the selected Python environment. Frame filenames and narration are in `scripts/walkthrough-scenes.json`. The renderer produces local frames, PCM narration and `media-report.json`; only the WebP previews, MP4 and WebVTT are public artifacts. The application build does not require Python, speech synthesis or FFmpeg.

## Verification

`npm run build` checks TypeScript, the 34 article records, five complete delivery cases, related projects, asset existence, MP4 signature, matching caption/transcript content and the five existing architecture graphs. The build verifies that copied media and new article content retain their hashes. `npm run verify:live` checks the exact manifest, CV, demos/repositories, screenshots, MP4, captions and three new articles after deployment.

Browser validation uses the built output rather than only the development server. Desktop and mobile checks cover direct case routes, collection filters, all five project previews, recent articles, CV links, navigation and the walkthrough's playback/captions/transcript. Final results and deployment identity are recorded after publication.
