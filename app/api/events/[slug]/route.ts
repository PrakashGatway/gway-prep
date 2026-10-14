import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Event from "@/app/Model/Event";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { slug } = await params;
    const event = await Event.findOne({ slug, isPublished: true }).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ data: event });
  } catch (error) {
    console.error("[PUBLIC EVENT]", error);
    return NextResponse.json({ error: "Unable to fetch event" }, { status: 500 });
  }
}
