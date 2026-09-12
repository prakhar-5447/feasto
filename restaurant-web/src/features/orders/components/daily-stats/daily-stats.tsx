'use client';

import {
    Bike,
    ShoppingBag,
    TrendingUp,
    XCircle,
} from '@/shared/icons';

import type {
    Order,
} from '../../orders.types';

import styles from './daily-stats.module.sass';

interface DailyStatsProps {
    orders: Order[];
    isOpen: boolean;
}

const CANCELLED_STATUSES = [
    'cancelled',
    'cancelled_returning',
    'return_received',
    'refund_processing',
    'refunded',
] as const;

const ACTIVE_EXCLUDED_STATUSES = [
    'delivered',
    ...CANCELLED_STATUSES,
] as const;

export default function DailyStats({
    orders,
    isOpen,
}: DailyStatsProps) {

    const delivered =
        orders.filter(
            (order) =>
                order.status === 'delivered',
        );

    const active =
        orders.filter(
            (order) =>
                !ACTIVE_EXCLUDED_STATUSES.includes(
                    order.status as (
                        typeof ACTIVE_EXCLUDED_STATUSES
                    )[number],
                ),
        );

    const cancelled =
        orders.filter(
            (order) =>
                CANCELLED_STATUSES.includes(
                    order.status as (
                        typeof CANCELLED_STATUSES
                    )[number],
                ),
        );

    const revenue =
        delivered.reduce(
            (sum, order) =>
                sum + order.total,
            0,
        );

    const avgOrder =
        delivered.length > 0
            ? Math.round(
                revenue /
                delivered.length,
            )
            : 0;


    const stats = [
        {
            label: "Today's Revenue",
            value: `₹${revenue.toLocaleString()}`,
            sub: `${delivered.length} fulfilled`,
            icon: TrendingUp,
            iconClass:
                styles.successIcon,
        },
        {
            label: 'Active Orders',
            value: String(active.length),
            sub: 'In progress',
            icon: Bike,
            iconClass:
                styles.driverIcon,
        },
        {
            label: 'Avg Order Value',
            value: `₹${avgOrder}`,
            sub: 'Per order',
            icon: ShoppingBag,
            iconClass:
                styles.primaryIcon,
        },
        {
            label: 'Cancellations',
            value: String(
                cancelled.length,
            ),
            sub:
                cancelled.length === 0
                    ? 'Great work!'
                    : 'Review refunds',
            icon: XCircle,
            iconClass:
                cancelled.length > 0
                    ? styles.errorIcon
                    : styles.mutedIcon,
        },
    ];


    return (
        <div className={styles.dailyStats}>

            {/* Open / Closed Banner */}

            <div
                className={[
                    styles.statusBanner,
                    isOpen
                        ? styles.statusOpen
                        : styles.statusClosed,
                ].join(' ')}
            >

                <div
                    className={
                        styles.statusContent
                    }
                >

                    <span
                        className={
                            styles.statusDot
                        }
                        aria-hidden="true"
                    />

                    <div>
                        <p
                            className={
                                styles.statusTitle
                            }
                        >
                            {isOpen
                                ? 'Restaurant is Open'
                                : 'Restaurant is Closed'}
                        </p>

                        <p
                            className={
                                styles.statusDescription
                            }
                        >
                            {isOpen
                                ? 'Accepting new orders · Visible on Feasto'
                                : 'Not accepting orders · Hidden from discovery'}
                        </p>
                    </div>

                </div>


                <div
                    className={
                        styles.businessHours
                    }
                >

                    <p>
                        Sep 1, 2026
                    </p>

                    <span>
                        10:00 AM – 11:00 PM
                    </span>

                </div>

            </div>


            {/* Stat Cards */}

            <div
                className={
                    styles.statsGrid
                }
            >

                {stats.map(
                    ({
                        label,
                        value,
                        sub,
                        icon: Icon,
                        iconClass,
                    }) => (
                        <div
                            key={label}
                            className={
                                styles.statCard
                            }
                        >

                            <div
                                className={
                                    styles.statHeader
                                }
                            >

                                <div
                                    className={[
                                        styles.statIcon,
                                        iconClass,
                                    ].join(' ')}
                                >
                                    <Icon
                                        size={16}
                                    />
                                </div>

                                <span
                                    className={
                                        styles.statValue
                                    }
                                >
                                    {value}
                                </span>

                            </div>


                            <p
                                className={
                                    styles.statLabel
                                }
                            >
                                {label}
                            </p>

                            <p
                                className={
                                    styles.statSub
                                }
                            >
                                {sub}
                            </p>

                        </div>
                    ),
                )}

            </div>

        </div>
    );
}