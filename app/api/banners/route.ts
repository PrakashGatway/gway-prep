import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Banner from "@/app/Model/Banner";

export const dynamic = "force-dynamic";

function normalizeSlug(value: string) {
  const path = value.trim().split(/[?#]/, 1)[0];
  const normalized = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}

export async function GET(req: NextRequest) {
  try {
    const slug = normalizeSlug(req.nextUrl.searchParams.get("slug") || "");
    if (!slug) return NextResponse.json({ data: null }, { headers: { "Cache-Control": "no-store" } });
    await connectDB();
    const data = await Banner.findOne({ slug, isActive: true }).lean();
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    console.error("[PUBLIC BANNER]", error);
    return NextResponse.json({ error: "Unable to fetch banner" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
