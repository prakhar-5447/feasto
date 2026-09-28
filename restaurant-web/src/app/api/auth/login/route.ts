import { NextResponse } from 'next/server';

import type {
    LoginRequest,
    LoginResponse,
} from '@/features/auth/auth.types';

const BACKEND_URL =
    process.env.BACKEND_URL;

export async function POST(
    request: Request,
) {
    try {

        if (!BACKEND_URL) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Backend URL is not configured.',
                },
                { status: 500 },
            );
        }


        const body =
            (await request.json()) as LoginRequest;


        const partnerId =
            body.partnerId?.trim();

        const password =
            body.password;


        if (!partnerId || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Partner ID and password are required.',
                },
                { status: 400 },
            );
        }


        const backendResponse =
            await fetch(
                `${BACKEND_URL}/api/v1/auth/restaurant/login`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                    },

                    body: JSON.stringify({
                        partnerId,
                        password,
                    }),

                    cache: 'no-store',
                },
            );


        const data =
            (await backendResponse.json()) as LoginResponse;


        if (!backendResponse.ok) {
            return NextResponse.json(
                data,
                {
                    status:
                        backendResponse.status,
                },
            );
        }


        return NextResponse.json(
            data,
            {
                status: backendResponse.status,
            },
        );

    } catch (error) {

        console.error(
            'Restaurant login error:',
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    'Unable to connect to the backend.',
            },
            { status: 500 },
        );
    }
}