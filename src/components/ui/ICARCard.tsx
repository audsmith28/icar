import React from 'react';
import clsx from 'clsx';

export interface ICARCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const ICARCard = React.forwardRef<HTMLDivElement, ICARCardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200 shadow-icar-sm',
      elevated: 'bg-white border border-gray-200 shadow-icar-lg',
      outlined: 'bg-white border-2 border-gray-200',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-icar-lg overflow-hidden',
          variants[variant],
          paddings[padding],
          hover && 'transition-shadow hover:shadow-icar-md',
          className
        )}
        {...props}
      />
    );
  }
);

ICARCard.displayName = 'ICARCard';

export const ICARCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

ICARCardHeader.displayName = 'ICARCardHeader';

export const ICARCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx('text-2xl font-heading font-semibold leading-none tracking-tight text-sea-green-darkest', className)}
    {...props}
  />
));

ICARCardTitle.displayName = 'ICARCardTitle';

export const ICARCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('pt-0', className)}
    {...props}
  />
));

ICARCardContent.displayName = 'ICARCardContent';
