import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  subtitle: string;
  slug : string;
  shortBio: string;
  details: string;
  education: string;
  experience: string;
  image: string;
  linkedin: string;
  website: string;
  isActive: boolean;
  specializations: string[];
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    slug : {type: String, trim: true},
    shortBio: { type: String, trim: true },
    details: { type: String, required: true, trim: true },
    education: { type: String, trim: true },
    experience: { type: String, trim: true },
    image: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    website: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    specializations: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

 const Author: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);


  export default Author;
