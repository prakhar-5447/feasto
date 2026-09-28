import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/server/utils/auth.utils";

import {
    getOrdersController,
} from "@/server/controllers/restaurant-order.controller";

export async function GET(
    request: Request
) {
    try {
        const user =
            await getAuthenticatedUser();

        // Authentication
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Authentication required",
                },
                {
                    status: 401,
                }
            );
        }

        // Authorization
        if (
            user.role !==
            "restaurant_partner"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Only restaurant partners can access orders",
                },
                {
                    status: 403,
                }
            );
        }

        const url =
            new URL(request.url);

        return getOrdersController(
            user._id.toString(),
            url.searchParams
        );
    } catch (error) {
        console.error(
            "GET restaurant orders error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}