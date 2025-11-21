'use client';

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface TooltipProps {
    content: string | React.ReactNode;
    children: React.ReactElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

export function Tooltip({ 
    content, 
    children, 
    position = 'top',
    delay = 200,
    className 
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    const showTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            updatePosition();
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const gap = 8;

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + gap;
                break;
        }

        // Keep tooltip within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 0) left = 8;
        if (left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 0) top = 8;
        if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height - 8;
        }

        setTooltipPosition({ top, left });
    };

    useEffect(() => {
        if (isVisible) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isVisible]);

    // Clone child and add event handlers
    const childWithProps = React.cloneElement(children as React.ReactElement<any>, {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
    } as any);
    
    // Set ref separately using useEffect
    useEffect(() => {
        if (childWithProps && (childWithProps as any).ref) {
            const element = (childWithProps as any).ref.current || (childWithProps as any).ref;
            if (element && element instanceof HTMLElement) {
                triggerRef.current = element;
            }
        }
    }, [childWithProps]);

    return (
        <>
            {childWithProps}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={clsx(
                        'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg',
                        'pointer-events-none animate-in fade-in-0 zoom-in-95 duration-200',
                        className
                    )}
                    style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                    }}
                    role="tooltip"
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={clsx(
                            'absolute w-2 h-2 bg-gray-900 transform rotate-45',
                            position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                            position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                            position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                            position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
                        )}
                    />
                </div>
            )}
        </>
    );
}

