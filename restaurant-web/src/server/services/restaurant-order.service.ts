import mongoose from "mongoose";

import Restaurant from "@/server/models/restaurant.model";
import {
    OrderStatus,
    PaymentStatus,
} from "@/server/models/order.model";

import * as orderRepository from "@/server/repositories/order.repository";

class OrderServiceError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * Get restaurant owned by logged-in partner.
 *
 * IMPORTANT:
 * We NEVER trust restaurantId from frontend.
 */
const getPartnerRestaurant = async (
    ownerId: string
) => {
    if (!mongoose.isValidObjectId(ownerId)) {
        throw new OrderServiceError(
            "Invalid user",
            400
        );
    }

    const restaurant = await Restaurant.findOne({
        owner: ownerId,
    }).select("_id name address");

    if (!restaurant) {
        throw new OrderServiceError(
            "Restaurant not found",
            404
        );
    }

    return restaurant;
}

/**
 * Restaurant order list.
 */
export const getRestaurantOrders = async (
    ownerId: string,
    options?: {
        status?: OrderStatus;
        search?: string;
    }
) => {
    const restaurant =
        await getPartnerRestaurant(ownerId);

    return orderRepository.findRestaurantOrders(
        restaurant._id,
        options
    );
}

/**
 * Get one order after verifying ownership.
 */
const getOwnedOrder = async (
    ownerId: string,
    orderId: string
) => {
    const restaurant =
        await getPartnerRestaurant(ownerId);

    const order =
        await orderRepository.findRestaurantOrder(
            orderId,
            restaurant._id
        );

    if (!order) {
        throw new OrderServiceError(
            "Order not found",
            404
        );
    }

    return {
        restaurant,
        order,
    };
}

/**
 * Accept order.
 *
 * UI:
 * placed -> preparing
 *
 * We don't need to expose "accepted"
 * to the partner UI.
 */
export const acceptOrder = async (
    ownerId: string,
    orderId: string
) => {
    const { restaurant, order } =
        await getOwnedOrder(
            ownerId,
            orderId
        );

    if (order.orderStatus !== "placed") {
        throw new OrderServiceError(
            `Order cannot be accepted from ${order.orderStatus}`,
            409
        );
    }

    const updated =
        await orderRepository.updateOrder(
            orderId,
            restaurant._id,
            {
                orderStatus: "preparing",
            }
        );

    return updated;
}

/**
 * Restaurant declines order.
 */
export const declineOrder = async (
    ownerId: string,
    orderId: string,
    reason?: string
) => {
    const { restaurant, order } =
        await getOwnedOrder(
            ownerId,
            orderId
        );

    if (order.orderStatus !== "placed") {
        throw new OrderServiceError(
            `Order cannot be declined from ${order.orderStatus}`,
            409
        );
    }

    const update: any = {
        orderStatus: "cancelled",
        cancelledFrom: order.orderStatus,
        cancelledBy: "restaurant",
        cancelledAt: new Date(),
        cancellationReason:
            reason || "Restaurant declined the order",
    };

    /**
     * If prepaid, refund is required.
     *
     * For now we mark refunding.
     * Your payment service/provider should
     * actually process the refund.
     */
    if (
        order.paymentStatus === "success" &&
        order.payment.method !== "cod"
    ) {
        update.paymentStatus = "refunding";
    }

    return orderRepository.updateOrder(
        orderId,
        restaurant._id,
        update
    );
}

/**
 * Restaurant marks food ready.
 */
export const markOrderReady = async (
    ownerId: string,
    orderId: string
) => {
    const { restaurant, order } =
        await getOwnedOrder(
            ownerId,
            orderId
        );

    if (order.orderStatus !== "preparing") {
        throw new OrderServiceError(
            `Order cannot be marked ready from ${order.orderStatus}`,
            409
        );
    }

    return orderRepository.updateOrder(
        orderId,
        restaurant._id,
        {
            orderStatus: "ready",
        }
    );
}

/**
 * Restaurant confirms returned food.
 */
export const markReturnReceived = async (
    ownerId: string,
    orderId: string
) => {
    const { restaurant, order } =
        await getOwnedOrder(
            ownerId,
            orderId
        );

    if (
        order.orderStatus !==
        "cancelled_returning"
    ) {
        throw new OrderServiceError(
            "Order is not waiting for return",
            409
        );
    }

    return orderRepository.updateOrder(
        orderId,
        restaurant._id,
        {
            orderStatus: "return_received",
        }
    );
}

/**
 * Process refund.
 */
export const processRefund = async (
    ownerId: string,
    orderId: string
) => {
    const { restaurant, order } =
        await getOwnedOrder(
            ownerId,
            orderId
        );

    if (
        order.orderStatus !==
        "return_received"
    ) {
        throw new OrderServiceError(
            "Refund cannot be processed for this order",
            409
        );
    }

    if (order.payment.method === "cod") {
        throw new OrderServiceError(
            "COD orders do not require payment refund",
            400
        );
    }

    if (
        order.paymentStatus === "refunded"
    ) {
        throw new OrderServiceError(
            "Order has already been refunded",
            409
        );
    }

    /**
     * IMPORTANT:
     *
     * Real implementation:
     *
     * await paymentService.refund(...)
     *
     * Only after provider succeeds:
     * paymentStatus = refunded
     *
     * For now we simulate the refund.
     */

    const fakeRefundTransactionId =
        `REFUND_${Date.now()}`;

    return orderRepository.updateOrder(
        orderId,
        restaurant._id,
        {
            orderStatus: "refunded",

            paymentStatus:
                "refunded" as PaymentStatus,

            refundedAt: new Date(),

            refundTransactionId:
                fakeRefundTransactionId,
        }
    );
}

export { OrderServiceError };