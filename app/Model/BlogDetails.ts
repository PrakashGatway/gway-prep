import mongoose, { Schema, Document } from "mongoose";

// Comment Interface
interface IComment {
  name: string;
  // email: string;
  message: string;
  createdAt?: Date;
}

// Blog Interface
export interface IBlogDetail extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image: string;
  category: string;
  count ?: string;
  tags: string[];
  author: string;
  authslug : string;
  publishedDate: Date;
  comments: IComment[];
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

const CommentSchema = new Schema<IComment>(
  {
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const BlogSchema = new Schema<IBlogDetail>(
  {
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    content: { type: String, required: true },

    excerpt: { type: String, trim: true },

    image: {
      type: String,
      default: "/image/Blogdetaile-img.jpg",
    },

    count : {
      type: String, default : 1000 
    },

    category: { type: String, required: true, trim: true },

    tags: {
      type: [String],
      default: [],
    },

    author: {
      type: String,
      default: "Admin",
      trim: true,
    },
    authslug: String,

    publishedDate: {
      type: Date,
      default: Date.now,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    comments: {
      type: [CommentSchema],
      default: [],
    },

    // SEO
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.BlogDetail ||
  mongoose.model<IBlogDetail>("BlogDetail", BlogSchema);