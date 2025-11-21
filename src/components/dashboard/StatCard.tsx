import { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <div className={styles.iconWrapper}>
                    <Icon size={20} className={styles.icon} />
                </div>
            </div>
            <div className={styles.content}>
                <span className={styles.value}>{value}</span>
                {trend && <span className={styles.trend}>{trend}</span>}
            </div>
        </div>
    );
}
