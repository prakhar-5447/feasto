import {
    NextResponse,
} from 'next/server';

import {
    cookies,
} from 'next/headers';

import {
    verifyRefreshToken,
    generateToken,
} from '@/server/utils/token.utils';

import User from '@/server/models/user.model';

import {
    connectDB,
} from '@/server/config/db';


export async function POST() {

    try {

        const cookieStore =
            await cookies();


        const refreshToken =
            cookieStore.get(
                'refreshToken',
            )?.value;


        if (!refreshToken) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Refresh token required',
                },
                {
                    status: 401,
                },
            );
        }


        const decoded =
            verifyRefreshToken(
                refreshToken,
            );


        await connectDB();


        const user =
            await User.findById(
                decoded.userId,
            );


        if (
            !user ||
            !user.isActive
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Invalid user',
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
                        'Invalid account',
                },
                {
                    status: 403,
                },
            );
        }


        const accessToken =
            generateToken(user);


        const response =
            NextResponse.json(
                {
                    success: true,
                },
            );


        response.cookies.set(
            'accessToken',
            accessToken,
            {
                httpOnly: true,

                sameSite: 'lax',

                secure:
                    process.env.NODE_ENV ===
                    'production',

                path: '/',

                maxAge: 15 * 60,
            },
        );


        return response;

    } catch {

        return NextResponse.json(
            {
                success: false,
                message:
                    'Invalid or expired refresh token',
            },
            {
                status: 401,
            },
        );
    }
}