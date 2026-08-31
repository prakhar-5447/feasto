import mongoose, {
    Document,
    Schema,
    Types
} from "mongoose";

export interface IFood extends Document {
    restaurant: Types.ObjectId;
    name: string;
    image?: string;
    description?: string;
    price: number;
    cuisine?: string;
    foodType: "VEG" | "NON_VEG" | "EGG";
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
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        cuisine: {
            type: String,
            default: "",
            trim: true
        },

        foodType: {
            type: String,
            enum: [
                "VEG",
                "NON_VEG",
                "EGG"
            ],
            default: "VEG",
            required: true
        },

        preparationTime: {
            type: Number,
            default: 15,
            min: 1
        },

        isAvailable: {
            type: Boolean,
            default: true
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        totalReviews: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

foodSchema.index({
    name: "text",
    cuisine: "text"
});

foodSchema.index({
    restaurant: 1
});

foodSchema.index({
    restaurant: 1,
    isAvailable: 1
});

foodSchema.index({
    restaurant: 1,
    cuisine: 1
});

foodSchema.index({
    restaurant: 1,
    foodType: 1
});

const Food =
    mongoose.models["Food"] ||
    mongoose.model<IFood>(
        "Food",
        foodSchema
    );

export default Food;