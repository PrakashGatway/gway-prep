import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import BlogCategoryM from "@/app/Model/Blog";
import { BlogCategory } from "@/app/type/blog";
import { Tokenchecker } from "@/app/lib/auth";
import { slugify } from "@/app/lib/slug";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const Token = req.cookies.get("adminToken")?.value;
  if (!Token) return NextResponse.json({ error: "No token Provided" }, { status: 401 });

  try {
    // Ensure the token is valid
    await Tokenchecker(Token); 

    const body = await req.json();
    const validation = BlogCategory.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const { name } = body;

    const exist = await BlogCategoryM.findOne({ name });
    if (exist) {
      return NextResponse.json(
        { error: "Category already exists." },
        { status: 409 }
      );
    }

    const slug = slugify(name);
    await BlogCategoryM.create({ name, slug });

    return NextResponse.json(
      { message: "Category created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST_CATEGORY]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const DATA = await BlogCategoryM.find();

    if (!DATA || DATA.length === 0) {
      return NextResponse.json({ error: "No Data found." }, { status: 404 });
    }

    return NextResponse.json({ data: DATA }, { status: 200 });
  } catch (error) {
    console.error("[GET_CATEGORY]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await BlogCategoryM.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Data Deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("[DELETE_CATEGORY]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
