import { NextResponse } from "next/server";

import {
    OrderServiceError,
    getRestaurantOrders,
    acceptOrder,
    declineOrder,
    markOrderReady,
    markReturnReceived,
    processRefund,
} from "@/server/services/restaurant-order.service";

function handleError(error: unknown) {
    console.error("Restaurant order error:", error);

    if (error instanceof OrderServiceError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: error.statusCode,
            }
        );
    }

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

/**
 * GET restaurant orders
 */
export const getOrdersController = async (
    ownerId: string,
    searchParams: URLSearchParams
) => {
    try {
        const status =
            searchParams.get("status") ||
            undefined;

        const search =
            searchParams.get("search") ||
            undefined;

        const orders =
            await getRestaurantOrders(
                ownerId,
                {
                    status: status as any,
                    search,
                }
            );

        return NextResponse.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Accept
 */
export const acceptOrderController = async (
    ownerId: string,
    orderId: string
) => {
    try {
        const order =
            await acceptOrder(
                ownerId,
                orderId
            );

        return NextResponse.json({
            success: true,
            data: order,
            message: "Order accepted",
        });
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Decline
 */
export const declineOrderController = async (
    ownerId: string,
    orderId: string,
    reason?: string
) => {
    try {
        const order =
            await declineOrder(
                ownerId,
                orderId,
                reason
            );

        return NextResponse.json({
            success: true,
            data: order,
            message: "Order declined",
        });
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Ready
 */
export const readyOrderController = async (
    ownerId: string,
    orderId: string
) => {
    try {
        const order =
            await markOrderReady(
                ownerId,
                orderId
            );

        return NextResponse.json({
            success: true,
            data: order,
            message: "Order marked as ready",
        });
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Return received
 */
export const returnReceivedController = async (
    ownerId: string,
    orderId: string
) => {
    try {
        const order =
            await markReturnReceived(
                ownerId,
                orderId
            );

        return NextResponse.json({
            success: true,
            data: order,
            message: "Return received",
        });
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Refund
 */
export const refundController = async (
    ownerId: string,
    orderId: string
) => {
    try {
        const order =
            await processRefund(
                ownerId,
                orderId
            );

        return NextResponse.json({
            success: true,
            data: order,
            message: "Refund processed",
        });
    } catch (error) {
        return handleError(error);
    }
}