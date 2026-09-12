import type {
    ReactNode,
} from 'react';

import styles from './section-card.module.sass';

interface SectionCardProps {
    title: string;
    children: ReactNode;
}

export default function SectionCard({
    title,
    children,
}: SectionCardProps) {
    return (
        <section
            className={
                styles.sectionCard
            }
        >

            <div
                className={
                    styles.header
                }
            >
                <h2>
                    {title}
                </h2>
            </div>


            <div
                className={
                    styles.content
                }
            >
                {children}
            </div>

        </section>
    );
}