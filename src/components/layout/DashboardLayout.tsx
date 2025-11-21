'use client';
import { Sidebar } from './Sidebar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

import { usePathname } from 'next/navigation';

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const hideSidebar = pathname?.includes('/dashboard');
    return (
        <div className={styles.layout}>
            {!hideSidebar && <Sidebar />}
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
