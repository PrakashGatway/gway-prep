import mongoose, { Schema, type Document, type Model } from "mongoose";

export type BannerAction = "contact-page" | "popup-form" | "route" | "none";
export type BannerDirection = "center" | "bottom-right" | "both";

export interface IBanner extends Document {
  image: string;
  slug: string;
  action: BannerAction;
  direction: BannerDirection;
  route: string;
  closeButton: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    image: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    action: {
      type: String,
      enum: ["contact-page", "popup-form", "route", "none"],
      default: "none",
    },
    direction: {
      type: String,
      enum: ["center", "bottom-right", "both"],
      default: "bottom-right",
    },
    route: { type: String, default: "", trim: true },
    closeButton: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

const cachedBannerModel = mongoose.models.Banner as Model<IBanner> | undefined;
if (cachedBannerModel && !cachedBannerModel.schema.path("direction")) {
  mongoose.deleteModel("Banner");
}

export const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;
