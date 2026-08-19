import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Article from "@/app/Model/Article";
import CategoryDetail from "@/app/Model/Category";


// ============================================================
// GET SINGLE ARTICLE
// ============================================================

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const article = await Article.findOne({
            slug
        });


        if (!article) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Article not found",
                },
                {
                    status: 404,
                }
            );
        }


        // Increase views

        article.views += 1;

        await article.save();


        return NextResponse.json({
            success: true,
            data: article,
        });

    } catch (error) {

        console.error("GET ARTICLE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch article",
            },
            {
                status: 500,
            }
        );
    }
}


export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const body = await request.json();

        const {
            title,
            slug: newSlug,
            description,
            content,
            category,
            icon,
            status,
            isFeatured,
            isPopular,
        } = body;

        // ==============================
        // CHECK ARTICLE
        // ==============================

        const article = await Article.findOne({
            slug,
        });

        if (!article) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Article not found",
                },
                {
                    status: 404,
                }
            );
        }

        // ==============================
        // REQUIRED FIELDS
        // ==============================

        if (!title || !newSlug || !description || !content) {
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

        // ==============================
        // CHECK NEW SLUG
        // ==============================

        if (newSlug !== article.slug) {

            const existingArticle = await Article.findOne({
                slug: newSlug,
                _id: { $ne: article._id },
            });

            if (existingArticle) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "This slug already exists",
                    },
                    {
                        status: 409,
                    }
                );
            }
        }


        article.title = title;
    article.slug = newSlug;
    article.description = description;
    article.content = content;
    article.category = category;
    article.icon = icon || "BookOpen";
    article.status = status || "draft";
    article.isFeatured = Boolean(isFeatured);
    article.isPopular = Boolean(isPopular);

    await article.save();

    // ==============================
    // RESPONSE
    // ==============================

    const updatedArticle = await Article.findById(
        article._id
    )

    return NextResponse.json(
        {
            success: true,
            message: "Article updated successfully",
            data: updatedArticle,
        },
        {
            status: 200,
        }
    );

} catch (error: any) {

    console.error(
        "UPDATE ARTICLE ERROR:",
        error
    );

    return NextResponse.json(
        {
            success: false,
            message: "Failed to update article",
            error: error?.message,
        },
        {
            status: 500,
        }
    );
}
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const article = await Article.findOneAndDelete({
            slug,
        });

        if (!article) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Article not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Article deleted successfully",
            },
            {
                status: 200,
            }
        );

    } catch (error: any) {

        console.error("DELETE ARTICLE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete article",
                error: error?.message,
            },
            {
                status: 500,
            }
        );
    }
}