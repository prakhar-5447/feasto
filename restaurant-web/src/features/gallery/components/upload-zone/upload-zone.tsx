'use client';

import {
    useRef,
    useState,
    type DragEvent,
} from 'react';

import {
    ImageIcon,
    Upload,
} from '@/shared/icons';

import styles from './upload-zone.module.sass';
import Button from '@/shared/components/button/button';

export default function UploadZone() {

    const [
        dragging,
        setDragging,
    ] = useState(false);

    const inputRef =
        useRef<HTMLInputElement>(null);


    const handleDragOver = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        setDragging(true);
    };


    const handleDragLeave = () => {
        setDragging(false);
    };


    const handleDrop = (
        event: DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        setDragging(false);
    };


    return (
        <div
            className={[
                styles.uploadZone,
                dragging
                    ? styles.dragging
                    : '',
            ]
                .filter(Boolean)
                .join(' ')}
            onDragOver={
                handleDragOver
            }
            onDragLeave={
                handleDragLeave
            }
            onDrop={
                handleDrop
            }
            onClick={() =>
                inputRef.current?.click()
            }
        >

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className={
                    styles.fileInput
                }
            />

            <div
                className={
                    styles.uploadContent
                }
            >

                <div
                    className={
                        styles.uploadIcon
                    }
                >
                    <ImageIcon
                        size={20}
                    />
                </div>

                <div>

                    <p
                        className={
                            styles.uploadTitle
                        }
                    >
                        Drop images here or
                        click to browse
                    </p>

                    <p
                        className={
                            styles.uploadDescription
                        }
                    >
                        JPG, PNG, WEBP up to
                        10MB · Max 20 images
                        per upload
                    </p>

                </div>


                <Button
                    type="button"
                    size="md"
                    icon={<Upload size={14} />}
                    onClick={(event) => {
                        event.stopPropagation();
                        inputRef.current?.click();
                    }}
                >
                    Browse Files
                </Button>

            </div>

        </div>
    );
}