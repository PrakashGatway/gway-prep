/**
 * GET    /api/pages/[name]   → Get one page
 * POST   /api/pages/[name]   → Duplicate page
 * PUT    /api/pages/[name]   → Update page
 * DELETE /api/pages/[name]   → Delete page
 */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PageData from "@/app/Model/PageData";

type Params = {
  params: Promise<{
    name: string;
  }>;
};

// ─────────────────────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const page = await PageData.findOne({
      $or: [
        { name: name.toLowerCase() },
        { slug: name.toLowerCase() },
      ],
    })
      .select("-__v")
      .lean();

    if (!page) {
      return NextResponse.json(
        {
          message: `Page "${name}" not found.`,
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Page fetched.",
        data: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGE GET]", error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// POST (Duplicate Page)
// ─────────────────────────────────────────────────────────────

export async function POST(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const body = await req.json();

    const newName = body.name?.trim().toLowerCase();
    const newSlug = body.slug?.trim().toLowerCase();

    if (!newName || !newSlug) {
      return NextResponse.json(
        {
          error: "Both name and slug are required.",
        },
        { status: 400 }
      );
    }

    // Source page
    const sourcePage = await PageData.findOne({
      name: name.toLowerCase(),
    }).lean();

    if (!sourcePage) {
      return NextResponse.json(
        {
          error: "Source page not found.",
        },
        { status: 404 }
      );
    }

    // Check duplicate
    const alreadyExists = await PageData.findOne({
      $or: [
        { name: newName },
        { slug: newSlug },
      ],
    });

    if (alreadyExists) {
      return NextResponse.json(
        {
          error: "Page with same name or slug already exists.",
        },
        { status: 409 }
      );
    }

    // Remove Mongo fields
    delete (sourcePage as any)._id;
    delete (sourcePage as any).__v;
    delete (sourcePage as any).createdAt;
    delete (sourcePage as any).updatedAt;

    const duplicatedPage = await PageData.create({
      ...sourcePage,
      name: newName,
      slug: newSlug,
    });

    return NextResponse.json(
      {
        message: "Page duplicated successfully.",
        data: duplicatedPage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PAGE DUPLICATE]", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// PUT
// ─────────────────────────────────────────────────────────────

export async function PUT(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { name } = await params;

    const body = await req.json();

    const { sections, extraDetails, seoMeta, ...rest } = body;

    await connectDB();

    const setPayload: Record<string, any> = {
      ...rest,
    };

    if (sections) {
      Object.entries(sections).forEach(([key, value]) => {
        setPayload[`sections.${key}`] = value;
      });
    }

    if (extraDetails) {
      Object.entries(extraDetails).forEach(([key, value]) => {
        setPayload[`extraDetails.${key}`] = value;
      });
    }

    if (seoMeta) {
      Object.entries(seoMeta).forEach(([key, value]) => {
        setPayload[`seoMeta.${key}`] = value;
      });
    }

    const updated = await PageData.findOneAndUpdate(
      {
        name: name.toLowerCase(),
      },
      {
        $set: setPayload,
      },
      {
        new: true,
        upsert: true,
        select: "-__v",
      }
    ).lean();

    return NextResponse.json(
      {
        message: "Page updated.",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGE UPDATE]", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────────────────────

export async function DELETE(
  _req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { name } = await params;

    await connectDB();

    const deleted = await PageData.findOneAndDelete({
      name: name.toLowerCase(),
    }).lean();

    if (!deleted) {
      return NextResponse.json(
        {
          error: `Page "${name}" not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Page "${name}" deleted.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PAGE DELETE]", error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      { status: 500 }
    );
  }
}






// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/db";
// import PageData from "@/app/Model/PageData";
// import { UpdatePageDataSchema } from "@/app/type";

// type Params = { params: { name: string } };

// // ─── GET /api/pages/[name] ────────────────────────────────────────────────────
// export async function GET(
//   _req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   try {
//     const {name} = await params;
//     await connectDB();


//     const page = await PageData.findOne({
//       name: name.toLowerCase(),
//     })
//       .select("-__v")
//       .lean();

//     if (!page) {
//       return NextResponse.json(
//         { message: `Page "${name}" not found.`,data:[] },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Page fetched.", data: page },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("[PAGES GET ONE]", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // ─── PUT /api/pages/[name] ────────────────────────────────────────────────────
// export async function PUT(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   try {
    
//     const { name } = await params; // ✅ await params

//     const body = await req.json();
//     // const result = UpdatePageDataSchema.safeParse({
//     //   ...body,
//     //   name: name,  // always take name from URL
//     // });

//     // if (!result.success) {
//     //   return NextResponse.json(
//     //     { error: result.error.flatten().fieldErrors },
//     //     { status: 400 }
//     //   );
//     // }

//     const { sections, extraDetails, seoMeta, ...rest } = body // result.data;

//     await connectDB();

//     // Build $set payload — use dot notation for nested fields
//     // so we only update the keys sent, not wipe the whole object
//     const setPayload: Record<string, any> = { ...rest };

//     if (sections) {
//       for (const [key, value] of Object.entries(sections)) {
//         setPayload[`sections.${key}`] = value;
//       }
//     }

//     if (extraDetails) {
//       for (const [key, value] of Object.entries(extraDetails)) {
//         setPayload[`extraDetails.${key}`] = value;
//       }
//     }

//     if (seoMeta) {
//       for (const [key, value] of Object.entries(seoMeta)) {
//         setPayload[`seoMeta.${key}`] = value;
//       }
//     }

//     const updated = await PageData.findOneAndUpdate(
//       { name: name.toLowerCase() },
//       { $set: setPayload },
//       {
//         new: true,      // return updated document
//         upsert: true,   // create if doesn't exist
//         select: "-__v",
//       }
//     ).lean();

//     return NextResponse.json(
//       { message: "Page updated.", data: updated },
//       { status: 200 }
//     );
//   } catch (error) {
    
//     console.error("[PAGES POST]", error);
//     return NextResponse.json({ error: `Server error: ${error instanceof Error ? error.message : error}` }, { status: 500 });
//   }
// }

// // ─── DELETE /api/pages/[name] ─────────────────────────────────────────────────
// export async function DELETE(
//   _req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   try {
//     const { name } = await params; // ✅ await params

//     await connectDB();

//     const deleted = await PageData.findOneAndDelete({
//       name: name.toLowerCase(),
//     }).lean();

//     if (!deleted) {
//       return NextResponse.json(
//         { error: `Page "${name}" not found.` },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: `Page "${name}" deleted.` }, { status: 200 });
//   } catch (error) {
//     console.error("[PAGES DELETE]", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }