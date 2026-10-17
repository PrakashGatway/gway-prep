import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth";
import Event from "@/app/Model/Event";
import { slugify } from "@/app/lib/slug";
import { ensureStarterEvents } from "@/app/lib/event-seeds";

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const includeDrafts = params.get("includeDrafts") === "1";
    if (includeDrafts && !(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await ensureStarterEvents();
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(params.get("limit")) || 9));
    const search = (params.get("search") || "").trim();
    const category = (params.get("category") || "").trim();
    const mode = (params.get("mode") || "").trim();
    const eventType = (params.get("type") || "").trim();
    const time = params.get("time") || "upcoming";

    const query: Record<string, any> = {};
    if (!includeDrafts) query.isPublished = true;
    else if (params.get("status") === "published") query.isPublished = true;
    else if (params.get("status") === "draft") query.isPublished = false;
    if (category) query.category = category;
    if (mode) query.mode = mode;
    if (eventType) query.eventType = eventType;
    if (search) {
      const safeSearch = new RegExp(escapeRegex(search), "i");
      query.$or = [
        { title: safeSearch },
        { summary: safeSearch },
        { category: safeSearch },
        { eventType: safeSearch },
        { location: safeSearch },
      ];
    }
    if (time === "upcoming") query.startDate = { $gte: new Date() };
    if (time === "past") query.startDate = { $lt: new Date() };

    const [data, total, categories] = await Promise.all([
      Event.find(query).sort({ isFeatured: -1, startDate: time === "past" ? -1 : 1 }).skip((page - 1) * limit).limit(limit).lean(),
      Event.countDocuments(query),
      Event.distinct("category", includeDrafts ? {} : { isPublished: true }),
    ]);

    return NextResponse.json({
      data,
      categories: categories.filter(Boolean).sort(),
      pagination: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    console.error("[EVENTS LIST]", error);
    return NextResponse.json({ error: "Unable to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const startDate = new Date(body.startDate);
    const endDate = body.endDate ? new Date(body.endDate) : undefined;
    if (!body.title?.trim() || !body.summary?.trim() || !body.category?.trim() || !body.eventType?.trim() || !body.startDate || Number.isNaN(startDate.getTime()) || (endDate && Number.isNaN(endDate.getTime()))) {
      return NextResponse.json({ error: "Title, summary, category, event type, and start date are required" }, { status: 400 });
    }

    const baseSlug = slugify(body.slug || body.title) || `event-${Date.now()}`;
    const slug = baseSlug;
    if (await Event.exists({ slug })) return NextResponse.json({ error: "An event with this slug already exists" }, { status: 409 });

    const event = await Event.create({
      title: body.title.trim(), slug, summary: body.summary.trim(), description: body.description || "", image: body.image || "",
      heroEyebrow: body.heroEyebrow || "", heroTitle: body.heroTitle || "", heroSubtitle: body.heroSubtitle || "",
      heroImage: body.heroImage || "", heroImageAlt: body.heroImageAlt || "", heroImageCaption: body.heroImageCaption || "",
      heroPrimaryButtonText: body.heroPrimaryButtonText || "", heroSecondaryButtonText: body.heroSecondaryButtonText || "",
      category: body.category.trim(), eventType: body.eventType.trim(), mode: body.mode || "Online",
      startDate, endDate,
      startTime: body.startTime || "", endTime: body.endTime || "", timezone: body.timezone || "Asia/Kolkata",
      location: body.location || "", registrationUrl: body.registrationUrl || "", capacity: body.capacity || "",
      isFeatured: Boolean(body.isFeatured), isPublished: body.isPublished !== false,
    });
    return NextResponse.json({ message: "Event created", data: event }, { status: 201 });
  } catch (error: any) {
    console.error("[EVENT CREATE]", error);
    return NextResponse.json({ error: error?.message || "Unable to create event" }, { status: 500 });
  }
}
