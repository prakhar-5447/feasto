import { NextRequest, NextResponse } from "next/server";

import * as authService from "@/server/services/auth.service";

import {
    generateOtp,
    saveOtp,
} from "@/server/services/otp.service";

export async function POST(
    request: NextRequest
) {
    try {
        const { phone } = await request.json();

        if (
            !phone ||
            typeof phone !== "string" ||
            !/^\d{10}$/.test(phone)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Phone must be exactly 10 digits",
                },
                { status: 400 }
            );
        }

        const { user } =
            await authService.phoneAuth(phone);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Restaurant account not found",
                },
                { status: 404 }
            );
        }

        if (user.role !== "restaurant_partner") {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Only restaurant partners can login here",
                },
                { status: 403 }
            );
        }

        const otp = generateOtp();

        saveOtp(phone, otp);

        return NextResponse.json(
            {
                success: true,
                message: "OTP sent successfully",
                data: {
                    otp, // development only
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Restaurant phone auth error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}