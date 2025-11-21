import React from 'react';
import clsx from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
    className,
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    style,
    ...props
}: SkeletonProps) {
    const baseStyles = 'bg-gray-200 rounded';
    
    const variants = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-md',
    };
    
    const animations = {
        pulse: 'animate-pulse',
        wave: 'animate-shimmer',
        none: '',
    };
    
    const customStyle: React.CSSProperties = {
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? undefined : '1rem'),
        ...style,
    };
    
    return (
        <div
            className={clsx(
                baseStyles,
                variants[variant],
                animations[animation],
                className
            )}
            style={customStyle}
            {...props}
        />
    );
}

// Pre-built skeleton components
export function CardSkeleton({ count = 1 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
                    <Skeleton variant="rectangular" height="24px" width="60%" className="mb-4" />
                    <Skeleton variant="text" className="mb-2" />
                    <Skeleton variant="text" width="80%" />
                </div>
            ))}
        </>
    );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex gap-4 border-b pb-3 mb-3">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height="20px" width="100%" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3 border-b">
                    {Array.from({ length: cols }).map((_, j) => (
                        <Skeleton key={j} variant="rectangular" height="16px" width="100%" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <div className="flex gap-4 py-3 border-b">
            {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} variant="rectangular" height="16px" width="100%" />
            ))}
        </div>
    );
}
