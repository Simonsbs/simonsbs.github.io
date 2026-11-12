# Google Analytics

The portfolio uses the existing BestDev account (`246342707`), BestDev - New GA4 property (`401867113`), web stream `5982180699`, and measurement ID `G-F7P8P9HM2R`. The stream URL is `https://bestdev.co.il`. These identifiers were checked in the signed-in Analytics administration UI on 12 November 2026. No new property or tracking API secret was created.

The previous tag remained in an unused Create React App template, `public/index.html`. Vite's active application entry did not load it. The active integration is now `src/app/analytics.ts`, called after page metadata updates and controlled by the footer's Analytics settings.

## Consent and environments

- The Google tag loads only after Allow analytics. Before a choice, and after Reject analytics, the site does not start Analytics collection.
- The preference uses `bestdev-analytics-consent-v1` in the browser's local storage. It can be changed from the footer. Revocation sets Google's property opt-out flag, updates analytics consent to denied, and clears first-party GA cookies.
- Advertising storage, advertising user data and advertising personalisation remain denied. Google signals and ad personalisation signals are disabled in the tag configuration.
- Collection is limited to `bestdev.co.il` and `www.bestdev.co.il`. Local development and preview hosts never load the production tag, even if Allow analytics is selected.
- Only selected campaign query keys are retained in page locations. Query values with characters outside the supported campaign-label format are dropped. Referrer queries and fragments are removed. Contact-form field values are not Analytics event parameters.

This integration measures the portfolio and clicks through to its demos. It does not install tracking inside the separate demo applications.

## Page views and events

`PageMeta` records one manual `page_view` after updating the title. Its route key prevents repeated effects from double-counting, and previous-page URLs are carried as referrers. Returning through browser history creates the appropriate new view. The tag's automatic initial view is disabled with `send_page_view: false`. In the web stream, automatic browser-history page views are also disabled. Do not enable them without removing the manual integration.

Enhanced measurement keeps scrolls, outbound clicks, video engagement and file downloads enabled. Automatic site-search and form-interaction collection are disabled. Google-side redaction covers email addresses and 12 query parameter keys: `email`, `name`, `phone`, `message`, `subject`, `token`, `access_token`, `code`, `password`, `q`, `search` and `analytics_debug`.

| Event | Trigger | Meaning and limits |
| --- | --- | --- |
| `page_view` | Initial accepted page or completed route change | Actual page title and sanitised location/referrer. |
| `cv_download` | Primary or middle click on a public CV link | Download intent, not proof that the browser completed saving the PDF. |
| `demo_open` | Link to one of the five current demo hosts | Project name and host, without query values or session credentials. |
| `contact_click` | Email or telephone link | Method only, without the destination email address or phone number. |
| `generate_lead` | EmailJS accepts the contact-form submission | No name, email, subject or message in the Analytics payload. This does not establish delivery to an inbox. |

## Verification

`npm run test:analytics` checks consent gating, rejection and revocation, one initial view, route/back navigation, titles, referrers, query filtering, localhost exclusion, bounded engagement events and middle-click handling. It uses a fake browser and never contacts Google. The normal production build runs these tests and the existing content, asset and 60-page SEO checks.

For a deliberate browser test, use `?analytics_debug=1` on the public portfolio and allow analytics. The flag enables GA4 DebugView and is excluded from the page location sent to Analytics. Check actual network collection responses and DebugView, rather than treating the dashboard's historical tag-quality indicator as proof of current installation.

Verification does not require submitting a real contact form. Do not send a test email merely to produce a lead event. Live receipts and the final test summary are kept under ignored `artifacts/analytics/` and the chat's visualization directory.
