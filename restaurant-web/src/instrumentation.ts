import { connectDB } from '@/server/config/db';

export async function register() {
    await connectDB();
}