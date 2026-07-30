import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import QuestionAnalytics from "@/app/Model/QuestionAnalytics";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { pageSlug, sectionKey, question, option } = await req.json();

    if (!pageSlug || !sectionKey || !question || !option) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Use findOneAndUpdate with atomic operations
    let analytics = await QuestionAnalytics.findOneAndUpdate(
      {
        pageSlug,
        sectionKey,
        question,
        "options.option": option, // Check if option already exists
      },
      {
        // Increment the clicks for the matching option
        $inc: { "options.$.totalClicks": 1 },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // If option wasn't found, add it
    if (!analytics) {
      analytics = await QuestionAnalytics.findOneAndUpdate(
        {
          pageSlug,
          sectionKey,
          question,
        },
        {
          $push: {
            options: {
              option,
              totalClicks: 1,
            },
          },
        },
        {
          new: true,
          upsert: true, // Create document if it doesn't exist
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: analytics?.options || analytics,
    });
  } catch (error: any) {
    console.error("Error updating analytics:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate entry",
          error: error.message,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}





export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Read the single id from the JSON body (or query param as fallback)
    let id: string | undefined;
    try {
      const body = await req.json();
      id = body?.id;
    } catch (e) {
      // ignore JSON parse errors for GET requests
    }

    if (!id) {
      const url = new URL(req.url);
      id = url.searchParams.get("id") ?? undefined;
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing required field: id" },
        { status: 400 }
      );
    }

    // Update the document by pushing the single id into the deviceId array field
    const updatedAnalytics = await QuestionAnalytics.findOneAndUpdate(
      { questionId: "some_identifier" }, // Change this to your actual document lookup filter
      { 
        $addToSet: { deviceId: id } // Treats the single string as an array item; avoids duplicates
      },
      { new: true, upsert: true } // Creates the document if it doesn't exist
    );

    return NextResponse.json({ success: true, data: updatedAnalytics });
  } catch (error: any) {
    console.error("Error updating analytics:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Duplicate key error", message: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

