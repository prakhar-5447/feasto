'use client';

import { useState } from 'react';
import {
    Star,
    ThumbsUp,
    Send,
    X,
} from '@/shared/icons';
import Button from '@/shared/components/button/button';
import styles from './review-card.module.sass';

export interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    text: string;
    order: string;
    helpful: number;
    reply: string;
}

interface ReviewCardProps {
    review: Review;
    onReply: (id: number, reply: string) => void;
}

export default function ReviewCard({
    review,
    onReply,
}: ReviewCardProps) {
    const [replying, setReplying] = useState(false);
    const [draft, setDraft] = useState('');

    const hasReply = Boolean(review.reply);

    const submit = () => {
        const reply = draft.trim();

        if (!reply) {
            return;
        }

        onReply(review.id, reply);
        setReplying(false);
        setDraft('');
    };

    return (
        <article className={styles.card}>
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.customer}>
                        <div className={styles.avatar}>
                            {review.name[0]}
                        </div>

                        <div className={styles.customerInfo}>
                            <div className={styles.customerMeta}>
                                <span className={styles.name}>
                                    {review.name}
                                </span>

                                <span className={styles.stars}>
                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                className={
                                                    star <= review.rating
                                                        ? styles.starActive
                                                        : styles.starInactive
                                                }
                                            />
                                        )
                                    )}
                                </span>

                                <span className={styles.date}>
                                    {review.date}
                                </span>
                            </div>

                            <p className={styles.order}>
                                Ordered: {review.order}
                            </p>
                        </div>
                    </div>

                    {!hasReply && (
                        <span className={styles.unreplied}>
                            Unreplied
                        </span>
                    )}
                </div>

                {/* Review Text */}
                <p className={styles.reviewText}>
                    {review.text}
                </p>

                {/* Helpful + Reply */}
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.helpfulButton}
                    >
                        <ThumbsUp size={14} />
                        <span>
                            {review.helpful} helpful
                        </span>
                    </button>

                    {!hasReply && !replying && (
                        <button
                            type="button"
                            className={styles.replyButton}
                            onClick={() =>
                                setReplying(true)
                            }
                        >
                            Reply publicly
                        </button>
                    )}
                </div>

                {/* Existing Reply */}
                {hasReply && (
                    <div className={styles.existingReply}>
                        <p className={styles.replyTitle}>
                            Your Response
                        </p>

                        <p className={styles.replyText}>
                            {review.reply}
                        </p>
                    </div>
                )}

                {/* Reply Composer */}
                {replying && (
                    <div className={styles.composer}>
                        <textarea
                            autoFocus
                            value={draft}
                            onChange={(event) =>
                                setDraft(event.target.value)
                            }
                            rows={3}
                            placeholder="Write a thoughtful public response..."
                        />

                        <div className={styles.composerActions}>
                            <Button
                                variant="primary"
                                size="sm"
                                icon={<Send size={14} />}
                                onClick={submit}
                                disabled={!draft.trim()}
                            >
                                Post Reply
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<X size={14} />}
                                onClick={() => {
                                    setReplying(false);
                                    setDraft('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
