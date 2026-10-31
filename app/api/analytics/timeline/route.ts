import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { allowedOrigin, corsHeaders, verifiedPortalUser } from "@/app/lib/traffic-auth";
import { cutoff, trafficCollection } from "@/app/lib/traffic";

export const runtime = "nodejs";
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;

export function OPTIONS(request: NextRequest) {
  const origin = allowedOrigin(request);
  return origin ? new NextResponse(null, { status: 204, headers: corsHeaders(origin) }) : new NextResponse(null, { status: 403 });
}

export async function GET(request: NextRequest) {
  const origin = allowedOrigin(request);
  if (!origin) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const headers = corsHeaders(origin);
  if ((await verifiedPortalUser(request))?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403, headers });
  const params = request.nextUrl.searchParams;
  const key = params.get("subject") || "";
  let subject: Record<string, string>;
  if (/^user:[a-f\d]{24}$/i.test(key)) subject = { userId: key.slice(5) };
  else {
    const parts = key.split(":");
    if (parts.length !== 3 || parts[0] !== "device" || !["website", "portal"].includes(parts[1]) || !uuid.test(parts[2])) return NextResponse.json({ error: "Invalid visitor" }, { status: 400, headers });
    subject = { site: parts[1], visitorId: parts[2] };
  }
  const days = Math.min(7, Math.max(1, Number(params.get("days")) || 7));
  const since = new Date(Math.max(cutoff().getTime(), Date.now() - days * 86400000));
  const cursor = params.get("cursor");
  let older: Record<string, unknown> = {};
  if (cursor) {
    const [time, id] = cursor.split("|");
    const date = new Date(time);
    if (!Number.isFinite(date.getTime()) || !/^[a-f\d]{24}$/i.test(id || "")) return NextResponse.json({ error: "Invalid cursor" }, { status: 400, headers });
    older = { $or: [{ occurredAt: { $lt: date } }, { occurredAt: date, _id: { $lt: new ObjectId(id) } }] };
  }
  try {
    const collection = await trafficCollection();
    const rows = await collection.find({ ...subject, occurredAt: { $gte: since }, ...older }).sort({ occurredAt: -1, _id: -1 }).limit(25).toArray();
    const page = rows.slice(0, 24);
    const last = page.at(-1);
    return NextResponse.json({ events: page.map((row) => ({ id: String(row._id), type: row.type, path: row.path, label: row.label, target: row.target, occurredAt: row.occurredAt, sessionId: row.sessionId, site: row.site, durationMs: row.durationMs, country: row.country, city: row.city, ip: row.ip, device: row.device, utmSource: row.utmSource, categoryName: row.categoryName })), nextCursor: rows.length > 24 && last ? `${last.occurredAt.toISOString()}|${String(last._id)}` : null }, { headers });
  } catch (error) {
    console.error("Visitor timeline failed", error);
    return NextResponse.json({ error: "Timeline unavailable" }, { status: 500, headers });
  }
}
