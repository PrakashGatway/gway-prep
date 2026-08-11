// import { NextResponse } from "next/server";
// export async function POST() : Promise<NextResponse> {
//     const req = NextResponse.json({message : "Logged out"});
//     req.cookies.set("token","", {maxAge: 0, path: "/"});
//     return req;
// }




import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  });

  response.cookies.set({
    name: "adminToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}

