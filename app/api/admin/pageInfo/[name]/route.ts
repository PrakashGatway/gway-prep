/**
 * GET    /api/pages/[name]   → get one page   e.g. /api/pages/home
 * PUT    /api/pages/[name]   → update a page  (partial or full)
 * DELETE /api/pages/[name]   → delete a page
 *
 * app/api/pages/[name]/route.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PageData from "@/app/Model/PageData";
import { UpdatePageDataSchema } from "@/app/type";

type Params = { params: { name: string } };

// ─── GET /api/pages/[name] ────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();

    const page = await PageData.findOne({
      name: params.name.toLowerCase(),
    })
      .select("-__v")
      .lean();

    if (!page) {
      return NextResponse.json(
        { error: `Page "${params.name}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Page fetched.", data: page },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGES GET ONE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ─── PUT /api/pages/[name] ────────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    
    const { name } = await params; // ✅ await params

    const body = await req.json();
    // const result = UpdatePageDataSchema.safeParse({
    //   ...body,
    //   name: name,  // always take name from URL
    // });

    // if (!result.success) {
    //   return NextResponse.json(
    //     { error: result.error.flatten().fieldErrors },
    //     { status: 400 }
    //   );
    // }

    const { sections, extraDetails, seoMeta, ...rest } = body // result.data;

    await connectDB();

    // Build $set payload — use dot notation for nested fields
    // so we only update the keys sent, not wipe the whole object
    const setPayload: Record<string, any> = { ...rest };

    if (sections) {
      for (const [key, value] of Object.entries(sections)) {
        setPayload[`sections.${key}`] = value;
      }
    }

    if (extraDetails) {
      for (const [key, value] of Object.entries(extraDetails)) {
        setPayload[`extraDetails.${key}`] = value;
      }
    }

    if (seoMeta) {
      for (const [key, value] of Object.entries(seoMeta)) {
        setPayload[`seoMeta.${key}`] = value;
      }
    }

    const updated = await PageData.findOneAndUpdate(
      { name: name.toLowerCase() },
      { $set: setPayload },
      {
        new: true,      // return updated document
        upsert: true,   // create if doesn't exist
        select: "-__v",
      }
    ).lean();

    return NextResponse.json(
      { message: "Page updated.", data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGES PUT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ─── DELETE /api/pages/[name] ─────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { name } = await params; // ✅ await params

    await connectDB();

    const deleted = await PageData.findOneAndDelete({
      name: name.toLowerCase(),
    }).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: `Page "${name}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: `Page "${name}" deleted.` }, { status: 200 });
  } catch (error) {
    console.error("[PAGES DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}