import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

let cached = globalThis as typeof globalThis & {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
};

if (!cached.mongoose) {
    cached.mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    if (cached.mongoose!.conn) {
        return cached.mongoose!.conn;
    }

    if (!MONGO_URI) {
        throw new Error("Undefined Database Url");
    }

    if (!cached.mongoose!.promise) {
        cached.mongoose!.promise =
            mongoose.connect(MONGO_URI);
    }

    cached.mongoose!.conn =
        await cached.mongoose!.promise;

    return cached.mongoose!.conn;
}