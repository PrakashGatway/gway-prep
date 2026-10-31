export type ClientEvent = { type: "page_view" | "page_duration" | "click" | "form_start" | "form_submit" | "custom"; path: string; label: string; target?: string; clickKind?: "button" | "link" | "other"; at: number; durationMs?: number };
type Identity = { id: string; lastSeen: number };
type Config = { endpoint: string; getToken?: () => string | null };
const visitorKey = "ooshas_traffic_visitor";
const sessionKey = "ooshas_traffic_session";
const attributionKey = "ooshas_traffic_attribution";
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
const clean = (value: string) => value.replace(/\s+/g, " ").replace(/\b\S+@\S+\.\S+\b/g, "[email]").replace(/\b\+?\d[\d\s()-]{7,}\d\b/g, "[number]").trim().slice(0, 120);

function sharedVisitorCookie() {
  try {
    const value = document.cookie.split("; ").find((part) => part.startsWith(`${visitorKey}=`))?.slice(visitorKey.length + 1);
    const id = value ? decodeURIComponent(value) : "";
    return uuid.test(id) ? id : null;
  } catch { return null; }
}

function saveSharedVisitorCookie(id: string) {
  try {
    const hostname = location.hostname.toLowerCase();
    // Cookies are not port-scoped, so the host-only localhost cookie is shared by ports 3000 and 5173.
    // The domain attribute lets the same ID work on every HTTPS ooshasprep.com subdomain in production.
    const domain = hostname === "ooshasprep.com" || hostname.endsWith(".ooshasprep.com") ? "; Domain=.ooshasprep.com" : "";
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${visitorKey}=${encodeURIComponent(id)}; Max-Age=${7 * 86400}; Path=/; SameSite=Lax${domain}${secure}`;
  } catch { /* Storage can be unavailable in hardened browser settings. */ }
}

function idFor(key: string, maxIdle: number) {
  const now = Date.now();
  try {
    const storage = key === visitorKey ? localStorage : sessionStorage;
    const old = JSON.parse(storage.getItem(key) || "null") as Identity | null;
    const cookieId = key === visitorKey ? sharedVisitorCookie() : null;
    const id = cookieId || (old && uuid.test(old.id) && now - old.lastSeen < maxIdle ? old.id : crypto.randomUUID());
    storage.setItem(key, JSON.stringify({ id, lastSeen: now }));
    if (key === visitorKey) saveSharedVisitorCookie(id);
    return id;
  } catch {
    const id = key === visitorKey ? sharedVisitorCookie() || crypto.randomUUID() : crypto.randomUUID();
    if (key === visitorKey) saveSharedVisitorCookie(id);
    return id;
  }
}

function attribution() {
  try {
    const old = sessionStorage.getItem(attributionKey);
    if (old) return JSON.parse(old);
    const params = new URLSearchParams(location.search);
    const referrer = document.referrer ? new URL(document.referrer).origin + new URL(document.referrer).pathname : "";
    const data = { referrer: referrer.slice(0, 240), utmSource: params.get("utm_source") || "", utmMedium: params.get("utm_medium") || "", utmCampaign: params.get("utm_campaign") || "", utmTerm: params.get("utm_term") || "", utmContent: params.get("utm_content") || "" };
    sessionStorage.setItem(attributionKey, JSON.stringify(data));
    return data;
  } catch { return {}; }
}

export function startTrafficTracker(config: Config) {
  const visitorId = idFor(visitorKey, 7 * 86400000);
  const sessionId = idFor(sessionKey, 30 * 60000);
  const source = attribution();
  let pending: ClientEvent[] = [];
  let failures = 0;
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let path = location.pathname;
  let activeSince = document.visibilityState === "visible" ? performance.now() : null as number | null;
  let lastPage: string | null = null;
  const startedForms = new WeakSet<HTMLFormElement>();

  function flush(beacon = false) {
    if (timer) clearTimeout(timer);
    timer = undefined;
    if (!pending.length) return;
    const batch = pending.splice(0, 20);
    const body = JSON.stringify({ visitorId, sessionId, attribution: source, events: batch });
    const token = config.getToken?.();
    if (beacon && !token && config.endpoint.startsWith("/") && navigator.sendBeacon?.(config.endpoint, new Blob([body], { type: "application/json" }))) return;
    void fetch(config.endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body, keepalive: true, mode: "cors", credentials: "include" })
      .then((response) => { if (!response.ok) throw new Error("Traffic collection failed"); failures = 0; })
      .catch(() => { if (!stopped && failures++ < 2) { pending = [...batch, ...pending].slice(0, 80); if (!timer) timer = setTimeout(flush, 3000 * failures); } });
    if (pending.length) timer = setTimeout(flush, 600);
  }
  function queue(type: ClientEvent["type"], label = "", target = "", durationMs?: number, clickKind?: ClientEvent["clickKind"]) {
    pending.push({ type, path, label: clean(label), target: clean(target), at: Date.now(), ...(durationMs !== undefined ? { durationMs } : {}), ...(clickKind ? { clickKind } : {}) });
    if (pending.length >= 20) flush(); else if (!timer) timer = setTimeout(flush, 900);
  }
  function finishPage() {
    if (activeSince === null) return;
    const ms = Math.round(performance.now() - activeSince);
    activeSince = null;
    if (ms >= 1000) queue("page_duration", "", "", ms);
  }
  function pageView(nextPath: string) {
    if (nextPath === lastPage) return;
    finishPage();
    path = nextPath;
    lastPage = nextPath;
    activeSince = document.visibilityState === "visible" ? performance.now() : null;
    queue("page_view");
  }
  function onClick(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const control = (event.target.closest("button, a, input, select, summary, [role='button'], [role='link']") || event.target) as HTMLElement;
    if (control.closest("[data-no-track]")) return;
    const href = control.getAttribute("href") || "";
    let target = control.dataset.trackTarget || control.id || "";
    if (href) { try { const url = new URL(href, location.origin); target = url.origin === location.origin ? url.pathname : url.hostname; } catch { target = "link"; } }
    const isControl = control.matches("button, a, input, select, summary, [role='button'], [role='link']");
    const clickKind = control.matches("a, [role='link']") ? "link" : isControl ? "button" : "other";
    queue("click", control.dataset.trackLabel || control.getAttribute("aria-label") || control.getAttribute("title") || (isControl && !control.matches("input, select") ? control.textContent : "") || control.tagName, target || control.tagName.toLowerCase(), undefined, clickKind);
  }
  function onFocus(event: FocusEvent) {
    if (!(event.target instanceof Element)) return;
    const form = event.target.closest("form") as HTMLFormElement | null;
    if (form && !form.closest("[data-no-track]") && !startedForms.has(form)) { startedForms.add(form); queue("form_start", form.dataset.trackForm || form.getAttribute("aria-label") || form.id || "Form"); }
  }
  function onSubmit(event: SubmitEvent) {
    const form = event.target;
    if (form instanceof HTMLFormElement && !form.closest("[data-no-track]")) queue("form_submit", form.dataset.trackForm || form.getAttribute("aria-label") || form.id || "Form");
  }
  function onChange(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLSelectElement || element instanceof HTMLInputElement)) return;
    if (element.closest("[data-no-track]") || (element instanceof HTMLInputElement && !["checkbox", "radio"].includes(element.type))) return;
    queue("custom", "Selection changed", element.name || element.id || element.tagName.toLowerCase());
  }
  function onCustom(event: Event) { const detail = (event as CustomEvent).detail; if (detail && typeof detail.label === "string") queue("custom", detail.label, typeof detail.target === "string" ? detail.target : ""); }
  function onVisibility() { if (document.visibilityState === "hidden") { finishPage(); flush(true); } else if (activeSince === null) activeSince = performance.now(); }
  function onLeave() { finishPage(); flush(true); }
  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("submit", onSubmit, true);
  document.addEventListener("change", onChange, true);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onLeave);
  window.addEventListener("traffic:event", onCustom);
  pageView(path);
  return { pageView, stop() { finishPage(); flush(); stopped = true; document.removeEventListener("click", onClick, true); document.removeEventListener("focusin", onFocus, true); document.removeEventListener("submit", onSubmit, true); document.removeEventListener("change", onChange, true); document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("pagehide", onLeave); window.removeEventListener("traffic:event", onCustom); } };
}
