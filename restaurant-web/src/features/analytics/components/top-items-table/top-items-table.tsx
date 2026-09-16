import styles from './top-items-table.module.sass';

const ITEMS = [
    {
        name: 'Chicken Biryani',
        orders: 284,
        revenue: 85200,
        trend: '+12%',
    },
    {
        name: 'Paneer Tikka',
        orders: 196,
        revenue: 58800,
        trend: '+8%',
    },
    {
        name: 'Butter Chicken',
        orders: 174,
        revenue: 69600,
        trend: '+5%',
    },
    {
        name: 'Dal Makhani',
        orders: 152,
        revenue: 45600,
        trend: '-2%',
    },
    {
        name: 'Garlic Naan',
        orders: 312,
        revenue: 18720,
        trend: '+18%',
    },
];

const HEADINGS = [
    'Item',
    'Orders',
    'Revenue',
    'Trend',
];

export default function TopItemsTable() {
    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Top Performing Items
                </h2>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            {HEADINGS.map((heading, index) => (
                                <th
                                    key={heading}
                                    className={
                                        index === 0
                                            ? styles.left
                                            : styles.right
                                    }
                                    scope="col"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {ITEMS.map((item, index) => {
                            const isPositive =
                                item.trend.startsWith('+');

                            return (
                                <tr
                                    key={item.name}
                                    className={styles.tableRow}
                                >
                                    <td className={styles.left}>
                                        <div
                                            className={
                                                styles.item
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.rank
                                                }
                                            >
                                                {index + 1}
                                            </span>

                                            <span
                                                className={
                                                    styles.itemName
                                                }
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td
                                        className={`${styles.right} ${styles.data} `}
                                    >
                                        {item.orders}
                                    </td>

                                    <td
                                        className={`${styles.right} ${styles.data} `}
                                    >
                                        ₹
                                        {item.revenue.toLocaleString(
                                            'en-IN'
                                        )}
                                    </td>

                                    <td
                                        className={`${styles.right} ${styles.trend} ${isPositive
                                                ? styles.trendPositive
                                                : styles.trendNegative
                                            } `}
                                    >
                                        {item.trend}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
