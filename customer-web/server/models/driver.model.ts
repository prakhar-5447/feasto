import mongoose, {
    Schema,
    Document
} from "mongoose";

export type DriverStatus =
    | "pending"
    | "active"
    | "suspended";

export type DriverAvailability =
    | "offline"
    | "online"
    | "on_break";

export interface IDriver extends Document {
    userId: mongoose.Types.ObjectId;

    vehicleType:
    | "bike"
    | "scooter"
    | "car"
    | "bicycle";

    vehicleNumber: string;
    licenseNumber: string;

    // Account / verification status
    status: DriverStatus;

    // Current working availability
    availability: DriverAvailability;

    isVerified: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const driverSchema = new Schema<IDriver>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },

        vehicleType: {
            type: String,
            enum: [
                "bike",
                "scooter",
                "car",
                "bicycle"
            ],
            required: true
        },

        vehicleNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },

        licenseNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },

        // Driver account status
        status: {
            type: String,
            enum: [
                "pending",
                "active",
                "suspended"
            ],
            default: "pending"
        },

        // Rider's current availability
        availability: {
            type: String,
            enum: [
                "offline",
                "online",
                "on_break"
            ],
            default: "offline"
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Driver =
    mongoose.models["Driver"] ||
    mongoose.model<IDriver>(
        "Driver",
        driverSchema
    );

export default Driver;