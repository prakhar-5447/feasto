import mongoose, {
    Schema,
    Document
} from "mongoose";

export interface IUser extends Document {
    name?: string;
    role: "CUSTOMER" | "RESTAURANT_PARTNER";
    phone: string;
    email?: string;
    avatar?: string | null;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        role: {
            type: String,
            enum: [
                "CUSTOMER",
                "RESTAURANT_PARTNER"
            ],
            default: "CUSTOMER",
            required: true
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: [
                /^\d{10}$/,
                "Phone must be exactly 10 digits"
            ]
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            sparse: true,
            validate: {
                validator: (value: string) => {
                    if (!value) {
                        return true;
                    }

                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Invalid email"
            }
        },

        avatar: {
            type: String,
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User =
    mongoose.models["User"] ||
    mongoose.model<IUser>(
        "User",
        userSchema
    );

export default User;