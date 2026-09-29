import { NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/server/utils/auth.utils';
import * as restaurantService from '@/server/services/restaurant.service';

export async function PATCH(request: Request) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Authentication required',
                },
                { status: 401 }
            );
        }

        if (user.role !== 'restaurant_partner') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Only restaurant partners can update restaurants',
                },
                { status: 403 }
            );
        }

        const restaurant = await restaurantService.getMyRestaurant(
            user._id.toString()
        );

        if (!restaurant) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Restaurant not found',
                },
                { status: 404 }
            );
        }

        const body = await request.json();

        const updatedRestaurant =
            await restaurantService.updateRestaurant(
                restaurant._id.toString(),
                body
            );

        return NextResponse.json(
            {
                success: true,
                message: 'Restaurant updated successfully',
                data: updatedRestaurant,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update restaurant error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Something went wrong',
            },
            { status: 500 }
        );
    }
}