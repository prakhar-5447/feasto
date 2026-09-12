'use client';

import {
    useState,
    type ReactNode,
} from 'react';

import Sidebar from '@/layout/sidebar/sidebar';

import styles from './dashboard-layout.module.sass';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {

    const [
        isOpen,
        setIsOpen,
    ] = useState(true);

    return (
        <div className={styles.dashboard}>

            <Sidebar
                isOpen={isOpen}
                onToggleOpen={() =>
                    setIsOpen(
                        (value) => !value,
                    )
                }
            />

            <main
                className={
                    styles.content
                }
            >
                {children}
            </main>

        </div>
    );
}