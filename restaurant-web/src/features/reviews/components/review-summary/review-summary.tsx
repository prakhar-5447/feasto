import { Star } from '@/shared/icons';
import styles from './review-summary.module.sass';

const distribution = [
    { star: 5, count: 156 },
    { star: 4, count: 38 },
    { star: 3, count: 14 },
    { star: 2, count: 6 },
    { star: 1, count: 4 },
];

const total = distribution.reduce(
    (sum, rating) => sum + rating.count,
    0
);

const average =
    distribution.reduce(
        (sum, rating) => sum + rating.star * rating.count,
        0
    ) / total;

export default function ReviewSummary() {
    return (
        <div className={styles.summary}>
            {/* Overall Rating */}
            <div className={styles.overall}>
                <p className={styles.rating}>
                    {average.toFixed(1)}
                </p>

                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isActive =
                            star <= Math.round(average);

                        return (
                            <Star
                                key={star}
                                size={18}
                                className={
                                    isActive
                                        ? styles.starActive
                                        : styles.starInactive
                                }
                            />
                        );
                    })}
                </div>

                <p className={styles.total}>
                    {total} total ratings
                </p>
            </div>

            {/* Rating Distribution */}
            <div className={styles.distribution}>
                <div className={styles.rows}>
                    {distribution.map((rating) => {
                        const percentage =
                            (rating.count / total) * 100;

                        return (
                            <div
                                key={rating.star}
                                className={styles.row}
                            >
                                <span className={styles.starNumber}>
                                    {rating.star}
                                </span>

                                <Star
                                    size={12}
                                    className={styles.distributionStar}
                                />

                                <div className={styles.progress}>
                                    <div
                                        className={
                                            styles.progressFill
                                        }
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>

                                <span className={styles.count}>
                                    {rating.count}
                                </span>

                                <span className={styles.percentage}>
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}