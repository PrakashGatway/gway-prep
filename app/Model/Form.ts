import mongoose, { Schema, Document, Model } from "mongoose";

export interface IForm extends Document {
  path: string;
  
  data: Record<string, any>;
}

const FormSchema = new Schema<IForm>(
  {
    path: { type: String, required: true },
    data: { type: Schema.Types.Mixed, default: {} } // Default to empty object
  },
  { timestamps: true }
);


const FormDetails: Model<IForm> = 
  mongoose.models.FormDetails || mongoose.model<IForm>("FormDetails", FormSchema);

export default FormDetails;



