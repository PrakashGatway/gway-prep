


import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PageData from "@/app/Model/PageData";

type Params = {
  params: Promise<{
    name: string;
  }>;
};

const parseBoolean = (value: string | null): boolean | undefined => {
  if (value === null) return undefined;

  if (value === "true") return true;
  if (value === "false") return false;

  return undefined;
};



export async function GET(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const { searchParams } = new URL(req.url);
    const isPublished = parseBoolean(searchParams.get("isPublished"));

    const query: Record<string, any> = {};

    if (typeof isPublished !== "undefined") {
      query["seoMeta.isPublished"] = isPublished;
    }

    let page;

    if (name === "all") {
      page = await PageData.find(query)
        .select(
          "name seoMeta.canonicalUrl seoMeta.navIcon seoMeta.isPublished template slug",
        )
        .lean();

      return NextResponse.json(
        {
          message: "Pages fetched.",
          data: page,
        },
        { status: 200 },
      );
    }

    query.$or = [
      { name: name.toLowerCase() },
      { slug: name.toLowerCase() },
    ];

    page = await PageData.findOne(query).lean();

    if (!page) {
      return NextResponse.json(
        {
          message: `Page "${name}" not found.`,
          data: [],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Page fetched.",
        data: page,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PAGE GET]", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 },
    );
  }
}



export async function POST(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const body = await req.json();

    const newName = body.name?.trim().toLowerCase();
    const newSlug = body.slug?.trim().toLowerCase();
    const duplicateOf = body.duplicateOf;

    if (!newName || !newSlug) {
      return NextResponse.json(
        {
          error: "Both name and slug are required.",
        },
        { status: 400 },
      );
    }

    const sourcePage = await PageData.findOne({
      $or: [
        { name: name.toLowerCase() },
        { slug: name.toLowerCase() },
      ],
    }).lean();

    if (!sourcePage) {
      return NextResponse.json(
        {
          error: "Source page not found.",
        },
        { status: 404 },
      );
    }

    const alreadyExists = await PageData.findOne({
      $or: [
        { name: newName },
        { slug: newSlug },
      ],
    }).lean();

    if (alreadyExists) {
      return NextResponse.json(
        {
          error: "Page with same name or slug already exists.",
        },
        { status: 409 },
      );
    }

    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      ...sourceData
    } = sourcePage as any;

    const duplicatedPage = await PageData.create({
      ...sourceData,

      name: newName,
      slug: newSlug,

      seoMeta: {
        ...(sourcePage.seoMeta || {}),
        name: newName,
        slug: newSlug,
        canonicalUrl: newSlug,
        duplicateOf: duplicateOf || sourcePage.slug,
      },
    });

    return NextResponse.json(
      {
        message: "Page duplicated successfully.",
        data: duplicatedPage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[PAGE DUPLICATE]", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 },
    );
  }
}



export async function PUT(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const body = await req.json();

    const {
      sections,
      extraDetails,
      seoMeta,
      ...rest
    } = body;

    const setPayload: Record<string, any> = {
      ...rest,
    };

    if (sections && typeof sections === "object") {
      Object.entries(sections).forEach(([key, value]) => {
        setPayload[`sections.${key}`] = value;
      });
    }

    if (extraDetails && typeof extraDetails === "object") {
      Object.entries(extraDetails).forEach(([key, value]) => {
        setPayload[`extraDetails.${key}`] = value;
      });
    }

    if (seoMeta && typeof seoMeta === "object") {
      Object.entries(seoMeta).forEach(([key, value]) => {
        setPayload[`seoMeta.${key}`] = value;
      });
    }

    const existingPage = await PageData.findOne({
      $or: [
        { slug: name.toLowerCase() },
        { name: name.toLowerCase() },
      ],
    }).lean();

    if (!existingPage) {
      return NextResponse.json(
        {
          error: `Page "${name}" not found.`,
        },
        { status: 404 },
      );
    }

    const updated = await PageData.findByIdAndUpdate(
      existingPage._id,
      {
        $set: setPayload,
      },
      {
        new: true,
        select: "-__v",
        runValidators: true,
      },
    ).lean();

    return NextResponse.json(
      {
        message: "Page updated.",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PAGE UPDATE]", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 },
    );
  }
}



export async function DELETE(
  _req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const page = await PageData.findOne({
      $or: [
        { name: name.toLowerCase() },
        { slug: name.toLowerCase() },
      ],
    }).lean();

    if (!page) {
      return NextResponse.json(
        {
          error: `Page "${name}" not found.`,
        },
        { status: 404 },
      );
    }

    await PageData.findByIdAndDelete(page._id);

    return NextResponse.json(
      {
        message: `Page "${name}" with ID ${page._id} deleted.`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PAGE DELETE]", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 },
    );
  }
}










// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/db";
// import PageData from "@/app/Model/PageData";

// type Params = {
//   params: Promise<{
//     name: string;
//     isPublished ?: boolean;
//   }>;
// };


// export async function GET(
//   _req: NextRequest,
//   { params }: Params,
// ): Promise<NextResponse> {
//   try {
//     const { name,isPublished } = await params;

//     await connectDB();

//     let page;
//     const query: Record<string, any> = {};

//     if (name === "all") {
//       if (typeof isPublished !== "undefined") {
//         query["seoMeta.isPublished"] = isPublished;
//       }

//       page = await PageData.find(query)
//         .select("name seoMeta.canonicalUrl seoMeta.navIcon template slug")
//         .lean();
//     } else {
//       query.$or = [{ name: name.toLowerCase() }, { slug: name }];
//       if (typeof isPublished !== "undefined") {
//         query["seoMeta.isPublished"] = isPublished;
//       }

//       page = await PageData.findOne(query).lean();
//     }

//     if (!page) {
//       return NextResponse.json(
//         {
//           message: `Page "${name}" not found.`,
//           data: [],
//         },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Page fetched.",
//         data: page,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("[PAGE GET]", error);

//     return NextResponse.json(
//       {
//         error: "Server error",
//       },
//       { status: 500 },
//     );
//   }
// }


// export async function POST(
//   req: NextRequest,
//   { params }: Params,
// ): Promise<NextResponse> {
//   try {
//     const { name } = await params;

//     await connectDB();

//     const body = await req.json();

//     const newName = body.name?.trim().toLowerCase();
//     const newSlug = body.slug?.trim().toLowerCase();
//     const duplicateOf = body?.duplicateOf;

//     if (!newName || !newSlug) {
//       return NextResponse.json(
//         {
//           error: "Both name and slug are required.",
//         },
//         { status: 400 },
//       );
//     }

//     // Source page
//     const sourcePage = await PageData.findOne({
//       name: name.toLowerCase(),
//     }).lean();

//     if (!sourcePage) {
//       return NextResponse.json(
//         {
//           error: "Source page not found.",
//         },
//         { status: 404 },
//       );
//     }

//     // Check duplicate
//     const alreadyExists = await PageData.findOne({
//       $or: [{ name: newName }, { slug: newSlug }],
//     });

//     if (alreadyExists) {
//       return NextResponse.json(
//         {
//           error: "Page with same name or slug already exists.",
//         },
//         { status: 409 },
//       );
//     }

//     // Remove Mongo fields
//     delete (sourcePage as any)._id;
//     delete (sourcePage as any).__v;
//     delete (sourcePage as any).createdAt;
//     delete (sourcePage as any).updatedAt;

//     const duplicatedPage = await PageData.create({
//       ...sourcePage,
//       name: newName,
//       slug: newSlug,
//       seoMeta: {
//     ...sourcePage.seoMeta,
//         name: newName,
//         slug: newSlug,
//         canonicalUrl: newSlug,
//         duplicateOf: duplicateOf
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Page duplicated successfully.",
//         data: duplicatedPage,
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("[PAGE DUPLICATE]", error);

//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Server error",
//       },
//       { status: 500 },
//     );
//   }
// }


// export async function PUT(
//   req: NextRequest,
//   { params }: Params,
// ): Promise<NextResponse> {
//   try {
//     const { name } = await params;

//     const body = await req.json();

//     const { sections, extraDetails, seoMeta, ...rest } = body;

//     await connectDB();

//     const setPayload: Record<string, any> = {
//       ...rest,
//     };

//     if (sections) {
//       Object.entries(sections).forEach(([key, value]) => {
//         setPayload[`sections.${key}`] = value;
//       });
//     }

//     if (extraDetails) {
//       Object.entries(extraDetails).forEach(([key, value]) => {
//         setPayload[`extraDetails.${key}`] = value;
//       });
//     }

//     if (seoMeta) {
//       Object.entries(seoMeta).forEach(([key, value]) => {
//         setPayload[`seoMeta.${key}`] = value;
//       });
//     }

//     const updated = await PageData.findOneAndUpdate(
//       {
//         slug: name,
//       },
//       {
//         $set: setPayload,
//       },
//       {
//         new: true,
//         upsert: true,
//         select: "-__v",
//       },
//     ).lean();

//     return NextResponse.json(
//       {
//         message: "Page updated.",
//         data: updated,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("[PAGE UPDATE]", error);

//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Server error",
//       },
//       { status: 500 },
//     );
//   }
// }


// export async function DELETE(
//   _req: NextRequest,
//   { params }: Params,
// ): Promise<NextResponse> {
//   try {
//     const { name } = await params;
//     await connectDB();

    
//     const page = await PageData.findOne({
//       $or: [{ name: name.toLowerCase() }, { slug: name.toLowerCase() }],
//     }).lean();

//     if (!page) {
//       return NextResponse.json(
//         { error: `Page "${name}" not found.` },
//         { status: 404 },
//       );
//     }

//     const deleted = await PageData.findByIdAndDelete(page._id).lean();

//     return NextResponse.json(
//       { message: `Page "${name}" with ID ${page._id} deleted.` },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("[PAGE DELETE]", error);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 },
//     );
//   }
// }





