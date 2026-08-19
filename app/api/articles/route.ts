import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Article from "@/app/Model/Article";
import CategoryDetail from "@/app/Model/Category";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

// ============================================================
// GET ARTICLES
// ============================================================

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const status = searchParams.get("status") || "published";

        const page = Math.max(
            Number(searchParams.get("page")) || 1,
            1
        );

        const limit = Math.min(
            Number(searchParams.get("limit")) || 10,
            100
        );

        const skip = (page - 1) * limit;

        // ========================================================
        // FILTER
        // ========================================================

        const filter: Record<string, any> = {};

        // Status
        if (status && status !== "all") {
            filter.status = status;
        }

     if (category && category !== "all") {
    filter.category = category;
}



        // Search
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    content: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

       

        // ========================================================
        // QUERY
        // ========================================================

        const [articles, total] = await Promise.all([
            Article.find(filter)
                .sort({
                    order: 1,
                    createdAt: -1,
                })
                .skip(skip)
                .limit(limit)
                .lean(),

            Article.countDocuments(filter),
        ]);

        // ========================================================
        // PAGINATION
        // ========================================================

        const pages = Math.ceil(total / limit);

        return NextResponse.json(
            {
                success: true,
                data: articles,
                pagination: {
                    page,
                    limit,
                    pages,
                    total,
                },
            },
            {
                status: 200,
            }
        );

    } catch (error: any) {
        console.error("GET ARTICLES ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch articles",
                error: error?.message,
            },
            {
                status: 500,
            }
        );
    }
}


// ============================================================
// CREATE ARTICLE
// ============================================================

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            title,
            slug,
            description,
            content,
            category,
            icon,
            status,
            isFeatured,
            isPopular,
            order,
        } = body;


        // ========================================================
        // VALIDATION
        // ========================================================

        if (
            !title ||
            !slug ||
            !description ||
            !content ||
            !category
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Required fields are missing",
                },
                {
                    status: 400,
                }
            );
        }


        // ========================================================
        // CHECK SLUG
        // ========================================================

        const existingArticle =
            await Article.findOne({ slug });

        if (existingArticle) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Article with this slug already exists",
                },
                {
                    status: 409,
                }
            );
        }


        // ========================================================
        // CREATE
        // ========================================================

        const article = await Article.create({
            title,
            slug,
            description,
            content,

            category,

            icon: icon || "BookOpen",

            status: status || "draft",

            isFeatured:
                typeof isFeatured === "boolean"
                    ? isFeatured
                    : false,

            isPopular:
                typeof isPopular === "boolean"
                    ? isPopular
                    : false,

            order: order || 0,
        });


        return NextResponse.json(
            {
                success: true,
                message: "Article created successfully",
                data: article,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        console.error("CREATE ARTICLE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create article",
            },
            {
                status: 500,
            }
        );
    }
}


