import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import AuthorModel from '@/app/Model/Auther'; // Verified schema model name
import { Tokenchecker } from "@/app/lib/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token Provided" }, { status: 401 });
  }

  try {
    
    await Tokenchecker(token); 

    const body = await req.json();
    await connectDB();

    const { 
      name, 
      slug, 
      subtitle, 
      shortBio, 
      details, 
      education, 
      experience, 
      image, 
      linkedin, 
      website, 
      isActive, 
      specializations 
    } = body;

    const normalizedSlug = typeof slug === "string" ? slug.trim().toLowerCase() : "";

    
    if (!name || !normalizedSlug) {
      return NextResponse.json(
        { error: "Name and slug are required fields." },
        { status: 400 }
      );
    }

    
    const existingAuthor = await AuthorModel.findOne({ slug: normalizedSlug });
    if (existingAuthor) {
      return NextResponse.json(
        { error: "An author with this slug already exists." },
        { status: 409 }
      );
    }

    
    const newAuthor = await AuthorModel.create({
      name: typeof name === "string" ? name.trim() : name,
      slug: normalizedSlug,
      subtitle,
      shortBio,
      details,
      education,
      experience,
      image,
      linkedin,
      website,
      isActive: isActive !== undefined ? isActive : true,
      specializations: Array.isArray(specializations) ? specializations : []
    });

    return NextResponse.json(
      { message: "Author created successfully.", data: newAuthor },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST_AUTHOR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    console.log(slug, "author slug");

    let author;

    if (slug) {
      // Get single author by slug
      author = await AuthorModel.findOne({
        slug: slug.toLowerCase(),
      });
    } else {
      // Get all authors
      author = await AuthorModel.find();
    }

    if (!author || (Array.isArray(author) && author.length === 0)) {
      return NextResponse.json(
        { error: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: author },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_AUTHOR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token Provided" }, { status: 401 });
  }

  try {
    
    await Tokenchecker(token);

    const body = await req.json();
    await connectDB();

    
    const { id, slug, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Author ID is required for updates" }, { status: 400 });
    }

    
    if (slug) {
      const formattedSlug = slug.toLowerCase();
      
      const duplicateSlug = await AuthorModel.findOne({ 
        slug: formattedSlug, 
        _id: { $ne: id } 
      });

      if (duplicateSlug) {
        return NextResponse.json(
          { error: "Another author is already using this slug." },
          { status: 409 }
        );
      }
      
      updateData.slug = formattedSlug;
    }

    console.log(updateData,"updateData");

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedAuthor) {
      return NextResponse.json({ error: "Author not found or could not be updated" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Author updated successfully.", data: updatedAuthor },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT_AUTHOR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token Provided" }, { status: 401 });
  }

  try {
    // Secure authorization check
    await Tokenchecker(token);

    const body = await req.json();
    await connectDB();

    const { id } = body;

    // Fixed validation message context
    if (!id) {
      return NextResponse.json({ error: "Author ID is required for deletion" }, { status: 400 });
    }
    
    // Fixed Mongoose call: pass an object query filter matching the ID key
    const deleteResult = await AuthorModel.deleteOne({ _id: id });

    // Fixed verification: check the deletedCount property to see if a document was removed
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Author deleted successfully.", data: deleteResult },
      { status: 200 }
    );
  } catch (error) {
    // Fixed log header to accurately track exceptions
    console.error("[DELETE_AUTHOR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
