import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFood extends Document {
    restaurant: Types.ObjectId;
    name: string;
    image?: string;
    description?: string;
    price: number;
    category?: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const foodSchema = new Schema<IFood>(
    {
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Food =
    mongoose.models["Food"] || mongoose.model<IFood>("Food", foodSchema);

export default Food;