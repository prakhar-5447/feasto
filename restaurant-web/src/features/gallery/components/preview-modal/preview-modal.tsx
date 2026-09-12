'use client';

import {
    Star,
    Trash2,
    X,
} from '@/shared/icons';

import type {
    GalleryImage,
} from '../../gallery.types';

import styles from './preview-modal.module.sass';

interface PreviewModalProps {
    image: GalleryImage;
    onClose: () => void;
    onToggleFeatured: () => void;
    onDelete: () => void;
}

export default function PreviewModal({
    image,
    onClose,
    onToggleFeatured,
    onDelete,
}: PreviewModalProps) {

    return (
        <div
            className={
                styles.overlay
            }
            onClick={
                onClose
            }
        >

            <div
                className={
                    styles.modal
                }
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <div
                    className={
                        styles.imageWrapper
                    }
                >

                    <img
                        src={image.url}
                        alt={image.alt}
                        className={
                            styles.previewImage
                        }
                    />

                    <button
                        type="button"
                        className={
                            styles.closeButton
                        }
                        onClick={
                            onClose
                        }
                        aria-label="Close preview"
                    >
                        <X
                            size={16}
                        />
                    </button>

                </div>


                <div
                    className={
                        styles.footer
                    }
                >

                    <div
                        className={
                            styles.metadata
                        }
                    >

                        <p>
                            {image.alt}
                        </p>

                        <span>
                            {image.category}
                            {' · '}
                            Uploaded{' '}
                            {image.uploadedAt}
                        </span>

                    </div>


                    <div
                        className={
                            styles.actions
                        }
                    >

                        <button
                            type="button"
                            className={[
                                styles.secondaryAction,
                                image.featured
                                    ? styles.featuredAction
                                    : '',
                            ].join(' ')}
                            onClick={
                                onToggleFeatured
                            }
                        >

                            <Star
                                size={14}
                            />

                            {image.featured
                                ? 'Unfeature'
                                : 'Feature'}

                        </button>


                        <button
                            type="button"
                            className={
                                styles.deleteAction
                            }
                            onClick={() => {
                                onDelete();
                                onClose();
                            }}
                        >

                            <Trash2
                                size={14}
                            />

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}