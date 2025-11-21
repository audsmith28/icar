'use client';

import React from 'react';
import clsx from 'clsx';

interface ColorBlockProps {
  color: 'teal' | 'orange' | 'peach' | 'coral' | 'brown';
  size?: 'sm' | 'md' | 'lg' | 'full';
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  className?: string;
  children?: React.ReactNode;
}

const colorMap = {
  teal: '#02808b',
  orange: '#d95222',
  peach: '#ffb4a0',
  coral: '#ff8c6b',
  brown: '#48231a',
};

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  full: 'w-full h-full',
};

export function ColorBlock({ 
  color, 
  size = 'md', 
  position = 'left',
  className = '',
  children 
}: ColorBlockProps) {
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0',
    bottom: 'bottom-0',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={clsx(
        'absolute',
        sizeMap[size],
        positionClasses[position],
        className
      )}
      style={{
        backgroundColor: colorMap[color],
        opacity: size === 'full' ? 0.1 : 0.8,
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
}

