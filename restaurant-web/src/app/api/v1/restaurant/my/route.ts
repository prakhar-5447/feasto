import { NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/server/utils/auth.utils';
import * as restaurantService from '@/server/services/restaurant.service';

export async function GET() {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Authentication required',
                },
                { status: 401 },
            );
        }

        if (user.role !== 'restaurant_partner') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Only restaurant partners can access this resource',
                },
                { status: 403 },
            );
        }

        const restaurant =
            await restaurantService.getMyRestaurant(
                user._id.toString(),
            );

        if (!restaurant) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Restaurant not found',
                },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: restaurant,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(
            'Get my restaurant error:',
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: 'Something went wrong',
            },
            { status: 500 },
        );
    }
}