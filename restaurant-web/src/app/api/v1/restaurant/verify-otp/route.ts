import {
    NextRequest,
    NextResponse,
} from "next/server";

import * as authService
    from "@/server/services/auth.service";

import {
    getOtp,
    deleteOtp,
} from "@/server/services/otp.service";

import {
    generateToken,
    generateRefreshToken,
} from "@/server/utils/token.utils";


const accessTokenCookieOptions = {
    httpOnly: true,

    sameSite: "lax" as const,

    secure:
        process.env.NODE_ENV ===
        "production",

    path: "/",

    maxAge: 15 * 60,
};


const refreshTokenCookieOptions = {
    httpOnly: true,

    sameSite: "lax" as const,

    secure:
        process.env.NODE_ENV ===
        "production",

    path: "/api/v1/auth",

    maxAge: 7 * 24 * 60 * 60,
};


export async function POST(
    req: NextRequest,
) {

    try {

        const {
            phone,
            otp,
        } = await req.json();


        if (
            !phone ||
            !otp
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Phone and OTP are required",
                },
                { status: 400 },
            );
        }


        /*
         * Get OTP from shared
         * OTP service.
         */

        const record =
            getOtp(phone);


        if (!record) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "OTP not found or expired",
                },
                { status: 400 },
            );
        }


        /*
         * Check expiry.
         */

        if (
            record.expiresAt <
            Date.now()
        ) {

            deleteOtp(phone);


            return NextResponse.json(
                {
                    success: false,
                    message:
                        "OTP expired",
                },
                { status: 400 },
            );
        }


        /*
         * Check OTP.
         */

        if (
            record.otp !==
            otp
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid OTP",
                },
                { status: 400 },
            );
        }


        /*
         * OTP can only be
         * used once.
         */

        deleteOtp(phone);


        /*
         * Find user.
         */

        const { user } =
            await authService.phoneAuth(
                phone,
            );


        /*
         * User doesn't exist.
         *
         * Currently your phone-auth
         * route already returns 404 for
         * non-existing restaurant users,
         * so this is mostly defensive.
         */

        if (!user) {

            return NextResponse.json(
                {
                    success: true,
                    message:
                        "OTP verified",

                    data: {
                        isNewUser: true,
                    },
                },
                { status: 200 },
            );
        }


        /*
         * Make sure this is a
         * restaurant partner.
         */

        if (
            user.role !==
            "restaurant_partner"
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Only restaurant partners can login here",
                },
                { status: 403 },
            );
        }


        /*
         * Generate JWTs.
         */

        const accessToken =
            generateToken(user);


        const refreshToken =
            generateRefreshToken(user);


        /*
         * Create response.
         */

        const response =
            NextResponse.json(
                {
                    success: true,

                    message:
                        "Login successful",

                    data: {
                        user: {
                            id: user._id.toString(),
                            phone: user.phone,
                            name: user.name,
                            role: user.role,
                        },

                        isNewUser: false,
                    },
                },

                { status: 200 },
            );


        /*
         * Set HTTP-only
         * access token.
         */

        response.cookies.set(
            "accessToken",
            accessToken,
            accessTokenCookieOptions,
        );


        /*
         * Set HTTP-only
         * refresh token.
         */

        response.cookies.set(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions,
        );


        return response;

    } catch (error) {

        console.error(
            "Restaurant OTP verification error:",
            error,
        );


        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong",
            },
            { status: 500 },
        );
    }
}