import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
let serial = 0;
class ClickTarget {
  constructor(anchor) {
    this.anchor = anchor;
  }
  closest() {
    return this.anchor;
  }
}
async function environment(host = "bestdev.co.il") {
  const scripts = [],
    cookieWrites = [],
    storage = new Map(),
    listeners = new Map();
  globalThis.Element = ClickTarget;
  globalThis.window = {
    location: new URL(`https://${host}/?analytics_debug=1`),
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  };
  globalThis.document = {
    referrer:
      "https://referral.example/source/?email=private%40example.com#secret",
    head: { appendChild: (script) => scripts.push(script) },
    createElement: () => ({}),
    addEventListener: (type, listener) => listeners.set(type, listener),
    get cookie() {
      return "_ga=existing; _ga_F7P8P9HM2R=existing; site_preference=keep";
    },
    set cookie(value) {
      cookieWrites.push(value);
    },
  };
  const analytics = await import(
    pathToFileURL(resolve("src/app/analytics.ts")).href + `?test=${serial++}`
  );
  const events = (name) =>
    (window.dataLayer ?? []).filter(
      (command) => command[0] === "event" && command[1] === name,
    );
  const click = (href, type = "click", button = 0) =>
    listeners.get(type)?.({ target: new ClickTarget({ href }), type, button });
  return { analytics, scripts, cookieWrites, storage, events, click };
}

test("no tag or analytics events before consent, and rejection stays private", async () => {
  const e = await environment();
  e.analytics.recordPage({ key: "initial", title: "Overview", path: "/" });
  e.analytics.trackEvent("generate_lead", { method: "contact_form" });
  assert.equal(e.scripts.length, 0);
  assert.equal(window.dataLayer, undefined);
  assert.equal(e.analytics.savedConsent(), null);
  e.analytics.setAnalyticsConsent(false);
  assert.equal(e.analytics.savedConsent(), false);
  assert.equal(e.scripts.length, 0);
  assert.equal(window.dataLayer, undefined);
});

test("one initial view, one per route and correct title/referrer on back navigation", async () => {
  const e = await environment();
  const initial = {
    key: "overview",
    title: "Overview | Simon Stirling",
    path: "/?q=private&email=test%40example.com&utm_source=newsletter&analytics_debug=1#contact",
  };
  e.analytics.recordPage(initial);
  e.analytics.setAnalyticsConsent(true);
  e.analytics.recordPage(initial);
  e.analytics.setAnalyticsConsent(true, false);
  assert.equal(e.scripts.length, 1);
  assert.equal(e.events("page_view").length, 1);
  assert.match(e.scripts[0].src, /id=G-F7P8P9HM2R$/);
  const configuration = window.dataLayer.find(
    (command) => command[0] === "config",
  );
  assert.equal(configuration[2].send_page_view, false);
  assert.equal(configuration[2].allow_google_signals, false);
  assert.equal(configuration[2].allow_ad_personalization_signals, false);
  const first = e.events("page_view")[0][2];
  assert.equal(
    first.page_location,
    "https://bestdev.co.il/?utm_source=newsletter",
  );
  assert.equal(first.page_referrer, "https://referral.example/source/");
  e.analytics.recordPage({
    key: "projects",
    title: "Projects | Simon Stirling",
    path: "/projects/",
  });
  e.analytics.recordPage(initial);
  const views = e.events("page_view");
  assert.equal(views.length, 3);
  assert.equal(views[1][2].page_title, "Projects | Simon Stirling");
  assert.equal(views[1][2].page_referrer, first.page_location);
  assert.equal(views[2][2].page_referrer, "https://bestdev.co.il/projects/");
  assert.ok(!JSON.stringify(views).includes("private"));
  assert.ok(!JSON.stringify(views).includes("test@example.com"));
});

test("revoking consent blocks future events, deletes only analytics cookies and can be reversed", async () => {
  const e = await environment();
  e.analytics.recordPage({ key: "initial", title: "Overview", path: "/" });
  e.analytics.setAnalyticsConsent(true);
  const before = e.events("page_view").length;
  e.analytics.setAnalyticsConsent(false);
  e.analytics.recordPage({ key: "journal", title: "Journal", path: "/blog/" });
  e.analytics.trackEvent("generate_lead", { method: "contact_form" });
  assert.equal(e.events("page_view").length, before);
  assert.equal(e.events("generate_lead").length, 0);
  assert.equal(window["ga-disable-G-F7P8P9HM2R"], true);
  assert.ok(
    e.cookieWrites.some((value) => value.startsWith("_ga=; Max-Age=0")),
  );
  assert.ok(
    !e.cookieWrites.some((value) => value.startsWith("site_preference=")),
  );
  e.analytics.setAnalyticsConsent(true);
  assert.equal(e.scripts.length, 1);
  assert.equal(
    e.events("page_view").at(-1)[2].page_location,
    "https://bestdev.co.il/blog/",
  );
});

test("local previews never send to the production property, even after acceptance", async () => {
  for (const hostname of ["localhost", "127.0.0.1", "preview.example"]) {
    const e = await environment(hostname);
    e.analytics.recordPage({ key: "initial", title: "Test", path: "/" });
    e.analytics.setAnalyticsConsent(true);
    assert.equal(e.scripts.length, 0);
    assert.equal(window.dataLayer, undefined);
  }
});

test("CV, demo and contact links emit bounded events; right clicks and rejection do not", async () => {
  const e = await environment();
  e.analytics.setAnalyticsConsent(true);
  e.click(
    "https://bestdev.co.il/media/Simon_Stirling_Solutions_Engineering_Architecture_CV.pdf",
  );
  e.click("https://bestdev.co.il/media/Simon_Stirling_CV.pdf", "auxclick", 1);
  e.click("https://bestdev.co.il/media/Simon_Stirling_CV.pdf", "auxclick", 2);
  assert.equal(e.events("cv_download").length, 2);
  e.click("https://knowledge.bestdev.co.il/?token=secret");
  assert.deepEqual(e.events("demo_open")[0][2], {
    project: "knowledge",
    link_domain: "knowledge.bestdev.co.il",
    debug_mode: true,
  });
  e.click("mailto:person@example.com");
  assert.equal(e.events("contact_click")[0][2].method, "email");
  assert.ok(
    !JSON.stringify(e.events("contact_click")).includes("person@example.com"),
  );
  e.analytics.setAnalyticsConsent(false);
  e.click("https://knowledge.bestdev.co.il/");
  assert.equal(e.events("demo_open").length, 1);
});
