import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  food: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  items: ICartItem[];
  couponCode?: string;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    },

    items: [
      {
        food: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true
        },

        quantity: {
          type: Number,
          default: 1
        }
      }
    ],

    couponCode: String
  },
  { timestamps: true }
);


const Cart =
  mongoose.models['Cart'] ||
  mongoose.model<ICart>(
    "Cart",
    cartSchema
  );

export default Cart;
