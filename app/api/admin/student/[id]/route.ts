import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Student from "@/app/Model/Student";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();

    const { id } = params;

    const student = await Student.findById(id);

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: student,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[STUDENT_GET]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

