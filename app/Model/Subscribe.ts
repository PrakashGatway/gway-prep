import mongoose, {Schema, Document, Model} from "mongoose";

export interface ISubscribe extends Document {
    email : string;
    opt : boolean;
    createdAt : Date;
    updatedAt : Date;
}

const subscriberSchema = new Schema<ISubscribe>({
    email : {type :String, required : true, trim : true, unique : true},
    opt : {type : Boolean, default : true}
}, {timestamps : true});

const Subscribe: Model<ISubscribe> = mongoose.models.Subscribe ||
    mongoose.model<ISubscribe>("Subscribe", subscriberSchema);

export default Subscribe;