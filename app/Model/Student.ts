import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
    name: string;
    slug?: string;
    title?: string;
    subtitle?: string;
    heroImage?: string;
    button1Text?: string;
    button1Url?: string;
    button2Text?: string;
    button2Url?: string;
    course: string;
    colorCode?: string;
    score?: string;
    image?: string;
    university?: string;
    universityLogo?: string;
    about?: Record<string, any>;
    outcome?: Record<string, any>;
    type?: 'image' | 'video';
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
        slug: { type: String, trim: true, lowercase: true, maxlength: 100 },
        title: { type: String, trim: true },
        subtitle: { type: String, trim: true },
        heroImage: String,
        button1Text: { type: String, trim: true },
        button1Url: { type: String, trim: true },
        button2Text: { type: String, trim: true },
        button2Url: { type: String, trim: true },
        course: { type: String, required: true, trim: true }, 
        colorCode: String,
        score: String,
        image: String,
        university: { type: String},
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


const cachedStudentModel = mongoose.models.Student as Model<IStudent> | undefined;

// Next.js can keep the old Mongoose model around after a schema edit in development.
const requiredStudentPaths = [
    "slug",
    "title",
    "subtitle",
    "heroImage",
    "button1Text",
    "button1Url",
    "button2Text",
    "button2Url",
    "colorCode",
];

if (
    cachedStudentModel &&
    requiredStudentPaths.some((path) => !cachedStudentModel.schema.path(path))
) {
    mongoose.deleteModel("Student");
}

const Student: Model<IStudent> = mongoose.models.Student ||
    mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
