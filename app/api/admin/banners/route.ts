import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import Banner from "@/app/Model/Banner";
import { parseBanner } from "./shared";

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const data = await Banner.find({}).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("[ADMIN BANNERS LIST]", error);
    return NextResponse.json({ error: "Unable to fetch banners" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const parsed = parseBanner(await req.json());
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    if (await Banner.exists({ slug: parsed.data.slug })) {
      return NextResponse.json({ error: "A banner already exists for this page path" }, { status: 409 });
    }
    const data = await Banner.create(parsed.data);
    return NextResponse.json({ message: "Banner created", data }, { status: 201 });
  } catch (error: any) {
    console.error("[ADMIN BANNER CREATE]", error);
    if (error?.code === 11000) return NextResponse.json({ error: "A banner already exists for this page path" }, { status: 409 });
    return NextResponse.json({ error: error?.message || "Unable to create banner" }, { status: 500 });
  }
}
