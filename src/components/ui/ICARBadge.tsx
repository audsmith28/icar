import React from 'react';
import clsx from 'clsx';

export interface ICARBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
  size?: 'sm' | 'md';
}

export const ICARBadge = React.forwardRef<HTMLDivElement, ICARBadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    const variants = {
      default: 'bg-sea-green-light text-sea-green-darkest border-transparent',
      secondary: 'bg-gray-200 text-gray-800 border-transparent',
      success: 'bg-green-500 text-white border-transparent',
      warning: 'bg-yellow-500 text-white border-transparent',
      destructive: 'bg-red-600 text-white border-transparent',
      outline: 'border-2 border-gray-300 text-gray-700 bg-transparent',
    };
    
    const sizes = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

ICARBadge.displayName = 'ICARBadge';
