import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
            unique: true
        },

        amount: {
            type: Number,
            required: true
        },

        method: {
            type: String,
            enum: [
                'UPI',
                'FAKEUPI',
                'RAZORPAY',
                'COD'
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
                'PENDING',
                'SUCCESS',
                'FAILED'
            ],
            default: 'PENDING'
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

export const Payment =
    mongoose.model(
        'Payment',
        paymentSchema
    );