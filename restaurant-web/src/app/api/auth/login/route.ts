import { NextResponse } from 'next/server';
import type { LoginRequest } from '@/features/auth/auth.types';

const DEMO_ID = 'FEA-MH-00142';
const DEMO_PASS = 'partner@123';

export async function POST(request: Request) {
    try {
        const body =
            (await request.json()) as LoginRequest;

        const partnerId = body.partnerId?.trim();
        const password = body.password;

        if (!partnerId || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Partner ID and password are required.',
                },
                { status: 400 },
            );
        }

        if (
            partnerId.toUpperCase() !== DEMO_ID ||
            password !== DEMO_PASS
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Invalid Partner ID or password. Check your credentials and try again.',
                },
                { status: 401 },
            );
        }

        console.log('Restaurant partner authenticated:', partnerId);

        return NextResponse.json({
            success: true,
            message: 'Login successful',
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: 'Invalid request.',
            },
            { status: 400 },
        );
    }
}