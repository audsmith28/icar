import React from 'react';
import { Button } from './Button';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * PageHero - Consistent teal header block for all pages
 * Matches the dashboard style for cohesive design
 */
export function PageHero({ 
  title, 
  description, 
  icon: Icon,
  action,
  className,
  variant = 'default'
}: PageHeroProps) {
  const paddingClass = variant === 'compact' 
    ? 'py-8 lg:py-10' 
    : 'py-12 lg:py-16';

  return (
    <div className={clsx(
      'bg-gradient-to-br from-sea-green-darkest to-sea-green-darker',
      className
    )}>
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', paddingClass)}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {Icon && (
                <div className="p-2 bg-white/10 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              )}
              <h1 
                className="font-bold text-white" 
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: '120%' }}
              >
                {title}
              </h1>
            </div>
            {description && (
              <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action.href ? (
                <Link href={action.href}>
                  <Button 
                    variant={action.variant || 'primary'} 
                    size="lg"
                    className="bg-white/10 border-white text-white hover:bg-white/20"
                  >
                    {action.label}
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant={action.variant || 'primary'} 
                  size="lg"
                  onClick={action.onClick}
                  className="bg-white/10 border-white text-white hover:bg-white/20"
                >
                  {action.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

