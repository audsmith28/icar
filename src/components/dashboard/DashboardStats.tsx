import React from 'react';
import styles from './DashboardStats.module.css';

interface StatCardProps {
    label: string;
    value: string | number;
    description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, description }) => (
    <div className={styles.card}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        {description && <div className={styles.description}>{description}</div>}
    </div>
);

export const DashboardStats = () => {
    // In a real app, these would be fetched from the API/DB
    const stats = [
        { label: 'Total Stakeholders', value: '42', description: 'Active organizations' },
        { label: 'Open Opportunities', value: '15', description: 'Funding & partnerships' },
        { label: 'Map Views', value: '1.2k', description: 'This month' },
        { label: 'Network Growth', value: '+12%', description: 'Since last week' },
    ];

    return (
        <div className={styles.grid}>
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};
