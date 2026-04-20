import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import { signToken } from "@/app/lib/auth";
import User from "@/app/Model/User";
import { LoginSchema } from "@/app/type";

export async function POST(req: NextRequest): Promise<NextResponse>{
    try {
        const body  = await req.json();
        const result = LoginSchema.safeDecode(body);

        if(!result.success){
            return NextResponse.json(
                {error : result.error.flatten().fieldErrors},
                {status : 400}
            );
        }

        const {email, password} = result.data;
        await connectDB();

        const user = await User.findOne({email}).select("+password");
        
        if(!user){
            return NextResponse.json(
                {error : "Invaild  credentional"},
                {status : 401}
            )
        }

        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
            return NextResponse.json(
                {error : "Invalid Password."},
                {status : 401}
            )
        }

        const token  = signToken({userID : user._id.toString(), role : user.role});

        const response = NextResponse.json(
            {message : "Login Successful",user},
            {status : 200}
        );

        response.cookies.set("adminToken", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "development",
            sameSite : "lax",
            maxAge : 60*60*24*7,
            path : "/"
        })
        
        return response;
    } catch (error) {
        console.error("[LOGIN]",error);
        return NextResponse.json(
            {error : "Server error"},
            {status : 500}
        )
    }
}
