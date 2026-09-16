'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    type TooltipProps,
} from 'recharts';
import styles from './hourly-chart.module.sass';

interface HourlyData {
    hour: string;
    orders: number;
}

const DATA: HourlyData[] = [
    { hour: '10am', orders: 8 },
    { hour: '11am', orders: 14 },
    { hour: '12pm', orders: 38 },
    { hour: '1pm', orders: 45 },
    { hour: '2pm', orders: 22 },
    { hour: '3pm', orders: 11 },
    { hour: '4pm', orders: 9 },
    { hour: '5pm', orders: 16 },
    { hour: '6pm', orders: 34 },
    { hour: '7pm', orders: 52 },
    { hour: '8pm', orders: 61 },
    { hour: '9pm', orders: 44 },
    { hour: '10pm', orders: 28 },
];

const PEAK = Math.max(
    ...DATA.map((item) => item.orders)
);

interface CustomTooltipProps
    extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
        value?: number;
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

    const orders = Number(payload[0]?.value ?? 0);

    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipLabel}>
                {label}
            </p>

            <p className={styles.tooltipValue}>
                {orders} orders
            </p>
        </div>
    );
}

export default function HourlyChart() {
    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Orders by Hour (Today)
                </h2>

                <span className={styles.peak}>
                    Peak: {PEAK} orders/hr
                </span>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer
                    width="100%"
                    height={180}
                >
                    <BarChart
                        data={DATA}
                        margin={{
                            top: 4,
                            right: 4,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--analytics-grid)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="hour"
                            tick={{
                                fontSize: 10,
                                fill: 'var(--analytics-axis)',
                                fontFamily:
                                    'var(--font-mono)',
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 10,
                                fill: 'var(--analytics-axis)',
                                fontFamily:
                                    'var(--font-mono)',
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            content={
                                <CustomTooltip />
                            }
                        />

                        <Bar
                            dataKey="orders"
                            fill="var(--analytics-primary)"
                            radius={[
                                4,
                                4,
                                0,
                                0,
                            ]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
