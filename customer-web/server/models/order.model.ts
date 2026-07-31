import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
    food: Types.ObjectId;
    quantity: number;
    price: number;
}

export type OrderStatus =
    | "PLACED"
    | "ACCEPTED"
    | "PREPARING"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export interface IOrder extends Document {
    user: Types.ObjectId;
    restaurant: Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },

        items: [orderItemSchema],

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "PLACED",
                "ACCEPTED",
                "PREPARING",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED",
            ],
            default: "PLACED",
        },
    },
    { timestamps: true }
);

const Order =
    mongoose.models["Order"] || mongoose.model<IOrder>("Order", orderSchema);

export default Order;