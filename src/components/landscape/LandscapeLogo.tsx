'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { OrgLogo } from '@/components/organizations/OrgLogo';
import { Stakeholder } from '@/lib/api/stakeholders';

interface LandscapeLogoProps {
    organization: Stakeholder;
    showTooltip?: boolean;
}

export function LandscapeLogo({ organization, showTooltip = true }: LandscapeLogoProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            href={`/organizations/${organization.id}`}
            className="group relative block w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center justify-center w-full h-full rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-105 cursor-pointer">
                <div className="w-full flex items-center justify-center">
                    <OrgLogo 
                        orgId={organization.id} 
                        orgName={organization.name} 
                        size="md"
                        className="transition-transform duration-200 group-hover:scale-110"
                    />
                </div>
                {/* Tooltip on hover */}
                {showTooltip && isHovered && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none">
                        {organization.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                )}
            </div>
        </Link>
    );
}

