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
      status,
      Score,
      refrenceSlug
    } = body;

    // Validation
    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment is required",
        },
        { status: 400 }
      );
    }

    if (!page || typeof page !== "string" || !page.trim()) {
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
      name: typeof name === "string" ? name.trim() : "",
      email: typeof email === "string" ? email.trim().toLowerCase() : "",
      comment: comment.trim(),
      page: page.trim(),
      status: typeof status === "string" ? status : "pending",
      Score: typeof Score === "string" ? Score.trim() : "",
      refrenceSlug: typeof refrenceSlug === "string" ? refrenceSlug.trim() : "",
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      id,
      name,
      email,
      comment,
      page,
      Score,
      status
    } = body;

    // Validate ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Comment ID is required",
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment is required",
        },
        { status: 400 }
      );
    }

    if (!page || typeof page !== "string" || !page.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Page is required",
        },
        { status: 400 }
      );
    }

    const updatedComment = await Comments.findByIdAndUpdate(
      id,
      {
        $set: {
          name: typeof name === "string" ? name.trim() : "",
          email:
            typeof email === "string"
              ? email.trim().toLowerCase()
              : "",
          comment: comment.trim(),
          page: page.trim(),
          Score:
            typeof Score === "string"
              ? Score.trim()
              : "",
              status: typeof status === "string" ? status : "pending",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComment) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Comment updated successfully",
        data: updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Comment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update comment",
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
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();

    // Pagination
    const pageNumber = Math.max(
      Number(searchParams.get("pageNumber")) || 1,
      1
    );

    const limit = Math.max(
      Number(searchParams.get("limit")) || 10,
      1
    );

    const skip = (pageNumber - 1) * limit;

    // Filter
    const filter: Record<string, any> = {};

    // Page filter
    if (page) {
      filter.page = page;
    }

    // Status filter
    if (
      status &&
      ["approved", "rejected", "pending"].includes(status)
    ) {
      filter.status = status;
    }

    // Search filter
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          comment: {
            $regex: search,
            $options: "i",
          },
        },
        {
          page: {
            $regex: search,
            $options: "i",
          },
        },
        {
          refrenceSlug: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Total comments
    const totalComments = await Comments.countDocuments(filter);

    // Paginated comments
    const comments = await Comments.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(
      totalComments / limit
    );

    return NextResponse.json({
      success: true,

      data: comments,

      pagination: {
        currentPage: pageNumber,
        limit,
        totalComments,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
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

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    let id = searchParams.get("id");

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Comment ID is required",
        },
        { status: 400 }
      );
    }

    const deletedComment = await Comments.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    console.error("Delete Comment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete comment",
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}