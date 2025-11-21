import React from 'react';
import { Button } from './Button';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={clsx('flex items-center justify-between mb-8 pb-4 border-b border-gray-200', className)}>
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-sea-green-darkest">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {action && (
        action.href ? (
          <Link href={action.href}>
            <Button>{action.label}</Button>
          </Link>
        ) : (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}
