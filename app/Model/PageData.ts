import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageData extends Document {
  name: string;
  slug: string;
  description: string;
  published: boolean;
  seoMeta: Record<string, any>;
  sections: Record<string, any>;
  extraDetails: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PageDataSchema = new Schema<IPageData>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    slug: {
      type : String,
      required: true,
      unique: true, 
    },
    description: {
      type: String,
      default: "",
    },
    published : {
      type: Boolean,
      default: true,
    },
    seoMeta: {
      type: Schema.Types.Mixed,
      default: {},
    },
    sections: {
      type: Schema.Types.Mixed,
      default: {},
    },
    extraDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,   // auto createdAt + updatedAt
    minimize: false,    // keep empty objects {} in Mixed fields
  }
);

// Prevent model re-registration during Next.js hot reload
const PageData: Model<IPageData> =
  mongoose.models.PageData ||
  mongoose.model<IPageData>("PageData", PageDataSchema);

export default PageData;