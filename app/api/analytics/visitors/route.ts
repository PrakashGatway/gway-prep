import { NextRequest, NextResponse } from "next/server";
import { allowedOrigin, corsHeaders, verifiedPortalUser } from "@/app/lib/traffic-auth";
import { cutoff, trafficCollection } from "@/app/lib/traffic";

export const runtime = "nodejs";
const clean = (value: string | null) => (value || "").trim().slice(0, 100);
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function OPTIONS(request: NextRequest) {
  const origin = allowedOrigin(request);
  return origin ? new NextResponse(null, { status: 204, headers: corsHeaders(origin) }) : new NextResponse(null, { status: 403 });
}

export async function GET(request: NextRequest) {
  const origin = allowedOrigin(request);
  if (!origin) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const headers = corsHeaders(origin);
  // if ((await verifiedPortalUser(request))?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403, headers });
  const params = request.nextUrl.searchParams;
  const days = Math.min(7, Math.max(1, Number(params.get("days")) || 7));
  const page = Math.min(500, Math.max(1, Math.floor(Number(params.get("page")) || 1)));
  const match: Record<string, unknown> = { occurredAt: { $gte: new Date(Math.max(cutoff().getTime(), Date.now() - days * 86400000)) } };
  for (const key of ["site", "type", "path", "utmSource", "utmCampaign", "country", "device", "categoryName"] as const) {
    const value = clean(params.get(key)); if (value) match[key] = value;
  }
  if (params.get("loggedIn") === "yes") match.userId = { $exists: true };
  if (params.get("loggedIn") === "no") match.userId = { $exists: false };
  const filtered: Record<string, unknown> = {};
  const search = escapeRegex(clean(params.get("search")));
  if (search) filtered.$or = ["userName", "userEmail", "visitorId", "_id", "lastPath"].map((field) => ({ [field]: { $regex: search, $options: "i" } }));
  const segment = params.get("segment");
  if (segment === "new") filtered["sessions.1"] = { $exists: false };
  if (segment === "returning") filtered["sessions.1"] = { $exists: true };
  const minViews = Math.max(0, Number(params.get("minViews")) || 0);
  const minSeconds = Math.max(0, Number(params.get("minSeconds")) || 0);
  if (minViews) filtered.pageViews = { $gte: minViews };
  if (minSeconds) filtered.durationMs = { $gte: minSeconds * 1000 };
  const sortMap: Record<string, string> = { recent: "lastSeen", views: "pageViews", time: "durationMs", clicks: "clicks" };
  const sort = Object.hasOwn(sortMap, params.get("sort") || "recent") ? sortMap[params.get("sort") || "recent"] : "lastSeen";
  try {
    const collection = await trafficCollection();
    const result = await collection.aggregate([
      { $match: match },
      { $sort: { occurredAt: -1, _id: -1 } },
      { $group: {
        _id: { $cond: [{ $ifNull: ["$userId", false] }, { $concat: ["user:", "$userId"] }, { $concat: ["device:", "$site", ":", "$visitorId"] }] },
        userId: { $first: "$userId" }, userName: { $first: "$userName" }, userEmail: { $first: "$userEmail" }, categoryName: { $first: "$categoryName" },
        visitorId: { $first: "$visitorId" }, site: { $first: "$site" }, sites: { $addToSet: "$site" },
        firstSeen: { $min: "$occurredAt" }, lastSeen: { $first: "$occurredAt" }, lastPath: { $first: "$path" },
        sessions: { $addToSet: "$sessionId" }, devices: { $addToSet: "$visitorId" },
        events: { $sum: 1 }, pageViews: { $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] } },
        clicks: { $sum: { $cond: [{ $eq: ["$type", "click"] }, 1, 0] } },
        formStarts: { $sum: { $cond: [{ $eq: ["$type", "form_start"] }, 1, 0] } },
        forms: { $sum: { $cond: [{ $eq: ["$type", "form_submit"] }, 1, 0] } },
        durationMs: { $sum: { $ifNull: ["$durationMs", 0] } },
        country: { $first: "$country" }, city: { $first: "$city" }, ip: { $first: "$ip" }, device: { $first: "$device" }, utmSource: { $first: "$utmSource" },
      } },
      { $match: filtered },
      { $facet: { rows: [{ $sort: { [sort]: -1, _id: 1 } }, { $skip: (page - 1) * 20 }, { $limit: 20 }, { $project: { sessions: { $size: "$sessions" }, devices: { $size: "$devices" }, userId: 1, userName: 1, userEmail: 1, categoryName: 1, visitorId: 1, site: 1, sites: 1, firstSeen: 1, lastSeen: 1, lastPath: 1, events: 1, pageViews: 1, clicks: 1, formStarts: 1, forms: 1, durationMs: 1, country: 1, city: 1, ip: 1, device: 1, utmSource: 1 } }], total: [{ $count: "count" }] } },
    ]).toArray();
    return NextResponse.json({ rows: result[0]?.rows || [], total: result[0]?.total?.[0]?.count || 0, page, pageSize: 20 }, { headers });
  } catch (error) {
    console.error("Visitor list failed", error);
    return NextResponse.json({ error: "Visitor list unavailable" }, { status: 500, headers });
  }
}
