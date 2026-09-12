'use client';

import styles from './loader.module.sass';

interface LoaderProps {
    size?: number;
    borderSize?: number;
    text?: string;
    overlay?: boolean;
    label?: string;
}

export default function Loader({
    size = 18,
    borderSize = 2,
    text = '',
    overlay = false,
    label = 'Loading...',
}: LoaderProps) {
    return (
        <div
            className={`${styles.loaderWrapper} ${overlay ? styles.overlay : ''
                }`}
            role={overlay ? 'status' : undefined}
            aria-label={label}
            aria-live={overlay ? 'polite' : undefined}
        >
            <span
                className={styles.spinner}
                style={{
                    width: size,
                    height: size,
                    borderWidth: borderSize,
                }}
                aria-hidden="true"
            />

            {text && (
                <span className={styles.loaderText}>
                    {text}
                </span>
            )}
        </div>
    );
}