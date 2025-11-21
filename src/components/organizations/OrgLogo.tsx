import React from 'react';
import { Building2 } from 'lucide-react';

interface OrgLogoProps {
    orgId: string;
    orgName: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function OrgLogo({ orgId, orgName, size = 'md', className = '' }: OrgLogoProps) {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    // Generate a consistent color based on org ID
    const colors = [
        '#02808b', '#d95222', '#83c5be', '#ffddd2', '#004d57',
        '#c0451a', '#5d4037', '#0284c7', '#0ea5e9', '#2563eb'
    ];
    const colorIndex = orgId.charCodeAt(orgId.length - 1) % colors.length;
    const bgColor = colors[colorIndex];
    const sizeNum = size === 'sm' ? '48' : size === 'md' ? '64' : '96';
    const bgColorHex = bgColor.replace('#', '');
    const initial = orgName.charAt(0).toUpperCase();

    return (
        <div 
            className={`${sizeClasses[size]} rounded-lg flex items-center justify-center overflow-hidden ${className}`}
            style={{ backgroundColor: `${bgColor}20` }}
        >
            {/* Placeholder logo using placehold.co */}
            <img
                src={`https://placehold.co/${sizeNum}x${sizeNum}/${bgColorHex}/ffffff?text=${encodeURIComponent(initial)}`}
                alt={`${orgName} logo`}
                className={`${sizeClasses[size]} rounded-lg object-cover`}
            />
        </div>
    );
}

