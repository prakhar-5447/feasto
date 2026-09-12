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


    const handleToggleOpen = () => {
        setIsOpen(
            (value) => !value,
        );
    };


    return (
        <div
            className={
                styles.dashboard
            }
        >

            <Sidebar
                isOpen={isOpen}
                onToggleOpen={
                    handleToggleOpen
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