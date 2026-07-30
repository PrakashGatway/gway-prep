import mongoose, { Schema } from "mongoose";

const AnalyticsSchema = new Schema(
  {
    pageSlug: {
      type: String,
      required: true,
    },
    sectionKey: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        option: {
          type: String,
          required: true,
        },
        totalClicks: {
          type: Number,
          default: 50,
        },
      },
    ],
    deviceId: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// This ensures only ONE document per question
AnalyticsSchema.index(
  {
    pageSlug: 1,
    sectionKey: 1,
    question: 1,
  },
  { unique: true }
);

export default mongoose.models.QuestionAnalytics ||
  mongoose.model("QuestionAnalytics", AnalyticsSchema);