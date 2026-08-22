import mongoose, {
    Schema,
    Document
} from "mongoose";

export interface IOrder
    extends Document {

    orderId: string;

    customer: mongoose.Types.ObjectId;

    restaurant:
    mongoose.Types.ObjectId;

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
        method: string;
        transactionId?: string;
        paidAt: Date
    };

    orderStatus: string;
    paymentStatus: string;
}

const orderSchema =
    new Schema<IOrder>(
        {
            orderId: String,

            customer: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            restaurant: {
                type: Schema.Types.ObjectId,
                ref: "Restaurant"
            },

            restaurantSnapshot: {
                name: String,
                address: String
            },

            items: [
                {
                    food: {
                        type: Schema.Types.ObjectId,
                        ref: "Food"
                    },

                    name: String,
                    image: String,
                    price: Number,
                    quantity: Number,
                    total: Number
                }
            ],

            billing: {
                itemTotal: Number,
                discount: Number,
                deliveryFee: Number,
                platformFee: Number,
                gst: Number,
                grandTotal: Number
            },

            deliveryAddress: {
                fullAddress: String,
                lat: Number,
                lng: Number
            },

            payment: {
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
                    'pending',
                    'paid',
                    'failed',
                    'refunded'
                ],
                default: 'pending'
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
                default:
                    "pending_payment"
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model(
    "Order",
    orderSchema
);