import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        description: {
            type: String,
            trim: true
        },

        discount: {
            type: Number,
            required: true,
            min: 0
        },

        discountType: {
            type: String,
            required: true,
            enum: ["flat", "percentage"]
        },

        minOrder: {
            type: Number,
            default: 0,
            min: 0
        },

        maxDiscount: {
            type: Number,
            min: 0
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Coupon =
    mongoose.models["Coupon"] ||
    mongoose.model("Coupon", couponSchema);

export default Coupon;