import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant = 'primary', size = 'md', asChild = false, fullWidth = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        
        return (
            <Comp
                ref={ref}
                className={clsx(
                    'btn',
                    styles.button,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Button.displayName = 'Button';
