import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/server/utils/auth.utils";

import {
    returnReceivedController,
} from "@/server/controllers/restaurant-order.controller";

interface RouteContext {
    params: Promise<{
        orderId: string;
    }>;
}

export async function PATCH(
    _request: Request,
    context: RouteContext
) {
    try {
        const user =
            await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Authentication required",
                },
                { status: 401 }
            );
        }

        if (
            user.role !==
            "restaurant_partner"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Only restaurant partners can confirm returns",
                },
                { status: 403 }
            );
        }

        const { orderId } =
            await context.params;

        return returnReceivedController(
            user._id.toString(),
            orderId
        );
    } catch (error) {
        console.error(
            "Return received error:",
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