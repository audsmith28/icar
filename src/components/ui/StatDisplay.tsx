import React from 'react';
import clsx from 'clsx';

export interface StatDisplayProps {
  value: string | number;
  label: string;
  description?: string;
  className?: string;
}

export function StatDisplay({
  value,
  label,
  description,
  className,
}: StatDisplayProps) {
  return (
    <div className={clsx('text-center', className)}>
      <div className="text-4xl font-heading font-bold text-sea-green-darkest mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      {description && (
        <div className="text-xs text-gray-500">{description}</div>
      )}
    </div>
  );
}
