import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
    name: string;
    course: string;
    score?: string;
    image?: string;
    university: string;
    universityLogo?: string;
    about: Record<string, any>;
    outcome: Record<string, any>;
    type: 'image' | 'video';
    message?: string;
    messageDate?: string;
    video?: string;
    rating?: string;
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
    {
        name: { type: String, required: true, trim: true, maxlength: 40 },
        course: { type: String, required: true, trim: true }, // Removed unique: true
        score: String,
        image: String,
        university: { type: String, required: true, trim: true },
        universityLogo: String,
        about: { type: Schema.Types.Mixed, default: {} },
        outcome: { type: Schema.Types.Mixed, default: {} },
        type: { type: String, enum: ['image', 'video'], default: "image" },
        message: String,
        messageDate: String,
        video : String,
        rating: { type: String } // Added validation
    },
    { timestamps: true }
);


const Student:Model<IStudent> = mongoose.models.Student ||
 mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
