import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  name?: string;
  email?: string;
  phone?: Number;
  comment?: string;
  refrenceSlug?: String;
  page: string;
  publish: boolean;
  status: "approved" | "pending" | "rejected";
  Score: String;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: Number,
      required: false,
    },
    refrenceSlug: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    page: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    publish: {
      type: Boolean,
      required: true,
      default: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "rejected"],
    },

    Score: String,
  },
  {
    timestamps: true,
  },
);

const Comments: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comments;
