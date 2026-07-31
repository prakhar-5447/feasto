import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  food: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new Schema<ICart>(
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

    items: [cartItemSchema],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart =
  mongoose.models["Cart"] || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;