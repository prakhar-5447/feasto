'use client';

import {
    useMemo,
    useState,
} from 'react';

import CategoryFilter, {
    type Category,
} from '../category-filter/category-filter';

import ImageCard from '../image-card/image-card';

import PreviewModal from '../preview-modal/preview-modal';

import UploadZone from '../upload-zone/upload-zone';

import {
    INITIAL_IMAGES,
} from '../../gallery.mock';

import type {
    GalleryImage,
} from '../../gallery.types';

import styles from './image-gallery.module.sass';


export default function ImageGallery() {

    const [
        images,
        setImages,
    ] = useState<GalleryImage[]>(
        INITIAL_IMAGES,
    );

    const [
        activeCategory,
        setActiveCategory,
    ] = useState<Category>('All');

    const [
        preview,
        setPreview,
    ] = useState<GalleryImage | null>(
        null,
    );


    const filteredImages =
        useMemo(
            () =>
                images.filter(
                    (image) =>
                        activeCategory ===
                        'All' ||
                        image.category ===
                        activeCategory,
                ),
            [
                images,
                activeCategory,
            ],
        );


    const featuredCount =
        images.filter(
            (image) =>
                image.featured,
        ).length;


    const toggleFeatured = (
        id: number,
    ) => {
        setImages(
            (previous) =>
                previous.map(
                    (image) =>
                        image.id === id
                            ? {
                                ...image,
                                featured:
                                    !image.featured,
                            }
                            : image,
                ),
        );
    };


    const deleteImage = (
        id: number,
    ) => {
        setImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.id !== id,
                ),
        );

        setPreview(
            (current) =>
                current?.id === id
                    ? null
                    : current,
        );
    };


    const handlePreviewToggleFeatured =
        () => {

            if (!preview) {
                return;
            }

            toggleFeatured(
                preview.id,
            );

            setPreview(
                (current) =>
                    current
                        ? {
                            ...current,
                            featured:
                                !current.featured,
                        }
                        : null,
            );
        };


    return (
        <section
            className={
                styles.gallery
            }
        >

            {/* Header */}

            <header
                className={
                    styles.header
                }
            >

                <div>

                    <h1>
                        Image Gallery
                    </h1>

                    <p>
                        {images.length} images
                        {' · '}
                        {featuredCount}
                        {' '}
                        featured on your
                        profile
                    </p>

                </div>

            </header>


            {/* Upload */}

            <UploadZone />


            {/* Categories */}

            <CategoryFilter
                active={
                    activeCategory
                }
                onSelect={
                    setActiveCategory
                }
                images={
                    images
                }
            />


            {/* Grid */}

            <div
                className={
                    styles.grid
                }
            >

                {filteredImages.map(
                    (image) => (
                        <ImageCard
                            key={
                                image.id
                            }
                            image={
                                image
                            }
                            onPreview={() =>
                                setPreview(
                                    image,
                                )
                            }
                            onToggleFeatured={() =>
                                toggleFeatured(
                                    image.id,
                                )
                            }
                            onDelete={() =>
                                deleteImage(
                                    image.id,
                                )
                            }
                        />
                    ),
                )}


                <button
                    type="button"
                    className={
                        styles.addCard
                    }
                >

                    <span>
                        +
                    </span>

                    <small>
                        Add more
                    </small>

                </button>

            </div>


            {/* Preview */}

            {preview && (
                <PreviewModal
                    image={
                        preview
                    }
                    onClose={() =>
                        setPreview(
                            null,
                        )
                    }
                    onToggleFeatured={
                        handlePreviewToggleFeatured
                    }
                    onDelete={() =>
                        deleteImage(
                            preview.id,
                        )
                    }
                />
            )}

        </section>
    );
}