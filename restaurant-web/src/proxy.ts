import { NextRequest, NextResponse } from "next/server";

import {
    checkApiRateLimit,
    checkAuthRateLimit,
} from "@/server/middlewares/rateLimit.middleware";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect API routes
    if (!pathname.startsWith("/api/v1")) {
        return NextResponse.next();
    }

    // Stricter limit for authentication endpoints
    const isAuthRoute =
        pathname.startsWith("/api/v1/auth") ||
        pathname.startsWith("/api/v1/restaurant/phone-auth") ||
        pathname.startsWith("/api/v1/restaurant/verify-otp") ||
        pathname.startsWith(
            "/api/v1/restaurant/complete-profile"
        );

    const result = isAuthRoute
        ? checkAuthRateLimit(request)
        : checkApiRateLimit(request);

    if (!result.success) {
        return NextResponse.json(
            {
                success: false,
                message: isAuthRoute
                    ? "Too many authentication requests. Please try again later."
                    : "Too many requests. Please try again later.",
            },
            {
                status: 429,
                headers: {
                    "Retry-After":
                        result.retryAfter?.toString() ?? "60",
                },
            }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/v1/:path*"],
};