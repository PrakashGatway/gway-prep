import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import FormDetails from "@/app/Model/Form";
import { FormValidation } from "@/app/type/form";
import { Tokenchecker } from "@/app/lib/auth";

export async function POST(req:NextRequest): Promise<NextResponse> {
    const token = req.cookies.get("adminToken")?.value;
    if(!token) {
        return NextResponse.json({error : "No token provided"})
    }

    Tokenchecker(token);
    
    try {
        const body = await req.json();
        // cosnt 
    } catch (error) {
        
    }
    
}

