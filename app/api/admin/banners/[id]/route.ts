import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import Banner from "@/app/Model/Banner";
import { parseBanner } from "../shared";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Context) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid banner id" }, { status: 400 });
    const parsed = parseBanner(await req.json());
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    if (await Banner.exists({ slug: parsed.data.slug, _id: { $ne: id } })) {
      return NextResponse.json({ error: "A banner already exists for this page path" }, { status: 409 });
    }
    const data = await Banner.findByIdAndUpdate(id, { $set: parsed.data }, { new: true, runValidators: true }).lean();
    if (!data) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    return NextResponse.json({ message: "Banner updated", data });
  } catch (error: any) {
    console.error("[ADMIN BANNER UPDATE]", error);
    if (error?.code === 11000) return NextResponse.json({ error: "A banner already exists for this page path" }, { status: 409 });
    return NextResponse.json({ error: error?.message || "Unable to update banner" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid banner id" }, { status: 400 });
    const data = await Banner.findByIdAndDelete(id).lean();
    if (!data) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    return NextResponse.json({ message: "Banner deleted", data });
  } catch (error) {
    console.error("[ADMIN BANNER DELETE]", error);
    return NextResponse.json({ error: "Unable to delete banner" }, { status: 500 });
  }
}
