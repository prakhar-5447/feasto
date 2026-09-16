'use client';

import { useState } from 'react';
import KPICards from '@/features/analytics/components/kpi-cards/kpi-cards';
import RevenueChart from '@/features/analytics/components/revenue-chart/revenue-chart';
import HourlyChart from '@/features/analytics/components/hourly-chart/hourly-chart';
import CategoryChart from '@/features/analytics/components/category-chart/category-chart';
import TopItemsTable from '@/features/analytics/components/top-items-table/top-items-table';
import styles from './analytics.module.sass';

const PERIODS = ['7D', '1M', '3M', '1Y'] as const;

type AnalyticsPeriod = (typeof PERIODS)[number];

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
    '7D': 'Sep 1 – Sep 7, 2026',
    '1M': 'Aug 2026',
    '3M': 'Jun – Aug 2026',
    '1Y': '2026',
};

export default function Analytics() {
    const [period, setPeriod] =
        useState<AnalyticsPeriod>('7D');

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        Analytics
                    </h1>

                    <p className={styles.subtitle}>
                        {PERIOD_LABELS[period]}
                    </p>
                </div>

                <div className={styles.periodSelector}>
                    {PERIODS.map((value) => {
                        const isActive = period === value;

                        return (
                            <button
                                key={value}
                                type="button"
                                className={`${styles.periodButton} ${isActive
                                        ? styles.periodButtonActive
                                        : ''
                                    }`}
                                onClick={() =>
                                    setPeriod(value)
                                }
                            >
                                {value}
                            </button>
                        );
                    })}
                </div>
            </header>

            <KPICards />

            <RevenueChart />

            <div className={styles.chartGrid}>
                <HourlyChart />
                <CategoryChart />
            </div>

            <TopItemsTable />
        </div>
    );
}