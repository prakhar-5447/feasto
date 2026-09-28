import {
    NextResponse,
} from 'next/server';

import {
    getAuthenticatedUser,
} from '@/server/utils/auth.utils';

import {
    getRestaurantProfile,
    updateRestaurantProfile,
} from '@/server/services/restaurant-profile.service';


export async function GET() {

    try {

        const user =
            await getAuthenticatedUser();


        if (
            user.role !==
            'restaurant_partner'
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Restaurant partner access required',
                },
                {
                    status: 403,
                },
            );
        }


        const restaurant =
            await getRestaurantProfile(
                user._id.toString(),
            );


        return NextResponse.json({
            success: true,
            message:
                'Restaurant profile fetched successfully',
            data: restaurant,
        });

    } catch (error) {

        console.error(
            'GET RESTAURANT PROFILE:',
            error,
        );


        const message =
            error instanceof Error
                ? error.message
                : 'Failed to fetch restaurant profile';


        const status =
            message ===
                'Authentication required'
                ? 401
                : message ===
                    'Access token expired or invalid'
                    ? 401
                    : message ===
                        'User not found'
                        ? 401
                        : message ===
                            'User account is inactive'
                            ? 401
                            : message ===
                                'Restaurant not found'
                                ? 404
                                : 500;


        return NextResponse.json(
            {
                success: false,
                message,
            },
            {
                status,
            },
        );
    }
}


export async function PATCH(
    request: Request,
) {

    try {

        const user =
            await getAuthenticatedUser();


        if (
            user.role !==
            'restaurant_partner'
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Restaurant partner access required',
                },
                {
                    status: 403,
                },
            );
        }


        const body =
            await request.json();


        if (
            !body ||
            typeof body !== 'object' ||
            Array.isArray(body)
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Invalid request body',
                },
                {
                    status: 400,
                },
            );
        }


        const restaurant =
            await updateRestaurantProfile(
                user._id.toString(),
                body as Record<
                    string,
                    unknown
                >,
            );


        return NextResponse.json({
            success: true,
            message:
                'Restaurant profile updated successfully',
            data: restaurant,
        });

    } catch (error) {

        console.error(
            'UPDATE RESTAURANT PROFILE:',
            error,
        );


        const message =
            error instanceof Error
                ? error.message
                : 'Failed to update restaurant profile';


        const status =
            message ===
                'Authentication required'
                ? 401
                : message ===
                    'Access token expired or invalid'
                    ? 401
                    : message ===
                        'User not found'
                        ? 401
                        : message ===
                            'User account is inactive'
                            ? 401
                            : message ===
                                'Restaurant not found'
                                ? 404
                                : message.startsWith(
                                    'Invalid',
                                ) ||
                                    message.startsWith(
                                        'Missing',
                                    )
                                    ? 400
                                    : 500;


        return NextResponse.json(
            {
                success: false,
                message,
            },
            {
                status,
            },
        );
    }
}