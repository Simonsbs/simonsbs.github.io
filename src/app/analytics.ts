export const measurementId = "G-F7P8P9HM2R";
export const consentStorageKey = "bestdev-analytics-consent-v1";
const campaignKeys = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
]);
type Page = { key: string; title: string; path: string };
type Parameters = Record<string, string | number | boolean>;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
let enabled = false;
let configured = false;
let currentPage: Page | undefined;
let lastNavigation: string | undefined;
let lastRoute: string | undefined;
let previousLocation: string | undefined;

function browser() {
  return typeof window === "undefined" ? undefined : window;
}
function production() {
  return ["bestdev.co.il", "www.bestdev.co.il"].includes(
    browser()?.location.hostname ?? "",
  );
}
function debug() {
  return (
    new URLSearchParams(browser()?.location.search).get("analytics_debug") ===
    "1"
  );
}

export function safeUrl(value: string, campaigns = false) {
  if (!value) return "";
  try {
    const url = new URL(value, "https://bestdev.co.il/");
    if (!["https:", "http:"].includes(url.protocol)) return "";
    url.username = "";
    url.password = "";
    url.hash = "";
    for (const [key, value] of [...url.searchParams]) {
      if (
        !campaigns ||
        !campaignKeys.has(key) ||
        !/^[a-z\d_.~ -]{1,100}$/i.test(value)
      )
        url.searchParams.delete(key);
    }
    return url.href;
  } catch {
    return "";
  }
}

export function savedConsent(): boolean | null {
  try {
    const value = browser()?.localStorage.getItem(consentStorageKey);
    return value === "granted" ? true : value === "denied" ? false : null;
  } catch {
    return null;
  }
}

function queue(...args: unknown[]) {
  browser()?.gtag?.(...args);
}

function sendCurrentPage() {
  const target = browser();
  if (!enabled || !target || !currentPage || lastNavigation === currentPage.key)
    return;
  const location = safeUrl(
    new URL(currentPage.path, target.location.origin).href,
    true,
  );
  const route = new URL(location).pathname.replace(/\/+$/, "") || "/";
  if (route === lastRoute) {
    lastNavigation = currentPage.key;
    return;
  }
  const referrer = previousLocation ?? safeUrl(document.referrer);
  const fields = {
    page_title: currentPage.title,
    page_location: location,
    page_referrer: referrer,
  };
  queue("set", fields);
  queue("event", "page_view", {
    ...fields,
    ...(debug() ? { debug_mode: true } : {}),
  });
  lastNavigation = currentPage.key;
  lastRoute = route;
  previousLocation = location;
}

export function recordPage(page: Page) {
  currentPage = page;
  sendCurrentPage();
}

export function trackEvent(
  name: "cv_download" | "demo_open" | "contact_click" | "generate_lead",
  parameters: Parameters = {},
) {
  if (!enabled) return;
  queue("event", name, {
    ...parameters,
    ...(debug() ? { debug_mode: true } : {}),
  });
}

function trackLink(event: MouseEvent) {
  if (event.type === "auxclick" && event.button !== 1) return;
  if (!enabled || !(event.target instanceof Element)) return;
  const anchor = event.target.closest("a[href]") as HTMLAnchorElement | null;
  if (!anchor) return;
  const url = new URL(anchor.href, window.location.href);
  if (
    url.origin === window.location.origin &&
    /\/media\/Simon_Stirling[^/]*_CV\.pdf$/i.test(url.pathname)
  ) {
    trackEvent("cv_download", {
      file_name: url.pathname.split("/").pop()!,
      link_url: safeUrl(url.href),
    });
  } else if (
    ["knowledge", "integration", "presales", "traceability", "workflow"].some(
      (host) => url.hostname === `${host}.bestdev.co.il`,
    )
  ) {
    trackEvent("demo_open", {
      project: url.hostname.split(".")[0],
      link_domain: url.hostname,
    });
  } else if (["mailto:", "tel:"].includes(url.protocol)) {
    trackEvent("contact_click", {
      method: url.protocol === "mailto:" ? "email" : "phone",
    });
  }
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
    for (const domain of ["", window.location.hostname, ".bestdev.co.il"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax; Secure`;
    }
  }
}

export function setAnalyticsConsent(granted: boolean, persist = true) {
  const target = browser();
  if (!target) return;
  if (persist) {
    try {
      target.localStorage.setItem(
        consentStorageKey,
        granted ? "granted" : "denied",
      );
    } catch {
      /* The choice still applies for this page. */
    }
  }
  enabled = granted && production();
  target[`ga-disable-${measurementId}`] = !enabled;
  if (!enabled) {
    lastNavigation = undefined;
    lastRoute = undefined;
    if (configured) queue("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies();
    return;
  }
  if (!configured) {
    configured = true;
    target.dataLayer = target.dataLayer || [];
    target.gtag = function () {
      target.dataLayer!.push(arguments);
    };
    queue("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    queue("js", new Date());
    queue("consent", "update", { analytics_storage: "granted" });
    queue("set", {
      page_location: safeUrl(target.location.href, true),
      page_referrer: safeUrl(document.referrer),
    });
    queue("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...(debug() ? { debug_mode: true } : {}),
    });
    const script = document.createElement("script");
    script.id = "bestdev-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    document.addEventListener("click", trackLink, { capture: true });
    document.addEventListener("auxclick", trackLink, { capture: true });
  } else {
    queue("consent", "update", { analytics_storage: "granted" });
  }
  sendCurrentPage();
}
