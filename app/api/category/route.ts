import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/app/lib/db"
import CategoryDetail from "@/app/Model/Category";
import { success } from "zod";



export async function POST(request : NextRequest){
    try{
        await connectDB();
        const body = await request.json();

        const {slug,name,description} = body
        

        if(!slug||!name){
            return NextResponse.json({
                success : false,
                message : "Required are missing.."
            },{
                status : 400
            })
        }

        const existingSlug = await CategoryDetail.findOne({slug})

        if(existingSlug){
            return NextResponse.json({
                success : false,
                message: "This slug is already exists"
            },{
                status : 409
            })
        }

        const category = await CategoryDetail.create({
            name,slug,description
        })

        return NextResponse.json({
            success : true,
            message :  "Category created successfully..",
            data : category
        },{
            status : 200
        })



    }

    catch(err:any){
        console.error("Create Category Error.. ",err)
        return NextResponse.json({
            success : false,
            message : err.message ||  "Failed to create category..",
            error : err
        },{
            status : 500
        })
    }
}



export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = request.nextUrl;

        const name = searchParams.get("name");
        const slug = searchParams.get("slug");
        const description = searchParams.get("description");

        const filter: Record<string, string> = {};

        if (name) filter.name = name;
        if (slug) filter.slug = slug;
        if (description) filter.description = description;

        const categories = await CategoryDetail.find(filter);

        return NextResponse.json(
            {
                success: true,
                message: "Categories fetched successfully.",
                data: categories,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get Category Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch categories.",
            },
            { status: 500 }
        );
    }
}

export  async function PUT(request: NextRequest){
    try{
        await connectDB()
        const {searchParams} =  request.nextUrl
        const Oldslug = searchParams.get("slug")

        const body = await request.json()

     const {name,description,slug} = body

        if(!Oldslug){
            return NextResponse.json({
                success: false,
                message : "slug is mandatory.."
            },{
                status : 400
            })
        }

        const category = await CategoryDetail.findOne({slug:Oldslug})

        if(!category){
            return NextResponse.json({
                success : false,
                message : "category not found..."
            },{
                status : 404
            })
        }

        category.name = name
        category.description = description
        category.slug = slug

         await category.save();

        return NextResponse.json(
            {
                success: true,
                message: "Category updated successfully",
                data: category,
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("UPDATE CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update category",
            },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category id is required",
                },
                { status: 400 }
            );
        }

        const category = await CategoryDetail.findOne({slug});

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        await CategoryDetail.findOneAndDelete({slug});

        return NextResponse.json(
            {
                success: true,
                message: "Category deleted successfully",
            },
            { status: 200 }
        );

    } catch (error) {

        console.error(
            "DELETE CATEGORY ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete category",
            },
            { status: 500 }
        );
    }
}