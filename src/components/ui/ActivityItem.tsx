import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ICARBadge } from './ICARBadge';
import clsx from 'clsx';

export interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  metadata?: Array<{ icon?: LucideIcon; text: string }>;
  badge?: { label: string; variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' };
  onClick?: () => void;
  className?: string;
}

export function ActivityItem({
  icon: Icon,
  title,
  metadata = [],
  badge,
  onClick,
  className,
}: ActivityItemProps) {
  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-3 border border-gray-200 rounded-icar-lg transition-colors',
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900">{title}</h4>
        {metadata.length > 0 && (
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            {metadata.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <span key={index} className="flex items-center gap-1">
                  {ItemIcon && <ItemIcon className="w-4 h-4" />}
                  {item.text}
                </span>
              );
            })}
          </div>
        )}
        {badge && (
          <div className="mt-2">
            <ICARBadge variant={badge.variant || 'default'}>{badge.label}</ICARBadge>
          </div>
        )}
      </div>
    </div>
  );
}
