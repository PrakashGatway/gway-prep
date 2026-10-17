import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  category: string;
  eventType: string;
  mode: "Online" | "In person" | "Hybrid";
  startDate: Date;
  endDate?: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  location: string;
  registrationUrl: string;
  capacity: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    heroEyebrow: { type: String, default: "", trim: true },
    heroTitle: { type: String, default: "", trim: true },
    heroSubtitle: { type: String, default: "", trim: true },
    heroImage: { type: String, default: "" },
    heroImageAlt: { type: String, default: "", trim: true },
    heroImageCaption: { type: String, default: "", trim: true },
    heroPrimaryButtonText: { type: String, default: "", trim: true },
    heroSecondaryButtonText: { type: String, default: "", trim: true },
    category: { type: String, required: true, trim: true, index: true },
    eventType: { type: String, required: true, trim: true, index: true },
    mode: { type: String, enum: ["Online", "In person", "Hybrid"], default: "Online", index: true },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
    timezone: { type: String, default: "Asia/Kolkata" },
    location: { type: String, default: "" },
    registrationUrl: { type: String, default: "" },
    capacity: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

const eventHeroFields = [
  "heroEyebrow",
  "heroTitle",
  "heroSubtitle",
  "heroImage",
  "heroImageAlt",
  "heroImageCaption",
  "heroPrimaryButtonText",
  "heroSecondaryButtonText",
] as const;

const cachedEventModel = mongoose.models.Event as Model<IEvent> | undefined;
if (
  cachedEventModel &&
  eventHeroFields.some((field) => !cachedEventModel.schema.path(field))
) {
  mongoose.deleteModel("Event");
}

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

const EventSeedSchema = new Schema({
  key: { type: String, required: true, unique: true },
  seededAt: { type: Date, default: Date.now },
});

export const EventSeed = mongoose.models.EventSeed || mongoose.model("EventSeed", EventSeedSchema);

export default Event;
