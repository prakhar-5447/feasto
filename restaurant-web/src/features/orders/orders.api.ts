import { restaurantApi } from "@/features/restaurant/restaurant.api";

import type {
    Order,
    OrderStatus,
} from "./orders.types";

export interface RestaurantOrdersResponse {
    success: boolean;
    data: Order[];
    message?: string;
}

export interface OrderActionResponse {
    success: boolean;
    data: Order;
    message?: string;
}

export interface DeclineOrderRequest {
    orderId: string;
    reason?: string;
}

export const ordersApi =
    restaurantApi.injectEndpoints({
        endpoints: (builder) => ({
            getRestaurantOrders:
                builder.query<
                    RestaurantOrdersResponse,
                    {
                        status?: OrderStatus;
                        search?: string;
                    } | void
                >({
                    query: (params) => ({
                        url: "/restaurant/orders",
                        method: "GET",
                        params: params ?? undefined,
                    }),

                    providesTags: (result) =>
                        result
                            ? [
                                {
                                    type: "Order" as const,
                                    id: "LIST",
                                },

                                ...result.data.map(
                                    (order) => ({
                                        type:
                                            "Order" as const,
                                        id: order.id,
                                    })
                                ),
                            ]
                            : [
                                {
                                    type: "Order" as const,
                                    id: "LIST",
                                },
                            ],
                }),

            acceptOrder:
                builder.mutation<
                    OrderActionResponse,
                    string
                >({
                    query: (orderId) => ({
                        url: `/restaurant/orders/${orderId}/accept`,
                        method: "PATCH",
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        orderId
                    ) => [
                            {
                                type: "Order",
                                id: orderId,
                            },
                            {
                                type: "Order",
                                id: "LIST",
                            },
                        ],
                }),

            declineOrder:
                builder.mutation<
                    OrderActionResponse,
                    DeclineOrderRequest
                >({
                    query: ({
                        orderId,
                        reason,
                    }) => ({
                        url: `/restaurant/orders/${orderId}/decline`,
                        method: "PATCH",
                        body: {
                            reason,
                        },
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        { orderId }
                    ) => [
                            {
                                type: "Order",
                                id: orderId,
                            },
                            {
                                type: "Order",
                                id: "LIST",
                            },
                        ],
                }),

            markOrderReady:
                builder.mutation<
                    OrderActionResponse,
                    string
                >({
                    query: (orderId) => ({
                        url: `/restaurant/orders/${orderId}/ready`,
                        method: "PATCH",
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        orderId
                    ) => [
                            {
                                type: "Order",
                                id: orderId,
                            },
                            {
                                type: "Order",
                                id: "LIST",
                            },
                        ],
                }),

            markReturnReceived:
                builder.mutation<
                    OrderActionResponse,
                    string
                >({
                    query: (orderId) => ({
                        url: `/restaurant/orders/${orderId}/return-received`,
                        method: "PATCH",
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        orderId
                    ) => [
                            {
                                type: "Order",
                                id: orderId,
                            },
                            {
                                type: "Order",
                                id: "LIST",
                            },
                        ],
                }),

            processRefund:
                builder.mutation<
                    OrderActionResponse,
                    string
                >({
                    query: (orderId) => ({
                        url: `/restaurant/orders/${orderId}/refund`,
                        method: "POST",
                    }),

                    invalidatesTags: (
                        _result,
                        _error,
                        orderId
                    ) => [
                            {
                                type: "Order",
                                id: orderId,
                            },
                            {
                                type: "Order",
                                id: "LIST",
                            },
                        ],
                }),
        }),

        overrideExisting: false,
    });

export const {
    useGetRestaurantOrdersQuery,
    useAcceptOrderMutation,
    useDeclineOrderMutation,
    useMarkOrderReadyMutation,
    useMarkReturnReceivedMutation,
    useProcessRefundMutation,
} = ordersApi;