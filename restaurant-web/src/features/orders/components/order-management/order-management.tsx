'use client';

import {
    useMemo,
    useState,
} from 'react';

import DailyStats
    from '../daily-stats/daily-stats';

import OrderFilters
    from '../order-filters/order-filters';

import OrderCard
    from '../order-card/order-card';

import {
    useAcceptOrderMutation,
    useDeclineOrderMutation,
    useGetRestaurantOrdersQuery,
    useMarkOrderReadyMutation,
    useMarkReturnReceivedMutation,
    useProcessRefundMutation,
} from '../../orders.api';

import {
    useGetRestaurantQuery,
} from '@/features/restaurant/restaurant.api';

import type {
    Order,
    OrderStatus,
} from '../../orders.types';

import {
    mapOrderToUi,
} from '../../orders.mapper';

import styles from './order-management.module.sass';

type OrderFilter =
    | 'all'
    | OrderStatus;

const CANCEL_FAMILY: OrderStatus[] = [
    'cancelled',
    'cancelled_returning',
    'return_received',
    'refund_processing',
    'refunded',
];

const INACTIVE_STATUSES: OrderStatus[] = [
    'delivered',
    ...CANCEL_FAMILY,
];

export default function OrderManagement() {
    const {
        data: restaurantResponse,
    } = useGetRestaurantQuery();

    const {
        data: ordersResponse,
        isLoading,
        isError,
    } = useGetRestaurantOrdersQuery();

    const [
        acceptOrder,
        {
            isLoading: isAccepting,
        },
    ] = useAcceptOrderMutation();

    const [
        declineOrder,
        {
            isLoading: isDeclining,
        },
    ] = useDeclineOrderMutation();

    const [
        markOrderReady,
        {
            isLoading: isMarkingReady,
        },
    ] = useMarkOrderReadyMutation();

    const [
        markReturnReceived,
        {
            isLoading: isReceivingReturn,
        },
    ] = useMarkReturnReceivedMutation();

    const [
        processRefund,
        {
            isLoading: isRefunding,
        },
    ] = useProcessRefundMutation();

    const isOpen =
        restaurantResponse?.data?.isOpen ?? false;

    const orders = useMemo<Order[]>(
        () =>
            ordersResponse?.data?.map(
                mapOrderToUi,
            ) ?? [],
        [ordersResponse],
    );

    const [
        filter,
        setFilter,
    ] = useState<OrderFilter>('all');

    const [
        search,
        setSearch,
    ] = useState('');

    const filteredOrders =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            return orders.filter(
                (order) => {
                    const matchesFilter =
                        filter === 'all' ||
                        (
                            filter === 'cancelled'
                                ? CANCEL_FAMILY.includes(
                                    order.status,
                                )
                                : order.status ===
                                filter
                        );

                    const matchesSearch =
                        !query ||
                        order.customer
                            .toLowerCase()
                            .includes(query) ||
                        order.id
                            .toLowerCase()
                            .includes(query) ||
                        order.phone
                            .toLowerCase()
                            .includes(query);

                    return (
                        matchesFilter &&
                        matchesSearch
                    );
                },
            );
        }, [
            orders,
            filter,
            search,
        ]);

    const counts =
        useMemo(() => {
            return orders.reduce<
                Record<string, number>
            >(
                (
                    accumulator,
                    order,
                ) => {
                    accumulator.all =
                        (accumulator.all ?? 0) + 1;

                    const bucket =
                        CANCEL_FAMILY.includes(
                            order.status,
                        )
                            ? 'cancelled'
                            : order.status;

                    accumulator[bucket] =
                        (
                            accumulator[bucket] ??
                            0
                        ) + 1;

                    return accumulator;
                },
                {},
            );
        }, [orders]);

    const liveCount =
        orders.filter(
            (order) =>
                !INACTIVE_STATUSES.includes(
                    order.status,
                ),
        ).length;

    const handleAccept = async (
        orderId: string,
    ) => {
        try {
            await acceptOrder(
                orderId,
            ).unwrap();
        } catch (error) {
            console.error(
                'Accept order failed:',
                error,
            );
        }
    };

    const handleDecline = async (
        orderId: string,
        reason?: string,
    ) => {
        try {
            await declineOrder({
                orderId,
                reason,
            }).unwrap();
        } catch (error) {
            console.error(
                'Decline order failed:',
                error,
            );
        }
    };

    const handleMarkReady = async (
        orderId: string,
    ) => {
        try {
            await markOrderReady(
                orderId,
            ).unwrap();
        } catch (error) {
            console.error(
                'Mark order ready failed:',
                error,
            );
        }
    };

    const handleMarkReturned = async (
        orderId: string,
    ) => {
        try {
            await markReturnReceived(
                orderId,
            ).unwrap();
        } catch (error) {
            console.error(
                'Mark return received failed:',
                error,
            );
        }
    };

    const handleProcessRefund = async (
        orderId: string,
    ) => {
        try {
            await processRefund(
                orderId,
            ).unwrap();
        } catch (error) {
            console.error(
                'Process refund failed:',
                error,
            );
        }
    };

    if (isLoading) {
        return (
            <section
                className={
                    styles.orderManagement
                }
            >
                <div
                    className={
                        styles.emptyState
                    }
                >
                    <p
                        className={
                            styles.emptyTitle
                        }
                    >
                        Loading orders...
                    </p>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section
                className={
                    styles.orderManagement
                }
            >
                <div
                    className={
                        styles.emptyState
                    }
                >
                    <p
                        className={
                            styles.emptyTitle
                        }
                    >
                        Failed to load orders
                    </p>

                    <p
                        className={
                            styles.emptyDescription
                        }
                    >
                        Please try again later.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            className={
                styles.orderManagement
            }
        >
            <header
                className={
                    styles.header
                }
            >
                <div>
                    <h1>
                        Order Management
                    </h1>

                    <p>
                        {liveCount} active order
                        {liveCount !== 1
                            ? 's'
                            : ''}{' '}
                        right now
                    </p>
                </div>

                <div
                    className={
                        styles.liveFeed
                    }
                >
                    <span
                        className={
                            styles.liveDot
                        }
                        aria-hidden="true"
                    />

                    Live Feed
                </div>
            </header>

            <DailyStats
                orders={orders}
                isOpen={isOpen}
            />

            <div
                className={
                    styles.filtersCard
                }
            >
                <OrderFilters
                    filter={filter}
                    onFilter={setFilter}
                    search={search}
                    onSearch={setSearch}
                    counts={counts}
                />
            </div>

            {filteredOrders.length === 0 ? (
                <div
                    className={
                        styles.emptyState
                    }
                >
                    <div
                        className={
                            styles.emptyIcon
                        }
                    >
                        🍽️
                    </div>

                    <p
                        className={
                            styles.emptyTitle
                        }
                    >
                        No orders here
                    </p>

                    <p
                        className={
                            styles.emptyDescription
                        }
                    >
                        Try a different filter
                        or search term
                    </p>
                </div>
            ) : (
                <div
                    className={
                        styles.orderList
                    }
                >
                    {filteredOrders.map(
                        (order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onAccept={
                                    handleAccept
                                }
                                onDecline={
                                    handleDecline
                                }
                                onMarkReady={
                                    handleMarkReady
                                }
                                onMarkReturned={
                                    handleMarkReturned
                                }
                                onProcessRefund={
                                    handleProcessRefund
                                }
                            />
                        ),
                    )}
                </div>
            )}
        </section>
    );
}