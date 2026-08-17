import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILocation {
    type: "Point";
    coordinates: number[];
}

export interface IRestaurant extends Document {
    name: string;
    owner: Types.ObjectId;
    slug: string;
    description?: string;
    images?: string[];
    address?: string;
    cuisine: string[];
    priceRange?: number;
    location: ILocation;
    avgRating: number;
    totalReviews: number;
    isOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
    openTime: number;
    closeTime: number;
    offer?: string[];
    priceForTwo?: number;
    estimatedDeliveryTime?: number;
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
            required: true
        },

        description: {
            type: String,
        },

        images: {
            type: [String],
            default: []
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

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        isOpen: {
            type: Boolean,
            default: true,
        },

        openTime: {
            type: Number,
            required: true,
            default: 9
        },

        closeTime: {
            type: Number,
            required: true,
            default: 22
        },

        offer: {
            type: [String],
            default: []
        },

        priceForTwo: {
            type: Number,
            default: 0
        },

        estimatedDeliveryTime: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

restaurantSchema.index({
    location: "2dsphere",
    name: "text",
    cuisine: "text",
});

restaurantSchema.index({
    owner: 1
});

const Restaurant =
    mongoose.models["Restaurant"] ||
    mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;