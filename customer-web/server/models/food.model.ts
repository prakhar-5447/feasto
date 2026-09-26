import mongoose, {
    Document,
    Schema,
    Types,
} from "mongoose";

export type FoodType =
    | "veg"
    | "non_veg"
    | "egg";

export type SpiceLevel =
    | "mild"
    | "medium"
    | "hot";

export interface IFood extends Document {
    restaurant: Types.ObjectId;

    name: string;
    image: string;
    description: string;

    category: string;
    cuisine: string;

    price: number;

    foodType: FoodType;
    isVegan: boolean;
    isHalal: boolean;

    spiceLevel: SpiceLevel;
    preparationTime: number;

    isAvailable: boolean;
    isFeatured: boolean;

    rating: number;
    totalReviews: number;
}

const foodSchema = new Schema<IFood>(
    {
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        cuisine: {
            type: String,
            default: "",
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        foodType: {
            type: String,
            enum: [
                "veg",
                "non_veg",
                "egg",
            ],
            default: "veg",
            required: true,
        },

        isVegan: {
            type: Boolean,
            default: false,
            index: true,
        },

        isHalal: {
            type: Boolean,
            default: false,
            index: true,
        },

        spiceLevel: {
            type: String,
            enum: [
                "mild",
                "medium",
                "hot",
            ],
            default: "mild",
        },

        preparationTime: {
            type: Number,
            default: 15,
            min: 1,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        totalReviews: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

foodSchema.index({
    name: "text",
    cuisine: "text",
    category: "text",
});

foodSchema.index({
    restaurant: 1,
});

foodSchema.index({
    restaurant: 1,
    isAvailable: 1,
});

foodSchema.index({
    restaurant: 1,
    category: 1,
});

foodSchema.index({
    restaurant: 1,
    cuisine: 1,
});

foodSchema.index({
    restaurant: 1,
    foodType: 1,
});

const Food =
    mongoose.models["Food"] ||
    mongoose.model<IFood>(
        "Food",
        foodSchema
    );

export default Food;