import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Blog from "@/app/Model/BlogDetails";
import { slugify } from "@/app/lib/slug";

// ✅ GET ALL BLOGS (Pagination + Search + Sort)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // 🔍 Search query
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean();

    const total = await Blog.countDocuments(query);

    return NextResponse.json(
      {
        message: "Blogs fetched",
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BLOG LIST]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ CREATE BLOG
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // 🔥 Generate slug
    const slug = slugify(body.title);

    // 🔒 Prevent duplicate slug
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { error: "Blog with same title already exists" },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      ...body,
      slug,
    });

    return NextResponse.json(
      { message: "Blog created", data: blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BLOG CREATE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


