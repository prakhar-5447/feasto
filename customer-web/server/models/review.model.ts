import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview extends Document {
    user: Types.ObjectId;
    restaurant: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },

        comment: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Review =
    mongoose.models["Review"] || mongoose.model<IReview>("Review", reviewSchema);

export default Review;