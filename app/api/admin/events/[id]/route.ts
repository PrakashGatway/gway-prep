import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import Event from "@/app/Model/Event";
import { slugify } from "@/app/lib/slug";
import mongoose from "mongoose";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const event = await Event.findOne(filter).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ data: event });
  } catch (error) {
    console.error("[EVENT GET]", error);
    return NextResponse.json({ error: "Unable to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    const body = await req.json();
    const updates: Record<string, any> = {};
    const textFields = ["title", "summary", "description", "image", "category", "eventType", "mode", "startTime", "endTime", "timezone", "location", "registrationUrl", "capacity"];
    textFields.forEach((field) => { if (body[field] !== undefined) updates[field] = typeof body[field] === "string" ? body[field].trim() : body[field]; });
    if (body.startDate !== undefined) {
      updates.startDate = new Date(body.startDate);
      if (Number.isNaN(updates.startDate.getTime())) return NextResponse.json({ error: "Invalid start date" }, { status: 400 });
    }
    if (body.endDate !== undefined) {
      updates.endDate = body.endDate ? new Date(body.endDate) : null;
      if (updates.endDate && Number.isNaN(updates.endDate.getTime())) return NextResponse.json({ error: "Invalid end date" }, { status: 400 });
    }
    if (body.isFeatured !== undefined) updates.isFeatured = Boolean(body.isFeatured);
    if (body.isPublished !== undefined) updates.isPublished = Boolean(body.isPublished);
    if (body.slug !== undefined || body.title !== undefined) updates.slug = slugify(body.slug || body.title || "event");
    if (updates.slug && await Event.exists({ slug: updates.slug, _id: { $ne: id } })) {
      return NextResponse.json({ error: "An event with this slug already exists" }, { status: 409 });
    }
    const event = await Event.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ message: "Event updated", data: event });
  } catch (error: any) {
    console.error("[EVENT UPDATE]", error);
    return NextResponse.json({ error: error?.message || "Unable to update event" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    const event = await Event.findByIdAndDelete(id).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ message: "Event deleted", data: event });
  } catch (error) {
    console.error("[EVENT DELETE]", error);
    return NextResponse.json({ error: "Unable to delete event" }, { status: 500 });
  }
}
