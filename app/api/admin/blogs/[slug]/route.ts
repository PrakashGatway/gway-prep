import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Blog from "@/app/Model/BlogDetails";
import { getBlogCategories } from "@/app/lib/blog-categories";
import { getSession } from "@/app/lib/auth";
import mongoose from "mongoose";

type Context = {
  params: Promise<{ slug: string }>;
};

// ✅ GET BLOG BY SLUG
export async function GET(
  req: NextRequest,
  context: Context,
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await context.params;
    const includeDraft = req.nextUrl.searchParams.get("includeDraft") === "true";
    if (includeDraft && !(await getSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let blog;

    if (slug === "all") {
      blog = await Blog.find(includeDraft ? {} : { isPublished: true })
        .select("slug title")
        .lean();
    } else {
      blog = await Blog.findOne({
        slug,
        ...(includeDraft ? {} : { isPublished: true }),
      }).lean();
    }

    // console.log(blog)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog fetched", data: Array.isArray(blog) ? blog : { ...blog, categories: getBlogCategories(blog) } },
      { status: 200 },
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

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }
    if (Object.prototype.hasOwnProperty.call(body, "categories") || Object.prototype.hasOwnProperty.call(body, "category")) {
      const categories = getBlogCategories(body);
      if (!categories.length) {
        return NextResponse.json({ error: "Choose at least one category" }, { status: 400 });
      }
      body.category = categories[0];
      body.categories = categories;
    }

    const updated = await Blog.findOneAndUpdate(
      mongoose.isValidObjectId(slug)
        ? { $or: [{ slug }, { _id: slug }] }
        : { slug },
      { $set: body },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated", data: updated },
      { status: 200 },
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
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted", data: deleted },
      { status: 200 },
    );
  } catch (error) {
    console.error("[BLOG DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
