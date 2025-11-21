import { Link } from '@/i18n/routing';
import { LayoutDashboard, Map, Database, Settings, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <span className={styles.title}>Dashboard</span>
            </div>

            <nav className={styles.nav}>
                <Link href="/dashboard" className={styles.link}>
                    <LayoutDashboard size={20} />
                    <span>Overview</span>
                </Link>
                <Link href="/dashboard/map" className={styles.link}>
                    <Map size={20} />
                    <span>Map View</span>
                </Link>
                <Link href="/dashboard/resources" className={styles.link}>
                    <Database size={20} />
                    <span>Resources</span>
                </Link>
                <Link href="/dashboard/settings" className={styles.link}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className={styles.footer}>
                <button className={styles.logout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
