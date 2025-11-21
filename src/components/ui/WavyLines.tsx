'use client';

import React from 'react';

interface WavyLinesProps {
  className?: string;
  colors?: string[];
  position?: 'top' | 'bottom';
  opacity?: number;
}

export function WavyLines({ 
  className = '', 
  colors = ['#02808b', '#d95222', '#ffb4a0'],
  position = 'top',
  opacity = 0.3
}: WavyLinesProps) {
  // Create smooth wavy path
  const getPath = (offset: number = 0) => {
    const amplitude = 8;
    const frequency = 0.02;
    let path = `M 0 ${20 + offset}`;
    for (let x = 0; x <= 2000; x += 10) {
      const y = 20 + offset + Math.sin(x * frequency) * amplitude;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  return (
    <div 
      className={`wavy-lines ${className}`} 
      style={{ 
        position: 'absolute',
        [position]: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '60px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {colors.map((color, index) => (
        <svg
          key={index}
          viewBox="0 0 2000 40"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: opacity - (index * 0.1),
            transform: `translateY(${index * 3}px)`,
          }}
        >
          <path
            d={getPath(index * 2)}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}

