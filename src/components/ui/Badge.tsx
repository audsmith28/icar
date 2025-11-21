import * as React from "react"
import clsx from 'clsx';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
    size?: "sm" | "md" | "lg";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    styles.badge,
                    styles[variant] || styles.default,
                    styles[size] || styles.md,
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";
