'use client';

import React from 'react';
import { Stakeholder } from '@/lib/api/stakeholders';
import { LandscapeLogo } from './LandscapeLogo';

interface LandscapeCategoryProps {
    category: string;
    organizations: Stakeholder[];
}

export function LandscapeCategory({ category, organizations }: LandscapeCategoryProps) {
    if (organizations.length === 0) {
        return null;
    }

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-sea-green-darkest">
                    {category}
                </h3>
                <span className="text-sm text-gray-500 font-medium">
                    ({organizations.length} {organizations.length === 1 ? 'organization' : 'organizations'})
                </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {organizations.map((org) => (
                    <LandscapeLogo key={org.id} organization={org} />
                ))}
            </div>
        </div>
    );
}

