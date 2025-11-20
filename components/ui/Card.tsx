import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    padding = 'md'
}) => {
    return (
        <div className={clsx(styles.card, styles[`padding-${padding}`], className)}>
            {children}
        </div>
    );
};
