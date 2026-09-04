import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import FormDetails from "@/app/Model/Form";
import axios from "axios";
import { Tokenchecker } from "@/app/lib/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body = await req.json();
    const { path, data } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const { fullName, email, phone, mobile, interest, city, ...remainingData } =
      data || {};

    const contactNumber = phone || mobile;

    if (contactNumber !== undefined && contactNumber !== null) {
      const digitsOnly = String(contactNumber).replace(/\D/g, "");

      if (digitsOnly.length !== 10) {
        return NextResponse.json(
          { message: "Phone or mobile number must be exactly 10 digits" },
          { status: 400 },
        );
      }
    }

    const newForm = await FormDetails.create({
      path,
      data: data || {},
    });

    console.log("Form created successfully:", newForm._id);

    const leadPayload = {
      fullName,
      email,
      phone: contactNumber,
      coursePreference: interest,
      city,
      source: "website",
      website: "ooshasPrep",
      extraDetails: {
        ...remainingData,
      },
    };

    console.log(leadPayload)
    try {
      const apiResponse = await axios.post(
        "https://server.gatewayabroadeducations.com/api/v1/leads",
        leadPayload,
      );

      console.log("Gateway Abroad Lead:", apiResponse.data);

      return NextResponse.json(
        {
          success: true,
          message: "Form created and lead submitted successfully",
          form: newForm,
          lead: apiResponse.data,
        },
        {
          status: 201,
        },
      );
    } catch (apiError: any) {
      console.error(
        "Gateway Abroad API Error:",
        apiError?.response?.data || apiError.message,
      );

      return NextResponse.json(
        {
          success: true,
          message: "Form saved successfully, but lead API submission failed",
          form: newForm,
          leadApiSuccess: false,
          apiError:
            apiError?.response?.data?.message ||
            apiError?.message ||
            "Lead API failed",
        },
        {
          status: 201,
        },
      );
    }
  } catch (error: any) {
    console.error("POST Form Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {

//     await connectDB();

//     const body = await req.json();
//     const { path, data } = body;

//     const {
//       name,
//       email,
//       phone,
//       mobile,
//       interest,
//       city,
//       ...remainingData
//     } = data || {};

//     const leadPayload = {
//       fullName: name,
//       email: email,
//       phone: phone || mobile,
//       coursePreference: interest,
//       city: city,
//       source: "website",
//       website: "ooshasPrep",
//       extraDetails: {
//         ...remainingData
//       },
//     };

//     if (!path) {
//       return NextResponse.json({error: "Path is required"},{status: 400});
//     }

//     const newForm = await FormDetails.create({
//       path,
//       data: data || {},
//     });

//     const api = await axios.post(
//       `https://server.gatewayabroadeducations.com/api/v1/leads`,
//       leadPayload
//     );
//     console.log("lead" , api.data);

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Form created successfully",
//         form: newForm,
//       },
//       {
//         status: 201,
//       },
//     );
//   } catch (error: any) {
//     console.error("POST Form Error:", error);

//     return NextResponse.json({
//         error: error.message || "Something went wrong",
//       },{status: 500}
//     );
//   }
// }

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
