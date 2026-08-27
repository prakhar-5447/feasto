import mongoose, {
    Schema,
    Document,
    Types
} from "mongoose";

export interface ILocation {
    type: "POINT";
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
            trim: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        images: {
            type: [String],
            default: []
        },

        address: {
            type: String,
            default: ""
        },

        cuisine: {
            type: [String],
            default: []
        },

        priceRange: {
            type: Number,
            min: 1,
            max: 5
        },

        location: {
            type: {
                type: String,
                enum: ["POINT"],
                default: "POINT",
                required: true
            },

            coordinates: {
                type: [Number],
                required: true
            }
        },

        avgRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        totalReviews: {
            type: Number,
            default: 0,
            min: 0
        },

        isOpen: {
            type: Boolean,
            default: true
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
            default: 0,
            min: 0
        },

        estimatedDeliveryTime: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

restaurantSchema.index({
    location: "2dsphere",
    name: "text",
    cuisine: "text"
});

restaurantSchema.index({
    owner: 1
});

const Restaurant =
    mongoose.models["Restaurant"] ||
    mongoose.model<IRestaurant>(
        "Restaurant",
        restaurantSchema
    );

export default Restaurant;