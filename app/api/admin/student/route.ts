import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Student from "@/app/Model/Student";
import { StudentValidationSchema } from "@/app/type/student"; // Use the schema, not just the type
import { Tokenchecker } from "@/app/lib/auth";
import { slugify } from "@/app/lib/slug";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Token Verification
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET!);
  // } catch (error) {
  //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  // }
  Tokenchecker(token);

  try {
    const body = await req.json();

    // 2. Validation with safeParse

    const result = StudentValidationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // 3. Database Operations
    await connectDB();

    // Use the validated data from result.data
    const { name } = body; // result.data;
    const exist = await Student.findOne({ name });

    if (exist) {
      return NextResponse.json(
        { error: "Student with this name already exists." },
        { status: 409 },
      );
    }

    const normalizedSlug = body.slug
      ? slugify(body.slug).replace(/^-+|-+$/g, "").slice(0, 100)
      : "";
    if (normalizedSlug && (await Student.exists({ slug: normalizedSlug }))) {
      return NextResponse.json(
        { error: "A student case study already uses this slug." },
        { status: 409 },
      );
    }

    await Student.create({ ...result.data, slug: normalizedSlug });

    return NextResponse.json(
      { message: "Student created successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("[STUDENT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 1. Correct return type: Promise<NextResponse>
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const slug = searchParams.get("slug")?.trim().toLowerCase();
    if (slug) {
      const student = await Student.findOne({ slug }).lean();
      return student
        ? NextResponse.json({ data: student }, { status: 200 })
        : NextResponse.json({ error: "Student case study not found" }, { status: 404 });
    }

    if (query === "all") {
      const data = await Student.find();
      return NextResponse.json({
        data: data,
      });
    }

    // 2. Safely parse numbers from strings
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const newestFirst = searchParams.get("sort") === "createdAtDesc";
    const skip = (page - 1) * limit;

    const filter = query
      ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { type: { $regex: query, $options: "i" } },
            { university: { $regex: query, $options: "i" } },
            { course: {$regex: query, $options: "i"} }
          ],
        }
      : {};

    // // 3. Parallel fetching for performance
    // const [students, total] = await Promise.all([
    //   Student.find(filter)
    //     .sort({ createdAt: -1 })
    //     .skip(skip)
    //     .limit(limit)
    //     .lean(),
    //   Student.countDocuments(filter),
    // ]);

    const [students, total] = await Promise.all([
      newestFirst
        ? Student.find(filter)
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
        : Student.aggregate([
            { $match: filter },
            { $sample: { size: Math.min(limit + skip, 10000) } },
            { $skip: skip },
            { $limit: limit },
          ]),
      Student.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        data: students,
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
    console.error("[STUDENT_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}


export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // 2. Await the params
    // const { id } = await params;
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');


// console.log(id)
    // 3. Pass the ID directly to findByIdAndDelete
    const deleted = await Student.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: `Student with ID ${id} not found` },
        { status: 404 },
      );
    }

    // 4. Added missing comma here
    return NextResponse.json(
      { message: "Data deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[STUDENT_DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest): Promise<NextResponse> {
  
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  Tokenchecker(token);

  try {
    const body = await req.json();

    const result = StudentValidationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await connectDB();

    const { id, ...updatedbody } = body; 

    const normalizedSlug = body.slug
      ? slugify(body.slug).replace(/^-+|-+$/g, "").slice(0, 100)
      : "";
    if (normalizedSlug && (await Student.exists({ slug: normalizedSlug, _id: { $ne: id } }))) {
      return NextResponse.json(
        { error: "A student case study already uses this slug." },
        { status: 409 },
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(id,
      { $set: { ...result.data, ...updatedbody, slug: normalizedSlug } },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Student updated successfully.",
        data: updatedStudent,
      },
      { status: 200 },
    );

  } catch (error) {
    console.error("[STUDENT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
