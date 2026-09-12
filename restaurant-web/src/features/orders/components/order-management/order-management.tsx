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
    INITIAL_ORDERS,
} from '../../orders.mock';

import type {
    Order,
    OrderStatus,
} from '../../orders.types';

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


interface OrderManagementProps {
    isOpen: boolean;
}


export default function OrderManagement({
    isOpen,
}: OrderManagementProps) {

    const [
        orders,
        setOrders,
    ] = useState<Order[]>(
        INITIAL_ORDERS,
    );

    const [
        filter,
        setFilter,
    ] = useState<OrderFilter>('all');

    const [
        search,
        setSearch,
    ] = useState('');


    const updateOrder = (
        id: string,
        patch: Partial<Order>,
    ) => {
        setOrders(
            (previous) =>
                previous.map(
                    (order) =>
                        order.id === id
                            ? {
                                ...order,
                                ...patch,
                            }
                            : order,
                ),
        );
    };


    const acceptOrder = (
        id: string,
    ) => {
        updateOrder(
            id,
            {
                status: 'preparing',
            },
        );
    };


    const declineOrder = (
        id: string,
        order: Order,
    ) => {
        updateOrder(
            id,
            {
                status: 'cancelled',
                cancelledFrom:
                    order.status,
                cancelledBy:
                    'restaurant',
            },
        );
    };


    const markReady = (
        id: string,
    ) => {
        updateOrder(
            id,
            {
                status: 'ready',
            },
        );
    };


    const markReturned = (
        id: string,
    ) => {
        updateOrder(
            id,
            {
                status: 'return_received',
            },
        );
    };


    const processRefund = (
        id: string,
    ) => {
        updateOrder(
            id,
            {
                status: 'refund_processing',
            },
        );
    };


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
                            filter ===
                                'cancelled'
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
                        (accumulator.all ??
                            0) + 1;


                    const bucket =
                        CANCEL_FAMILY.includes(
                            order.status,
                        )
                            ? 'cancelled'
                            : order.status;

                    accumulator[bucket] =
                        (
                            accumulator[
                            bucket
                            ] ?? 0
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


    return (
        <section
            className={
                styles.orderManagement
            }
        >

            {/* Header */}

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


            {/* Daily statistics */}

            <DailyStats
                orders={orders}
                isOpen={isOpen}
            />


            {/* Filters */}

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


            {/* Orders */}

            {filteredOrders.length ===
                0 ? (
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
                                onAccept={() =>
                                    acceptOrder(
                                        order.id,
                                    )
                                }
                                onDecline={() =>
                                    declineOrder(
                                        order.id,
                                        order,
                                    )
                                }
                                onMarkReady={() =>
                                    markReady(
                                        order.id,
                                    )
                                }
                                onMarkReturned={() =>
                                    markReturned(
                                        order.id,
                                    )
                                }
                                onProcessRefund={() =>
                                    processRefund(
                                        order.id,
                                    )
                                }
                            />
                        ),
                    )}

                </div>
            )}

        </section>
    );
}