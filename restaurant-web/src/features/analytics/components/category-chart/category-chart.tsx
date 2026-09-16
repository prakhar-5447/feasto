'use client';

import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import styles from './category-chart.module.sass';

const DATA = [
    { name: 'Biryani', value: 38 },
    { name: 'Curries', value: 24 },
    { name: 'Breads', value: 16 },
    { name: 'Beverages', value: 12 },
    { name: 'Desserts', value: 10 },
];

const CATEGORY_COLORS = [
    '#E23744',
    '#FF6B35',
    '#F59E0B',
    '#10B981',
    '#6366F1',
];

export default function CategoryChart() {
    return (
        <section className={styles.card}>
            <h2 className={styles.title}>
                Sales by Category
            </h2>

            <div className={styles.chart}>
                <ResponsiveContainer
                    width="100%"
                    height={180}
                >
                    <PieChart>
                        <Pie
                            data={DATA}
                            cx="45%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={72}
                            dataKey="value"
                            paddingAngle={3}
                        >
                            {DATA.map((item, index) => (
                                <Cell
                                    key={item.name}
                                    fill={
                                        CATEGORY_COLORS[
                                        index %
                                        CATEGORY_COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>

                        <Legend
                            formatter={(value) => (
                                <span
                                    className={
                                        styles.legendLabel
                                    }
                                >
                                    {value}
                                </span>
                            )}
                        />

                        <Tooltip
                            formatter={(value) => [
                                `${value}% `,
                                'Share',
                            ]}
                            contentStyle={{
                                fontSize: 12,
                                borderRadius: 10,
                                border: '1px solid #E8E4DF',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
