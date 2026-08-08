import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFood extends Document {
    restaurant: Types.ObjectId;
    name: string;
    image?: string;
    description?: string;
    price: number;
    cuisine?: string;
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

        cuisine: {
            type: String,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

foodSchema.index({
    name: "text"
});

foodSchema.index({
    restaurant: 1
});

foodSchema.index({
    restaurant: 1,
    isAvailable: 1
});

const Food =
    mongoose.models["Food"] || mongoose.model<IFood>("Food", foodSchema);

export default Food;