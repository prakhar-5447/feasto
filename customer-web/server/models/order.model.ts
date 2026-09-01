import mongoose, {
    Document,
    Schema
} from "mongoose";

export interface IOrder extends Document {
    orderId: string;
    customer: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;

    restaurantSnapshot: {
        name: string;
        address: string;
    };

    items: {
        food: mongoose.Types.ObjectId;
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
        method: "upi" | "fakeupi" | "razorpay" | "cod";
        transactionId?: string;
        paidAt?: Date;
    };

    orderStatus:
    | "pending_payment"
    | "placed"
    | "accepted"
    | "preparing"
    | "picked_up"
    | "delivered"
    | "cancelled";

    paymentStatus:
    | "pending"
    | "success"
    | "failed"
    | "refunded";
}

const orderSchema = new Schema<IOrder>(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        restaurant: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
            index: true
        },

        restaurantSnapshot: {
            name: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            }
        },

        items: [
            {
                food: {
                    type: Schema.Types.ObjectId,
                    ref: "Food",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                image: {
                    type: String,
                    default: ""
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },

                total: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        billing: {
            itemTotal: {
                type: Number,
                required: true,
                min: 0
            },

            discount: {
                type: Number,
                default: 0,
                min: 0
            },

            deliveryFee: {
                type: Number,
                default: 0,
                min: 0
            },

            platformFee: {
                type: Number,
                default: 0,
                min: 0
            },

            gst: {
                type: Number,
                default: 0,
                min: 0
            },

            grandTotal: {
                type: Number,
                required: true,
                min: 0
            }
        },

        deliveryAddress: {
            fullAddress: {
                type: String,
                required: true
            },

            lat: {
                type: Number,
                required: true
            },

            lng: {
                type: Number,
                required: true
            }
        },

        payment: {
            method: {
                type: String,
                enum: [
                    "upi",
                    "fakeupi",
                    "razorpay",
                    "cod"
                ],
                required: true
            },

            transactionId: {
                type: String,
                default: null
            },

            paidAt: {
                type: Date,
                default: null
            }
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "success",
                "failed",
                "refunded"
            ],
            default: "pending"
        },

        orderStatus: {
            type: String,
            enum: [
                "pending_payment",
                "placed",
                "accepted",
                "preparing",
                "picked_up",
                "delivered",
                "cancelled"
            ],
            default: "pending_payment"
        }
    },
    {
        timestamps: true
    }
);

orderSchema.index({
    customer: 1,
    createdAt: -1
});

orderSchema.index({
    restaurant: 1,
    createdAt: -1
});

const Order =
    mongoose.models["Order"] ||
    mongoose.model<IOrder>("Order", orderSchema);

export default Order;