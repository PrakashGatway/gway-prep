import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticle extends Document {
    title: string;
    slug: string;
    description: string;
    content: string;

    category: string

    icon?: string;

    status: "draft" | "published";

    isFeatured: boolean;
    isPopular: boolean;

    views: number;

    order: number;

    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            ref: "CategoryDetail",
            default: null
        },
        icon: {
            type: String,
            default: "BookOpen",
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isPopular: {
            type: Boolean,
            default: false,
        },

        views: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

const Article: Model<IArticle> =
    mongoose.models.Article ||
    mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;