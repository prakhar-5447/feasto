import mongoose, {
  Document,
  Schema,
  Types
} from "mongoose";

export interface ICartItem {
  food: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  restaurant?: Types.ObjectId;
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
      ref: "Restaurant",
      required: true,
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
          required: true,
          default: 1,
          min: 1
        }
      }
    ],

    couponCode: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Cart =
  mongoose.models["Cart"] ||
  mongoose.model<ICart>("Cart", cartSchema);

export default Cart;