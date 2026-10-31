import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { lookup } from "geoip-lite";
import { allowedOrigin, corsHeaders, isWebsiteOrigin, verifiedPortalUser } from "@/app/lib/traffic-auth";
import { RETENTION_MS, trafficCollection, type TrafficEvent, type EventType } from "@/app/lib/traffic";
import { getSession } from "@/app/lib/auth";

export const runtime = "nodejs";
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
const types = new Set<EventType>(["page_view", "page_duration", "click", "form_start", "form_submit", "custom"]);
const buckets = new Map<string, { count: number; until: number }>();
const clean = (value: unknown, max = 120) => typeof value === "string" ? value.replace(/[\x00-\x1f\x7f]/g, " ").replace(/\b\S+@\S+\.\S+\b/g, "[email]").trim().slice(0, max) : "";
const response = (body: object, status: number, origin: string | null) => NextResponse.json(body, { status, headers: corsHeaders(origin) });

function persistVisitorCookie(result: NextResponse, origin: string, visitorId: string) {
  const hostname = new URL(origin).hostname.toLowerCase();
  const productionDomain = hostname === "ooshasprep.com" || hostname.endsWith(".ooshasprep.com");
  result.cookies.set({
    name: "ooshas_traffic_visitor",
    value: visitorId,
    maxAge: 7 * 86400,
    path: "/",
    sameSite: "lax",
    secure: new URL(origin).protocol === "https:",
    httpOnly: false,
    ...(productionDomain ? { domain: ".ooshasprep.com" } : {}),
  });
  return result;
}

export function OPTIONS(request: NextRequest) {
  const origin = allowedOrigin(request);
  return origin ? new NextResponse(null, { status: 204, headers: corsHeaders(origin) }) : response({ error: "Origin not allowed" }, 403, null);
}

export async function POST(request: NextRequest) {
  const origin = allowedOrigin(request);
  if (!origin) return response({ error: "Origin not allowed" }, 403, null);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return response({ error: "JSON required" }, 415, origin);
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return response({ error: "Payload too large" }, 413, origin);
    input = JSON.parse(raw);
  } catch { return response({ error: "Invalid JSON" }, 400, origin); }
  if (!input || !uuid.test(String(input.visitorId)) || !uuid.test(String(input.sessionId)) || !Array.isArray(input.events) || input.events.length < 1 || input.events.length > 20) return response({ error: "Invalid events" }, 400, origin);
  const cookieVisitorId = request.cookies.get("ooshas_traffic_visitor")?.value || "";
  const visitorId = uuid.test(cookieVisitorId) ? cookieVisitorId : String(input.visitorId);

  const now = Date.now();
  const ipValue = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const ip = isIP(ipValue) ? ipValue : "";
  const key = ip || visitorId;
  const bucket = buckets.get(key);
  const current = bucket && bucket.until > now ? bucket : { count: 0, until: now + 60_000 };
  current.count += input.events.length;
  buckets.set(key, current);
  if (buckets.size > 5000) for (const [id, value] of buckets) if (value.until < now) buckets.delete(id);
  if (current.count > 240) return response({ error: "Too many events" }, 429, origin);

  const site = isWebsiteOrigin(request, origin) ? "website" : "portal";
  const portalUser = site === "portal" ? await verifiedPortalUser(request) : null;
  if (site === "portal" && !portalUser) return response({ error: "Portal sign-in required" }, 401, origin);
  if ((site === "portal" && portalUser?.role === "admin") || (site === "website" && (await getSession())?.role === "admin")) {
    return response({ accepted: 0 }, 202, origin);
  }
  const geo = ip ? lookup(ip) : null;
  const agent = request.headers.get("user-agent") || "";
  const device = /ipad|tablet/i.test(agent) ? "tablet" : /mobile|android|iphone/i.test(agent) ? "mobile" : "desktop";
  const attribution = input.attribution && typeof input.attribution === "object" ? input.attribution as Record<string, unknown> : {};
  const userCategory = portalUser?.category && typeof portalUser.category === "object" ? portalUser.category.name : "";
  const events: TrafficEvent[] = [];
  for (const rawEvent of input.events) {
    if (!rawEvent || typeof rawEvent !== "object") continue;
    const event = rawEvent as Record<string, unknown>;
    if (!types.has(event.type as EventType)) continue;
    const path = clean(event.path, 240);
    if (!path.startsWith("/") || path.startsWith("//") || path.includes("?") || path.includes("#") || path.startsWith("/admin")) continue;
    const durationMs = event.type === "page_duration" ? Number(event.durationMs) : undefined;
    if (durationMs !== undefined && (!Number.isFinite(durationMs) || durationMs < 1000 || durationMs > 86400000)) continue;
    const occurredAt = new Date(Math.min(now, Math.max(now - 300000, Number(event.at) || now)));
    events.push({
      site, visitorId, sessionId: String(input.sessionId), type: event.type as EventType,
      path, label: clean(event.label), target: clean(event.target), clickKind: ["button", "link", "other"].includes(String(event.clickKind)) ? event.clickKind as TrafficEvent["clickKind"] : undefined, durationMs,
      occurredAt, expiresAt: new Date(occurredAt.getTime() + RETENTION_MS),
      referrer: clean(attribution.referrer, 240), utmSource: clean(attribution.utmSource, 100), utmMedium: clean(attribution.utmMedium, 100),
      utmCampaign: clean(attribution.utmCampaign, 100), utmTerm: clean(attribution.utmTerm, 100), utmContent: clean(attribution.utmContent, 100),
      ip, country: clean(request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country") || geo?.country, 50),
      region: clean(request.headers.get("x-vercel-ip-country-region") || geo?.region, 80), city: clean(request.headers.get("x-vercel-ip-city") || geo?.city, 80), device,
      ...(portalUser ? { userId: portalUser._id, userName: portalUser.name, userEmail: portalUser.email, userRole: portalUser.role, categoryName: userCategory } : {}),
    });
  }
  if (!events.length) return response({ error: "No valid events" }, 400, origin);
  try {
    await (await trafficCollection()).insertMany(events);
    return persistVisitorCookie(response({ accepted: events.length, visitorId }, 202, origin), origin, visitorId);
  } catch (error) {
    console.error("Traffic collection failed", error);
    return response({ error: "Collection unavailable" }, 500, origin);
  }
}
