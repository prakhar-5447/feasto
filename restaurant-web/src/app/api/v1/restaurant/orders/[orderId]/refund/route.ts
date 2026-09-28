import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/server/utils/auth.utils";

import {
    refundController,
} from "@/server/controllers/restaurant-order.controller";

interface RouteContext {
    params: Promise<{
        orderId: string;
    }>;
}

export async function POST(
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
                        "Only restaurant partners can process refunds",
                },
                { status: 403 }
            );
        }

        const { orderId } =
            await context.params;

        return refundController(
            user._id.toString(),
            orderId
        );
    } catch (error) {
        console.error(
            "Refund order error:",
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