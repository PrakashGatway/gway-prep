import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Comments from "../../Model/Comments";


export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      comment,
      page,
    } = body;

    // Validation
    if (!comment || !comment.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment is required",
        },
        { status: 400 }
      );
    }

    if (!page || !page.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Page is required",
        },
        { status: 400 }
      );
    }

    // Create comment
    const newComment = await Comments.create({
      name: name?.trim() || "",
      email: email?.trim().toLowerCase() || "",
      comment: comment.trim(),
      page: page.trim(),

    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment added successfully",
        data: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Comment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create comment",
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}



export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const publish = searchParams.get("publish");

    const filter: Record<string, any> = {};

    if (page) {
      filter.page = page;
    }

    if (publish !== null) {
      filter.publish = publish === "true";
    }

    const comments = await Comments.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.error("Get Comments Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get comments",
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

