import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PageData from "@/app/Model/PageData";


export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.max(Number(searchParams.get("limit")) || 10, 1);
    const search = searchParams.get("search")?.trim() || "";

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          name: {
            $regex: search,
            $options: "i",
          },
        }
      : {};

    const [pages, total] = await Promise.all([
      PageData.find(filter)
        .select("name seoMeta")
        .skip(skip)
        .limit(limit)
        .lean(),
      PageData.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        message: "Pages fetched.",
        data: pages,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGES GET]", error);

    return NextResponse.json(
      {
        error: `Server ${error}`,
      },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { name, description,template, seoMeta, sections, extraDetails } = body;

      console.log( name ,"name")
    // 1. Add validation fallback since schema validation is commented out
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: "Required field 'name' is missing or invalid in the request body." },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Safe to use .toLowerCase() now
    const lowerName = name.toLowerCase();

    const existing = await PageData.findOne({ name: lowerName });
    if (existing) {
      return NextResponse.json(
        { error: `Page "${name}" already exists. Use PUT to update.` },
        { status: 409 }
      );
    }

    const page = await PageData.create({
      name: lowerName,
      slug : slugify(name), 
      template: template,
      description,
      seoMeta,
      sections,
      extraDetails,
    });

    return NextResponse.json(
      { message: "Page created.", data: page },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PAGES POST]", error);
    return NextResponse.json({ error: `Server error: ${error instanceof Error ? error.message : error}` }, { status: 500 });
  }
}

