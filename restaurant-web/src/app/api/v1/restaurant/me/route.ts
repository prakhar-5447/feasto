import {
    NextResponse,
} from 'next/server';

import {
    getAuthenticatedUser,
} from '@/server/utils/auth.utils';


export async function GET() {

    try {

        const user =
            await getAuthenticatedUser();


        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Authentication required',
                },
                {
                    status: 401,
                },
            );
        }


        if (
            user.role !==
            'restaurant_partner'
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Only restaurant partners can access this resource',
                },
                {
                    status: 403,
                },
            );
        }


        return NextResponse.json(
            {
                success: true,

                data: {
                    user: {
                        id: user._id.toString(),
                        phone: user.phone,
                        name: user.name,
                        role: user.role,
                    },
                },
            },
        );

    } catch (error) {

        console.error(
            'Restaurant me error:',
            error,
        );


        return NextResponse.json(
            {
                success: false,
                message:
                    'Something went wrong',
            },
            {
                status: 500,
            },
        );
    }
}