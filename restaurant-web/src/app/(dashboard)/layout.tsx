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

    return (
        <div className={styles.dashboard}>

            <Sidebar />

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