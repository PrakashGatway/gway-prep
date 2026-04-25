import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Blog from "@/app/Model/BlogDetails";

type Context = {
  params: Promise<{ slug: string }>;
};

// ✅ GET BLOG BY SLUG
export async function GET(_req: NextRequest, context: Context): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await context.params;
    console.log(slug, 'slug param')

    const blog = await Blog.findOne({ slug })
      // .select("-__v")
      .lean();

    console.log(blog)
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog fetched", data: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BLOG GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ UPDATE BLOG
export async function PUT(req: NextRequest, context: Context) {
  try {
    await connectDB();

    const { slug } = await context.params;
    const body = await req.json();

    // ❌ Prevent slug overwrite
    delete body.slug;

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No data to update" },
        { status: 400 }
      );
    }

    const updated = await Blog.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog updated", data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BLOG UPDATE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE BLOG
export async function DELETE(_req: NextRequest, context: Context) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const deleted = await Blog.findOneAndDelete({ slug }).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BLOG DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}