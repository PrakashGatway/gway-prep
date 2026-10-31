import type { NextRequest } from "next/server";

export function allowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const allowed = [...websiteOrigins(request), ...(process.env.ANALYTICS_PORTAL_ORIGINS || "http://localhost:5173,https://dashboard.ooshasprep.com").split(",").map((x) => x.trim())];
  return allowed.includes(origin) ? origin : null;
}

export function websiteOrigins(request: NextRequest) {
  return [request.nextUrl.origin, ...(process.env.ANALYTICS_WEBSITE_ORIGINS || "https://www.ooshasprep.com,https://ooshasprep.com,http://localhost:3000,http://localhost:3100").split(",").map((value) => value.trim())];
}

export function isWebsiteOrigin(request: NextRequest, origin: string) {
  return websiteOrigins(request).includes(origin);
}

export function corsHeaders(origin: string | null) {
  return { "Cache-Control": "no-store", "Vary": "Origin", ...(origin ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" } : {}) };
}

type PortalUser = { _id: string; name?: string; email?: string; role?: string; category?: { name?: string } | string };
export async function verifiedPortalUser(request: NextRequest): Promise<PortalUser | null> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  const endpoint = process.env.PORTAL_AUTH_ME_URL || (process.env.NODE_ENV === "production" ? "https://uat.gatewayabroadeducations.com/api/v1/auth/me" : "http://localhost:5000/api/v1/auth/me");
  try {
    const response = await fetch(endpoint, { headers: { Authorization: authorization }, cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) return null;
    const body = await response.json();
    return body?.data?._id ? body.data as PortalUser : null;
  } catch { return null; }
}
