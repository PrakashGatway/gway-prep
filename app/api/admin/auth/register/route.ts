import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import { signToken } from "@/app/lib/auth";
import User from "@/app/Model/User";
import { RegisterSchema } from "@/app/type";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const result = RegisterSchema.safeDecode(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, password, role } = result.data;

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exist." },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role });

    const token = signToken({ userID: user._id.toString(), role: user.role });

    const response = NextResponse.json(
      { message: "Account created.", user },
      { status: 201 },
    );

    response.cookies.set("adminToken", token, {
      httpOnly: true, // JS cannot read this cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // CSRF protection
      maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[REGESTER]", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
