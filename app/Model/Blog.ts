import mongoose, {Schema,Document,Model} from "mongoose";

export interface IBlog extends Document {
    name : string;
    slug : string;
    createdAt : Date;
}


const BlogCategorySchema = new Schema<IBlog>(
    {
        name : {type: String, required: true},
        slug: {type : String , required : true}
    },
    { timestamps: true }
)

const BlogCategory: Model<IBlog> = mongoose.models.BlogCategory ?? mongoose.model<IBlog>("BlogCategory",BlogCategorySchema);

export default BlogCategory;
