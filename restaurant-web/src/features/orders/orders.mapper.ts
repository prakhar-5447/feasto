import type {
    Order,
    OrderStatus,
} from "./orders.types";

function mapStatus(
    status: string
): OrderStatus {
    switch (status) {
        case "placed":
            return "new";

        case "accepted":
            return "preparing";

        case "preparing":
            return "preparing";

        case "ready":
            return "ready";

        case "driver_assigned":
            return "driver_assigned";

        case "picked_up":
            return "picked_up";

        case "delivered":
            return "delivered";

        case "cancelled":
            return "cancelled";

        case "cancelled_returning":
            return "cancelled_returning";

        case "return_received":
            return "return_received";

        case "refund_processing":
            return "refund_processing";

        case "refunded":
            return "refunded";

        default:
            return "new";
    }
}

export function mapOrderToUi(
    order: any
): Order {
    return {
        id: order.orderId,

        customer:
            order.customer?.name ??
            "Unknown Customer",

        phone:
            order.customer?.phone ??
            "",

        items:
            order.items?.map(
                (item: any) => ({
                    name: item.name,

                    qty: item.quantity,

                    price: item.price,
                })
            ) ?? [],

        total:
            order.billing?.grandTotal ??
            0,

        address:
            order.deliveryAddress
                ?.fullAddress ?? "",

        placedAt:
            order.createdAt,

        eta:
            "",

        status: mapStatus(
            order.orderStatus
        ),

        driver:
            order.driverSnapshot?.name ??
            order.driver?.name ??
            null,

        driverPhone:
            order.driverSnapshot?.phone ??
            order.driver?.phone ??
            null,

        paymentMode:
            order.payment?.method === "cod"
                ? "COD"
                : "Prepaid",

        cancelledFrom:
            order.cancelledFrom
                ? mapStatus(
                    order.cancelledFrom
                )
                : undefined,

        cancelledBy:
            order.cancelledBy,
    };
}