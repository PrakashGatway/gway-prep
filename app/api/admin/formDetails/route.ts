import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import FormDetails from "@/app/Model/Form";
import axios from "axios";
import { Tokenchecker } from "@/app/lib/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const token = req.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const isValid = Tokenchecker(token);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { path, data } = body;

        
    const { 
      fullName, 
      email, 
      phone, 
      mobile, 
      interest, 
      city, 
      ...remainingData 
    } = data || {}; 

    const leadPayload = {
      fullName: fullName,
      email: email,
      phone: phone || mobile,
      coursePreference: interest,
      city: city,
      source: "website",
      website: "ooshasPrep",
      extraDetails: {
        ...remainingData
      },
    };

    
    const api = await axios.post(
      `https://server.gatewayabroadeducations.com/api/v1/leads`,
      leadPayload
    );
    console.log("lead" , api.data);
    
    if (!path) {
      return NextResponse.json({
          error: "Path is required",
        },{
          status: 400,
        },
      );
    }



    const newForm = await FormDetails.create({
      path,
      data: data || {},
    });

    return NextResponse.json(
      {
        success: true,
        message: "Form created successfully",
        form: newForm,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.error("POST Form Error:", error);

    return NextResponse.json({
        error: error.message || "Something went wrong",
      },{
        status: 500,
      },
    );
  }
}



export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const path = searchParams.get("path");

    // Get single form by path
    if (path) {
      const form = await FormDetails.findOne({
        path,
      }).lean();

      if (!form) {
        return NextResponse.json(
          {
            error: "Form not found",
          },
          {
            status: 404,
          },
        );
      }

      return NextResponse.json(
        {
          success: true,
          form,
        },
        {
          status: 200,
        },
      );
    }

    // Get all forms
    const forms = await FormDetails.find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: forms.length,
        forms,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("GET Form Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
