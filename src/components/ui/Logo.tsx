'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';

interface LogoProps {
    variant?: 'light' | 'dark';
    className?: string;
    height?: number;
    showText?: boolean;
}

/**
 * ICAR Logo Component
 * 
 * Place logo files in public/ directory:
 * - icar-logo-light.png (for dark backgrounds) - white/light logo
 * - icar-logo-dark.png (for light backgrounds) - dark logo
 * 
 * Supported formats: .png, .svg, .jpg
 * 
 * If logo files are not available, falls back to text-based logo
 */
export function Logo({ 
    variant = 'light', 
    className,
    height = 40,
    showText = false 
}: LogoProps) {
    const [imageError, setImageError] = useState(false);
    
    // Try multiple file extensions
    const logoExtensions = ['.png', '.svg', '.jpg', '.jpeg'];
    const logoSrc = variant === 'light' 
        ? '/icar-logo-light.png'  // White/light logo for dark backgrounds
        : '/icar-logo-dark.png';   // Dark logo for light backgrounds

    // Text fallback component
    const TextFallback = () => (
        <div className="flex flex-col justify-center h-full">
            <span className={clsx(
                'text-lg font-bold leading-tight',
                variant === 'light' ? 'text-white' : 'text-sea-green-darkest'
            )}>
                ICAR
            </span>
            <span className={clsx(
                'text-xs uppercase tracking-wide',
                variant === 'light' ? 'text-teal-200' : 'text-sea-green-darker'
            )}>
                Collective
            </span>
        </div>
    );

    return (
        <Link href="/" className={clsx('flex items-center no-underline', className)}>
            <div className="relative" style={{ height: `${height}px`, minWidth: '120px' }}>
                {!imageError ? (
                    <Image
                        src={logoSrc}
                        alt="ICAR - Israel's Collective Action for Resilience"
                        height={height}
                        width={200}
                        className="object-contain h-full w-auto"
                        onError={() => setImageError(true)}
                        priority
                        unoptimized // Allow any image format
                    />
                ) : (
                    <TextFallback />
                )}
            </div>
        </Link>
    );
}

