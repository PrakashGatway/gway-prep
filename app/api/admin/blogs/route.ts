import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Blog from "@/app/Model/BlogDetails";
import { slugify } from "@/app/lib/slug";
import { getBlogCategories } from "@/app/lib/blog-categories";
import { getSession } from "@/app/lib/auth";
import { testCategoryPattern } from "@/app/lib/test-blog-category";

// ✅ GET ALL BLOGS (Pagination + Search + Sort)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const categories = searchParams.getAll("category").map((value) => value.trim()).filter(Boolean);
    const test = searchParams.get("test");
    const testPattern = test ? testCategoryPattern(test) : null;
    if (test && !testPattern) {
      return NextResponse.json({ error: "Invalid test category" }, { status: 400 });
    }
    const search = searchParams.get("search") || "";

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let isPublished;

    const isPublishedParam = searchParams.get("isPublished") || null;

    if (isPublishedParam && isPublishedParam !== "published" && !(await getSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isPublishedParam != null) {
      isPublished =
        isPublishedParam === "published"
          ? true
          : isPublishedParam === "draft"
            ? false
            : undefined;
    } else {
      isPublished = true;
    }
    const skip = (page - 1) * limit;

    // Main query
    const query: any = {};

    // Search
    const conditions: any[] = [];
    if (search) {
      conditions.push({ $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          categories: {
            $regex: search,
            $options: "i",
          },
        },
      ] });
    }
    // Published filter
    if (typeof isPublished != "undefined") {
      query.isPublished = isPublished;
    }

    // Category filter
    if (categories.length) {
      const categoryPatterns = categories.map((name) =>
        new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
      );
      conditions.push({ $or: [
        { category: { $in: categoryPatterns } },
        { categories: { $in: categoryPatterns } },
      ] });
    }
    if (testPattern) {
      conditions.push({ $or: [
        { category: testPattern },
        { categories: testPattern },
      ] });
    }
    if (conditions.length) query.$and = conditions;

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
        data: blogs.map((blog) => ({ ...blog, categories: getBlogCategories(blog) })),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
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
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const categories = getBlogCategories(body);
    if (!categories.length) {
      return NextResponse.json({ error: "Choose at least one category" }, { status: 400 });
    }

    // 🔥 Generate slug
    const slug = body?.slug || slugify(body.title);

    // 🔒 Prevent duplicate slug
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { error: "Blog with same title already exists" },
        { status: 400 },
      );
    }

    const blog = await Blog.create({
      ...body,
      category: categories[0],
      categories,
      slug,
    });

    return NextResponse.json(
      { message: "Blog created", data: blog },
      { status: 201 },
    );
  } catch (error) {
    console.error("[BLOG CREATE]", error);
    return NextResponse.json(
      { error: "Server error", errormsg: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
