'use client';

import {
    Eye,
    Star,
    StarOff,
    Trash2,
} from '@/shared/icons';

import type {
    GalleryImage,
} from '../../gallery.types';

import styles from './image-card.module.sass';

interface ImageCardProps {
    image: GalleryImage;
    onPreview: () => void;
    onToggleFeatured: () => void;
    onDelete: () => void;
}

export default function ImageCard({
    image,
    onPreview,
    onToggleFeatured,
    onDelete,
}: ImageCardProps) {

    return (
        <div
            className={
                styles.imageCard
            }
        >

            <img
                src={image.url}
                alt={image.alt}
                className={
                    styles.image
                }
            />


            <div
                className={
                    styles.overlay
                }
            >

                <div
                    className={
                        styles.categoryBadge
                    }
                >
                    {image.category}
                </div>


                <div
                    className={
                        styles.actions
                    }
                >

                    <button
                        type="button"
                        className={
                            styles.actionButton
                        }
                        onClick={
                            onPreview
                        }
                        aria-label={`Preview ${image.alt}`}
                    >
                        <Eye
                            size={14}
                        />
                    </button>


                    <button
                        type="button"
                        className={
                            styles.actionButton
                        }
                        onClick={
                            onToggleFeatured
                        }
                        aria-label={
                            image.featured
                                ? `Remove ${image.alt} from featured`
                                : `Feature ${image.alt}`
                        }
                    >
                        {image.featured ? (
                            <StarOff
                                size={14}
                            />
                        ) : (
                            <Star
                                size={14}
                            />
                        )}
                    </button>


                    <button
                        type="button"
                        className={[
                            styles.actionButton,
                            styles.deleteButton,
                        ].join(' ')}
                        onClick={
                            onDelete
                        }
                        aria-label={`Delete ${image.alt}`}
                    >
                        <Trash2
                            size={14}
                        />
                    </button>

                </div>

            </div>


            {image.featured && (
                <div
                    className={
                        styles.featuredIndicator
                    }
                >
                    <Star
                        size={16}
                    />
                </div>
            )}

        </div>
    );
}