import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  name?: string;
  email?: string;
  comment: string;
  page: string;
  publish: boolean;
  status: boolean;
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

    // publish: {
    //   type: Boolean,
    //   required: true,
    //   default: true,
    // },

    status : {
        type : Boolean,
        default : true
    }

  },
  {
    timestamps: true,
  }
);

const Comments: Model<IComment> =
  mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);

export default Comments;