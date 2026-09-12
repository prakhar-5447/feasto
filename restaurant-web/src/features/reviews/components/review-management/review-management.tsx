'use client';

import { useState } from 'react';
import ReviewSummary from '@/features/reviews/components/review-summary/review-summary';
import ReviewCard, {
    type Review,
} from '@/features/reviews/components/review-card/review-card';
import styles from './review-management.module.sass';

const INITIAL_REVIEWS: Review[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        rating: 5,
        date: 'Aug 30, 2026',
        text: 'Absolutely brilliant! The Chicken Biryani was perfectly cooked — fragrant, well-spiced, and the chicken was incredibly tender. Will definitely order again.',
        order: 'Chicken Biryani, Raita, Coke',
        helpful: 12,
        reply: '',
    },
    {
        id: 2,
        name: 'Rahul Mehta',
        rating: 4,
        date: 'Aug 28, 2026',
        text: 'Good food overall. The Paneer Tikka was excellent but the Naan came slightly cold. Packaging could be better for long-distance deliveries.',
        order: 'Paneer Tikka, Garlic Naan ×3',
        helpful: 7,
        reply: "Thank you Rahul! We've noted the packaging feedback and switched to insulated containers. Hope to serve you better!",
    },
    {
        id: 3,
        name: 'Anika Joshi',
        rating: 5,
        date: 'Aug 27, 2026',
        text: "Dal Makhani was the best I've had outside a restaurant! Creamy, rich, and slow-cooked just right. The Jeera Rice was perfect too.",
        order: 'Dal Makhani ×2, Jeera Rice ×2',
        helpful: 18,
        reply: "Thank you so much, Anika! Dal Makhani is our chef's pride — slow-cooked for 8 hours. We're thrilled it hit the spot!",
    },
    {
        id: 4,
        name: 'Dev Kapoor',
        rating: 3,
        date: 'Aug 25, 2026',
        text: 'Decent food but delivery took way longer than expected. The Mutton Rogan Josh was good but arrived lukewarm. Hope timing improves.',
        order: 'Mutton Rogan Josh, Garlic Naan ×4',
        helpful: 4,
        reply: '',
    },
    {
        id: 5,
        name: 'Sneha Iyer',
        rating: 5,
        date: 'Aug 24, 2026',
        text: 'Ordered the Veg Thali for the whole family — excellent value! Every dish was fresh and flavorful. The Gulab Jamun was an absolute treat.',
        order: 'Veg Thali ×3',
        helpful: 9,
        reply: '',
    },
    {
        id: 6,
        name: 'Vikram Singh',
        rating: 2,
        date: 'Aug 23, 2026',
        text: 'Disappointed this time. The Fish Curry was too salty and the rice was undercooked. First bad experience in 10 orders.',
        order: 'Fish Curry, Steamed Rice ×2',
        helpful: 2,
        reply: '',
    },
];

type FilterType =
    | 'all'
    | 'unreplied'
    | '5'
    | '4'
    | '3'
    | '2'
    | '1';

const FILTER_OPTIONS: {
    value: FilterType;
    label: string;
}[] = [
        { value: 'all', label: 'All Reviews' },
        { value: 'unreplied', label: 'Unreplied' },
        { value: '5', label: '5 ★' },
        { value: '4', label: '4 ★' },
        { value: '3', label: '3 ★' },
        { value: '2', label: '2 ★' },
        { value: '1', label: '1 ★' },
    ];

export default function ReviewManagement() {
    const [reviews, setReviews] =
        useState<Review[]>(INITIAL_REVIEWS);

    const [filter, setFilter] =
        useState<FilterType>('all');

    const handleReply = (
        id: number,
        reply: string
    ) => {
        setReviews((previous) =>
            previous.map((review) =>
                review.id === id
                    ? {
                        ...review,
                        reply,
                    }
                    : review
            )
        );
    };

    const filteredReviews = reviews.filter((review) => {
        if (filter === 'unreplied') {
            return !review.reply;
        }

        if (filter !== 'all') {
            return review.rating === Number(filter);
        }

        return true;
    });

    const unrepliedCount = reviews.filter(
        (review) => !review.reply
    ).length;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        Reviews & Feedback
                    </h1>

                    <p className={styles.subtitle}>
                        {unrepliedCount > 0
                            ? `${unrepliedCount} review${unrepliedCount > 1 ? 's' : ''
                            } waiting for a response`
                            : 'All reviews replied ✓'}
                    </p>
                </div>
            </header>

            <ReviewSummary />

            <div className={styles.filters}>
                {FILTER_OPTIONS.map(
                    ({ value, label }) => {
                        const isActive =
                            filter === value;

                        return (
                            <button
                                key={value}
                                type="button"
                                className={`${styles.filterButton} ${isActive
                                    ? styles.filterButtonActive
                                    : ''
                                    } `}
                                onClick={() =>
                                    setFilter(value)
                                }
                            >
                                {label}

                                {value === 'unreplied' &&
                                    unrepliedCount > 0 && (
                                        <span
                                            className={
                                                styles.badge
                                            }
                                        >
                                            {unrepliedCount}
                                        </span>
                                    )}
                            </button>
                        );
                    }
                )}
            </div>

            <div className={styles.reviews}>
                {filteredReviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onReply={handleReply}
                    />
                ))}

                {filteredReviews.length === 0 && (
                    <div className={styles.emptyState}>
                        <span
                            className={
                                styles.emptyIcon
                            }
                            aria-hidden="true"
                        >
                            ⭐
                        </span>

                        <p className={styles.emptyTitle}>
                            No reviews here
                        </p>

                        <p className={styles.emptyText}>
                            Try a different filter
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
