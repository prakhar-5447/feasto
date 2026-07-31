import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "customer" | "restaurant_partner";

export interface IUser extends Document {
    name?: string;
    role: UserRole;
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
            maxlength: 50,
        },

        role: {
            type: String,
            enum: ["customer", "restaurant_partner"],
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: [/^\d{10}$/, "Phone must be exactly 10 digits"],
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            sparse: true,
            validate: {
                validator: function (v: string) {
                    if (!v) return true; // allow empty
                    return /^\S+@\S+\.\S+$/.test(v);
                },
                message: "Invalid email",
            },
        },

        avatar: {
            type: String,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User =
    mongoose.models["User"] || mongoose.model<IUser>("User", userSchema);

export default User;