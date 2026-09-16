'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    type TooltipProps,
} from 'recharts';
import styles from './revenue-chart.module.sass';

interface RevenueData {
    day: string;
    revenue: number;
    orders: number;
}

const DATA: RevenueData[] = [
    { day: 'Mon', revenue: 12400, orders: 48 },
    { day: 'Tue', revenue: 15800, orders: 62 },
    { day: 'Wed', revenue: 13200, orders: 53 },
    { day: 'Thu', revenue: 18900, orders: 74 },
    { day: 'Fri', revenue: 24600, orders: 96 },
    { day: 'Sat', revenue: 31200, orders: 124 },
    { day: 'Sun', revenue: 28700, orders: 115 },
];

interface CustomTooltipProps
    extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
        value?: number;
        dataKey?: string;
    }>;
    label?: string;
}

function CustomTooltip({
    active,
    payload,
    label,
}: CustomTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const revenue =
        payload.find(
            (item) => item.dataKey === 'revenue'
        )?.value ?? 0;

    const orders =
        payload.find(
            (item) => item.dataKey === 'orders'
        )?.value ?? 0;

    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipLabel}>
                {label}
            </p>

            <p className={styles.tooltipRevenue}>
                ₹{Number(revenue).toLocaleString('en-IN')}
            </p>

            <p className={styles.tooltipOrders}>
                {orders} orders
            </p>
        </div>
    );
}

export default function RevenueChart() {
    return (
        <section className={styles.card}>
            <h2 className={styles.title}>
                Revenue & Order Trend
            </h2>

            <div className={styles.chart}>
                <ResponsiveContainer
                    width="100%"
                    height={220}
                >
                    <AreaChart
                        data={DATA}
                        margin={{
                            top: 4,
                            right: 4,
                            left: -10,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="revenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--analytics-revenue)"
                                    stopOpacity={0.15}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--analytics-revenue)"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--analytics-grid)"
                        />

                        <XAxis
                            dataKey="day"
                            tick={{
                                fontSize: 11,
                                fill: 'var(--analytics-axis)',
                                fontFamily:
                                    'var(--font-mono)',
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 11,
                                fill: 'var(--analytics-axis)',
                                fontFamily:
                                    'var(--font-mono)',
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value: number) =>
                                `₹${(
                                    value / 1000
                                ).toFixed(0)}k`
                            }
                        />

                        <Tooltip
                            content={
                                <CustomTooltip />
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--analytics-revenue)"
                            strokeWidth={2}
                            fill="url(#revenueGradient)"
                            dot={{
                                r: 3,
                                fill:
                                    'var(--analytics-revenue)',
                                strokeWidth: 0,
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="var(--analytics-orders)"
                            strokeWidth={1.5}
                            fill="none"
                            strokeDasharray="4 4"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
