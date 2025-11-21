import React from 'react';
import clsx from 'clsx';

export interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PageSection({
  title,
  description,
  children,
  actions,
  spacing = 'md',
  className,
}: PageSectionProps) {
  const spacings = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  };

  return (
    <div className={clsx(spacings[spacing], className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-2xl font-heading font-bold text-sea-green-darker mb-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
