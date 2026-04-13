import { NextResponse } from "next/server";
export async function POST() : Promise<NextResponse> {
    const req = NextResponse.json({message : "Logged out"});
    req.cookies.set("token","", {maxAge: 0, path: "/"});
    return req;
}


