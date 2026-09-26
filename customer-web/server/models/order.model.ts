import mongoose, { Document, Schema } from "mongoose";

export type OrderStatus =
    | "pending_payment"
    | "placed"
    | "accepted"
    | "preparing"
    | "ready"
    | "driver_assigned"
    | "picked_up"
    | "delivered"
    | "cancelled"
    | "cancelled_returning"
    | "return_received"
    | "refund_processing"
    | "refunded";

export type PaymentStatus =
    | "pending"
    | "success"
    | "failed"
    | "refunding"
    | "refunded";

export type PaymentMethod =
    | "upi"
    | "fakeupi"
    | "razorpay"
    | "cod";

export interface IOrder extends Document {
    orderId: string;

    customer: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;

    restaurantSnapshot: {
        name: string;
        address: string;
    };

    items: {
        food?: mongoose.Types.ObjectId;
        name: string;
        image: string;
        price: number;
        quantity: number;
        total: number;
    }[];

    billing: {
        itemTotal: number;
        discount: number;
        deliveryFee: number;
        platformFee: number;
        gst: number;
        grandTotal: number;
    };

    deliveryAddress: {
        fullAddress: string;
        lat: number;
        lng: number;
    };

    payment: {
        method: PaymentMethod;
        transactionId?: string;
        paidAt?: Date;
    };

    orderStatus: OrderStatus;

    paymentStatus: PaymentStatus;

    driver?: mongoose.Types.ObjectId | null;

    driverSnapshot?: {
        name: string;
        phone: string;
    } | null;

    cancelledFrom?: OrderStatus;

    cancelledBy?: "customer" | "restaurant";

    cancelledAt?: Date;

    cancellationReason?: string;

    pickedUpAt?: Date;

    deliveredAt?: Date;

    refundedAt?: Date;

    refundTransactionId?: string;
}

const orderItemSchema = new Schema(
    {
        food: {
            type: Schema.Types.ObjectId,
            ref: "Food",
            required: false,
        },

        // Snapshot
        name: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        total: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
            index: true,
        },

        restaurantSnapshot: {
            name: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },
        },

        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (items: unknown[]) => items.length > 0,
                message: "Order must contain at least one item",
            },
        },

        billing: {
            itemTotal: {
                type: Number,
                required: true,
                min: 0,
            },

            discount: {
                type: Number,
                required: true,
                min: 0,
            },

            deliveryFee: {
                type: Number,
                required: true,
                min: 0,
            },

            platformFee: {
                type: Number,
                required: true,
                min: 0,
            },

            gst: {
                type: Number,
                required: true,
                min: 0,
            },

            grandTotal: {
                type: Number,
                required: true,
                min: 0,
            },
        },

        deliveryAddress: {
            fullAddress: {
                type: String,
                required: true,
            },

            lat: {
                type: Number,
                required: true,
            },

            lng: {
                type: Number,
                required: true,
            },
        },

        payment: {
            method: {
                type: String,
                enum: ["upi", "fakeupi", "razorpay", "cod"],
                required: true,
            },

            transactionId: {
                type: String,
            },

            paidAt: {
                type: Date,
            },
        },

        orderStatus: {
            type: String,
            enum: [
                "pending_payment",
                "placed",
                "accepted",
                "preparing",
                "ready",
                "driver_assigned",
                "picked_up",
                "delivered",
                "cancelled",
                "cancelled_returning",
                "return_received",
                "refund_processing",
                "refunded",
            ],
            default: "pending_payment",
            index: true,
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "success",
                "failed",
                "refunding",
                "refunded",
            ],
            default: "pending",
        },

        driver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        driverSnapshot: {
            name: {
                type: String,
            },

            phone: {
                type: String,
            },
        },

        cancelledFrom: {
            type: String,
            enum: [
                "pending_payment",
                "placed",
                "accepted",
                "preparing",
                "ready",
                "driver_assigned",
                "picked_up",
                "delivered",
                "cancelled",
                "cancelled_returning",
                "return_received",
                "refund_processing",
                "refunded",
            ],
        },

        cancelledBy: {
            type: String,
            enum: ["customer", "restaurant"],
        },

        cancelledAt: {
            type: Date,
        },

        cancellationReason: {
            type: String,
        },

        pickedUpAt: {
            type: Date,
        },

        deliveredAt: {
            type: Date,
        },

        refundedAt: {
            type: Date,
        },

        refundTransactionId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.index({
    customer: 1,
    createdAt: -1,
});

orderSchema.index({
    restaurant: 1,
    createdAt: -1,
});

orderSchema.index({
    restaurant: 1,
    orderStatus: 1,
    createdAt: -1,
});

const Order =
    mongoose.models["Order"] ||
    mongoose.model<IOrder>("Order", orderSchema);

export default Order;