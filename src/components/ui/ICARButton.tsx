import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ICARButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const ICARButton = React.forwardRef<HTMLButtonElement, ICARButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    asChild = false,
    isLoading = false,
    fullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    const baseStyles = 'inline-flex items-center justify-center font-heading font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-orange text-white hover:bg-orange/90 focus-visible:ring-orange',
      secondary: 'bg-sea-green text-white hover:bg-sea-green-darker focus-visible:ring-sea-green',
      outline: 'border-2 border-sea-green text-sea-green bg-transparent hover:bg-sea-green-off-white focus-visible:ring-sea-green',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-icar-sm',
      md: 'px-5 py-2.5 text-sm rounded-icar-md',
      lg: 'px-6 py-3 text-base rounded-icar-md',
    };
    
    return (
      <Comp
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

ICARButton.displayName = 'ICARButton';



