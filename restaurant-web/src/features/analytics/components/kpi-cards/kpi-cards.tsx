import {
    TrendingUp,
    TrendingDown,
    ShoppingBag,
    Star,
    Users,
    DollarSign,
} from '@/shared/icons';
import styles from './kpi-cards.module.sass';

const KPI_CARDS = [
    {
        label: 'Total Revenue',
        value: '₹1,44,800',
        sub: 'Avg ₹20,685/day',
        trend: '+14.2%',
        positive: true,
        icon: DollarSign,
    },
    {
        label: 'Total Orders',
        value: '572',
        sub: 'Avg 81.7/day',
        trend: '+9.8%',
        positive: true,
        icon: ShoppingBag,
    },
    {
        label: 'Avg Rating',
        value: '4.6 ★',
        sub: '218 reviews',
        trend: '+0.2',
        positive: true,
        icon: Star,
    },
    {
        label: 'New Customers',
        value: '134',
        sub: '59% repeat rate',
        trend: '-3.1%',
        positive: false,
        icon: Users,
    },
];

export default function KPICards() {
    return (
        <div className={styles.grid}>
            {KPI_CARDS.map((kpi) => {
                const Icon = kpi.icon;

                return (
                    <div
                        key={kpi.label}
                        className={styles.card}
                    >
                        <div className={styles.main}>
                            <div className={styles.info}>
                                <p className={styles.label}>
                                    {kpi.label}
                                </p>

                                <p className={styles.value}>
                                    {kpi.value}
                                </p>

                                <p className={styles.sub}>
                                    {kpi.sub}
                                </p>
                            </div>

                            <div
                                className={`${styles.iconWrapper} ${kpi.positive
                                    ? styles.iconPositive
                                    : styles.iconNegative
                                    } `}
                            >
                                <Icon
                                    size={18}
                                />
                            </div>
                        </div>

                        <div
                            className={`${styles.trend} ${kpi.positive
                                ? styles.trendPositive
                                : styles.trendNegative
                                } `}
                        >
                            {kpi.positive ? (
                                <TrendingUp size={14} />
                            ) : (
                                <TrendingDown size={14} />
                            )}

                            <span>
                                {kpi.trend} vs last week
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

