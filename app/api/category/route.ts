import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/app/lib/db"
import CategoryDetail from "@/app/Model/Category";



export async function POST(request : NextRequest){
    try{
        await connectDB();
        const body = await request.json();

        const {slug,name,description} = body
console.log(body)

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