import mongoose, {
    Schema,
    Document,
    Types
} from "mongoose";


export interface ILocation {
    type: "point";
    coordinates: number[];
}

export interface IRestaurant extends Document {
    name: string;
    owner: Types.ObjectId;
    slug: string;

    description?: string;
    images?: string[];

    tagline?: string;
    phone?: string;
    altPhone?: string;
    email?: string;
    website?: string;
    instagram?: string;
    facebook?: string;

    address?: string;
    area?: string;
    city?: string;
    state?: string;
    pincode?: string;

    cuisine: string[];
    priceRange?: number;

    minOrder?: number;
    avgCookTime?: number;

    location: ILocation;

    avgRating: number;
    totalReviews: number;

    isOpen: boolean;
    isVeg: boolean;

    openTime: number;
    closeTime: number;

    fssai?: string;
    gstin?: string;

    offer?: string;
    priceForTwo?: number;
    estimatedDeliveryTime?: number;

    createdAt: Date;
    updatedAt: Date;
}


const restaurantSchema = new Schema<IRestaurant>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        tagline: {
            type: String,
            default: "",
            trim: true
        },

        description: {
            type: String,
            default: ""
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

        images: {
            type: [String],
            default: []
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        altPhone: {
            type: String,
            default: "",
            trim: true
        },

        email: {
            type: String,
            default: "",
            trim: true,
            lowercase: true
        },

        website: {
            type: String,
            default: "",
            trim: true
        },

        instagram: {
            type: String,
            default: "",
            trim: true
        },

        facebook: {
            type: String,
            default: "",
            trim: true
        },

        address: {
            type: String,
            default: ""
        },

        area: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        pincode: {
            type: String,
            default: ""
        },

        location: {
            type: {
                type: String,
                enum: ["point"],
                default: "point",
                required: true
            },

            coordinates: {
                type: [Number],
                required: true
            }
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

        minOrder: {
            type: Number,
            default: 0,
            min: 0
        },

        avgCookTime: {
            type: Number,
            default: 0,
            min: 0
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

        isVeg: {
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

        fssai: {
            type: String,
            default: "",
            trim: true
        },

        gstin: {
            type: String,
            default: "",
            trim: true,
            uppercase: true
        },

        offer: {
            type: String,
            default: ""
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