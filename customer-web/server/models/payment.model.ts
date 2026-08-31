import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
    order: Types.ObjectId;
    amount: number;
    method: "UPI" | "FAKEUPI" | "RAZORPAY" | "COD";
    provider: string;
    transactionId?: string | null;
    status: "PENDING" | "SUCCESS" | "FAILED";
    paidAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        method: {
            type: String,
            enum: [
                "UPI",
                "FAKEUPI",
                "RAZORPAY",
                "COD"
            ],
            required: true
        },

        provider: {
            type: String,
            required: true
        },

        transactionId: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "SUCCESS",
                "FAILED"
            ],
            default: "PENDING"
        },

        paidAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Payment =
    mongoose.models["Payment"] ||
    mongoose.model<IPayment>(
        "Payment",
        paymentSchema
    );

export default Payment;