import mongoose, { Schema, Document, Model } from "mongoose";

export interface IForm extends Document {
  name: string;
  email: string;
  phoneNo: string;
  city: string;
  schoolName: string;
  Grade: string;
  other: Record<string, any>;
}

const FormSchema = new Schema<IForm>(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, trim: true, lowercase: true }, 
    phoneNo: { type: String },
    city: { type: String, trim: true },
    schoolName: { type: String, default: "" },
    Grade: { type: String },
    other: { type: Schema.Types.Mixed, default: {} } // Default to empty object
  },
  { timestamps: true }
);


const FormDetails: Model<IForm> = 
  mongoose.models.FormDetails || mongoose.model<IForm>("FormDetails", FormSchema);

export default FormDetails;



