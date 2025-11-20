import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    return (
        <button
            className={clsx(
                'btn', // Global class
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
