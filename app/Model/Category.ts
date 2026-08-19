import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const CategoryDetail =
    mongoose.models.CategoryDetail ||
    mongoose.model("CategoryDetail", CategorySchema);

export default CategoryDetail;