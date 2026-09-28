import mongoose, {
    Schema,
    Document,
    Types
} from "mongoose";

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
            required: true
        },

        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index({
    restaurant: 1,
    createdAt: -1
});

const Review =
    mongoose.models["Review"] ||
    mongoose.model<IReview>(
        "Review",
        reviewSchema
    );

export default Review;