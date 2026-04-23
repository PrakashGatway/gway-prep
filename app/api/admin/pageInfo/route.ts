/**
 * GET  /api/pages        → get all pages
 * POST /api/pages        → create a page
 *
 * app/api/pages/route.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PageData from "@/app/Model/PageData";
import { PageDataSchema } from "@/app/type";

// ─── GET /api/pages ───────────────────────────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const pages = await PageData.find({}).select("name seoMeta").lean();

    return NextResponse.json(
      { message: "Pages fetched.", data: pages },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGES GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ─── POST /api/pages ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    // const result = PageDataSchema.safeParse(body);

    // if (!result.success) {
    //   return NextResponse.json(
    //     { error: result.error.flatten().fieldErrors },
    //     { status: 400 }
    //   );
    // }

    const { name, description, seoMeta, sections, extraDetails } = body // result.data;

    await connectDB();

    const existing = await PageData.findOne({ name: name.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: `Page "${name}" already exists. Use PUT to update.` },
        { status: 409 }
      );
    }

    const page = await PageData.create({
      name: name.toLowerCase(),
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}