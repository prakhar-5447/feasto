import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
    updateRestaurantStatus,
} from '@/features/restaurant/restaurant.server';

const updateStatusSchema = z.object({
    isOpen: z.boolean(),
});

export async function PATCH(
    request: Request
) {
    try {
        const body = await request.json();

        const result =
            updateStatusSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Invalid restaurant status',
                    errors: result.error.flatten(),
                },
                {
                    status: 400,
                }
            );
        }

        const restaurant =
            updateRestaurantStatus(
                result.data.isOpen
            );

        return NextResponse.json({
            success: true,
            data: restaurant,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message:
                    'Invalid request body',
            },
            {
                status: 400,
            }
        );
    }
}