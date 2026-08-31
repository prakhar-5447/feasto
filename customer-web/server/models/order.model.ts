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
        method: "UPI" | "FAKEUPI" | "RAZORPAY" | "COD";
        transactionId?: string;
        paidAt?: Date;
    };

    orderStatus:
    | "PENDING_PAYMENT"
    | "PLACED"
    | "ACCEPTED"
    | "PREPARING"
    | "PICKED_UP"
    | "DELIVERED"
    | "CANCELLED";

    paymentStatus:
    | "PENDING"
    | "SUCCESS"
    | "FAILED"
    | "REFUNDED";
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
                    "UPI",
                    "FAKEUPI",
                    "RAZORPAY",
                    "COD"
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
                "PENDING",
                "SUCCESS",
                "FAILED",
                "REFUNDED"
            ],
            default: "PENDING"
        },

        orderStatus: {
            type: String,
            enum: [
                "PENDING_PAYMENT",
                "PLACED",
                "ACCEPTED",
                "PREPARING",
                "PICKED_UP",
                "DELIVERED",
                "CANCELLED"
            ],
            default: "PENDING_PAYMENT"
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