import { NextRequest, NextResponse } from "next/server";
import { allowedOrigin, corsHeaders, verifiedPortalUser } from "@/app/lib/traffic-auth";
import { cutoff, trafficCollection, type TrafficEvent } from "@/app/lib/traffic";

export const runtime = "nodejs";
const fields = ["site", "type", "path", "utmSource", "utmMedium", "utmCampaign", "country", "city", "device", "categoryName", "clickKind", "visitorId"] as const;
const clean = (value: string | null, max = 100) => (value || "").trim().slice(0, max);
const subjectId = { $cond: [{ $ifNull: ["$userId", false] }, { $concat: ["user:", "$userId"] }, { $concat: ["device:", "$site", ":", "$visitorId"] }] };

export function OPTIONS(request: NextRequest) {
  const origin = allowedOrigin(request);
  return origin ? new NextResponse(null, { status: 204, headers: corsHeaders(origin) }) : new NextResponse(null, { status: 403 });
}

export async function GET(request: NextRequest) {
  const origin = allowedOrigin(request);
  const headers = corsHeaders(origin);
  if (!origin) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const user = await verifiedPortalUser(request);
  if (user?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403, headers });

  const params = request.nextUrl.searchParams;
  const days = Math.min(7, Math.max(1, Number(params.get("days")) || 7));
  const start = new Date(Math.max(cutoff().getTime(), Date.now() - days * 86400000));
  const match: Record<string, unknown> = { occurredAt: { $gte: start } };
  for (const field of fields) { const value = clean(params.get(field)); if (value) match[field] = value; }
  if (params.get("loggedIn") === "yes") match.userId = { $exists: true };
  if (params.get("loggedIn") === "no") match.userId = { $exists: false };
  const search = clean(params.get("search"), 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (search) match.$or = ["label", "target", "userName", "userEmail", "visitorId"].map((field) => ({ [field]: { $regex: search, $options: "i" } }));
  const page = Math.min(1000, Math.max(1, Number(params.get("page")) || 1));
  const limit = Math.min(100, Math.max(10, Number(params.get("limit")) || 30));

  try {
    const collection = await trafficCollection();
    const [total, rows, summary, traffic, pages, clicks, sources, devices, locations, categories] = await Promise.all([
      collection.countDocuments(match),
      collection.find(match).sort({ occurredAt: -1 }).skip((page - 1) * limit).limit(limit).project({ expiresAt: 0, _id: 0 }).toArray(),
      collection.aggregate([{ $match: match }, { $group: { _id: null, events: { $sum: 1 }, visitors: { $addToSet: subjectId }, sessions: { $addToSet: "$sessionId" }, pageViews: { $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] } }, clicks: { $sum: { $cond: [{ $eq: ["$type", "click"] }, 1, 0] } }, durationMs: { $sum: { $ifNull: ["$durationMs", 0] } }, loggedIn: { $sum: { $cond: [{ $ifNull: ["$userId", false] }, 1, 0] } } } }, { $project: { events: 1, visitors: { $size: "$visitors" }, sessions: { $size: "$sessions" }, pageViews: 1, clicks: 1, durationMs: 1, loggedIn: 1 } }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "page_view" } }, { $group: { _id: { date: { $dateToString: { format: days <= 1 ? "%Y-%m-%dT%H:00" : "%Y-%m-%d", date: "$occurredAt" } }, site: "$site" }, views: { $sum: 1 }, visitors: { $addToSet: subjectId } } }, { $project: { date: "$_id.date", site: "$_id.site", views: 1, visitors: { $size: "$visitors" } } }, { $sort: { date: 1 } }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "page_view" } }, { $group: { _id: { site: "$site", path: "$path" }, views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 15 }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "click" } }, { $group: { _id: { site: "$site", path: "$path", label: "$label", target: "$target" }, clicks: { $sum: 1 }, visitors: { $addToSet: subjectId } } }, { $project: { clicks: 1, visitors: { $size: "$visitors" } } }, { $sort: { clicks: -1 } }, { $limit: 50 }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "page_view" } }, { $group: { _id: { $ifNull: ["$utmSource", ""] }, views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 12 }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "page_view" } }, { $group: { _id: "$device", views: { $sum: 1 } } }, { $sort: { views: -1 } }]).toArray(),
      collection.aggregate([{ $match: { ...match, type: "page_view" } }, { $group: { _id: { country: "$country", city: "$city" }, views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 15 }]).toArray(),
      collection.aggregate([{ $match: { ...match, categoryName: { $nin: [null, ""] } } }, { $group: { _id: "$categoryName", events: { $sum: 1 } } }, { $sort: { events: -1 } }, { $limit: 12 }]).toArray(),
    ]);
    return NextResponse.json({ range: { from: start, to: new Date() }, total, page, limit, rows: rows as TrafficEvent[], summary: summary[0] || { events: 0, visitors: 0, sessions: 0, pageViews: 0, clicks: 0, durationMs: 0, loggedIn: 0 }, traffic, pages, clicks, sources, devices, locations, categories }, { headers });
  } catch (error) {
    console.error("Traffic report failed", error);
    return NextResponse.json({ error: "Report unavailable" }, { status: 500, headers });
  }
}
