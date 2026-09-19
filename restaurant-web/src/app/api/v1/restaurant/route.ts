import { NextResponse } from 'next/server';
import {
    getRestaurant,
} from '@/features/restaurant/restaurant.server';

export async function GET() {
    const restaurant = getRestaurant();

    return NextResponse.json({
        success: true,
        data: restaurant,
    });
}