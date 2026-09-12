import {NextResponse, NextRequest} from "next/server";
import {connectDB} from "@/app/lib/db";
import Subscribe from "../../Model/Subscribe";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const {email} = body;

        const data = await Subscribe.create({
            email
        });

        return NextResponse.json({
            success : true,
            message : 'email add successfully'
        }, {status : 201})

    } catch (error : any) {
        console.error('error : ', error?.message);
        return NextResponse.json({
            success :false,
            message : error?.message
        },{status : 500})
        
    }
}



export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const data = await Subscribe.find().sort({createdAt : -1});

        return NextResponse.json({
            success : true,
            count : data.length,
            data : data
        });

    } catch (error : any) {
        console.error('error Messge :', error);
        return NextResponse.json({
            success : false,
            message : error.message
        })
    }
}

