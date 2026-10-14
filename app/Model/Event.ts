import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
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

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

const EventSeedSchema = new Schema({
  key: { type: String, required: true, unique: true },
  seededAt: { type: Date, default: Date.now },
});

export const EventSeed = mongoose.models.EventSeed || mongoose.model("EventSeed", EventSeedSchema);

export default Event;
