import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILocation {
    type: "Point";
    coordinates: number[];
}

export interface IRestaurant extends Document {
    name: string;
    owner?: Types.ObjectId;
    description?: string;
    address?: string;
    cuisine: string[];
    priceRange?: number;
    location: ILocation;
    avgRating: number;
    totalReviews: number;
    isOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
    {
        name: {
            type: String,
            required: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        description: {
            type: String,
        },

        address: {
            type: String,
        },

        cuisine: [String],

        priceRange: {
            type: Number,
            min: 1,
            max: 5,
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },

            coordinates: {
                type: [Number],
                required: true,
            },
        },

        avgRating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

restaurantSchema.index({
    location: "2dsphere",
    name: "text",
    cuisine: "text",
});

const Restaurant =
    mongoose.models["Restaurant"] ||
    mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;