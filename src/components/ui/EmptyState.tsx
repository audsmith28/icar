import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import clsx from 'clsx';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick?: () => void;
        href?: string;
        variant?: 'primary' | 'secondary' | 'outline';
    };
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className
}: EmptyStateProps) {
    return (
        <div className={clsx(
            'flex flex-col items-center justify-center py-12 px-4 text-center',
            className
        )}>
            {Icon && (
                <div className="mb-4 p-4 bg-sea-green-off-white rounded-full">
                    <Icon className="w-8 h-8 text-sea-green-darker" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            {description && (
                <p className="text-sm text-gray-500 max-w-md mb-6">
                    {description}
                </p>
            )}
            {action && (
                <div>
                    {action.href ? (
                        <a href={action.href}>
                            <Button variant={action.variant || 'primary'}>
                                {action.label}
                            </Button>
                        </a>
                    ) : (
                        <Button 
                            variant={action.variant || 'primary'}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

