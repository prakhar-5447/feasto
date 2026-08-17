import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true
        },

        description: String,

        discount: Number,

        discountType: {
            type: String,
            enum: ["flat", "percentage"]
        },

        minOrder: Number,

        maxDiscount: Number,

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Coupon = mongoose.models['Coupon']

export default Coupon;
