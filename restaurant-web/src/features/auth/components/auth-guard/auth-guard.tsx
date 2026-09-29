'use client';

import {
    type ReactNode,
} from 'react';

import Sidebar from '@/layout/sidebar/sidebar';

import AuthGuard from '@/features/auth/components/auth-guard/auth-guard';

import styles from './dashboard-layout.module.sass';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {

    return (
        <AuthGuard>

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

        </AuthGuard>
    );
}