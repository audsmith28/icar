'use client';

import React, { useMemo, useState } from 'react';
import { Stakeholder } from '@/lib/api/stakeholders';
import { 
    groupOrganizations, 
    sortCategories, 
    type GroupingType 
} from '@/lib/landscape-grouping';
import { LandscapeQuadrant } from './LandscapeQuadrant';
import { CategoryModal } from './CategoryModal';
import { LayoutGrid, Building2, MapPin, Target } from 'lucide-react';

interface LandscapeMapProps {
    organizations: Stakeholder[];
}

export function LandscapeMap({ organizations }: LandscapeMapProps) {
    const [groupingType, setGroupingType] = useState<GroupingType>('focus');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedOrgs, setSelectedOrgs] = useState<Stakeholder[]>([]);

    // Group organizations based on selected type
    const grouped = useMemo(() => {
        return groupOrganizations(organizations, groupingType);
    }, [organizations, groupingType]);

    // Sort categories by count, then alphabetically
    const sortedCategories = useMemo(() => {
        return sortCategories(grouped);
    }, [grouped]);

    const groupingOptions: { value: GroupingType; label: string; icon: React.ReactNode }[] = [
        { value: 'focus', label: 'Focus Areas', icon: <LayoutGrid className="w-4 h-4" /> },
        { value: 'type', label: 'Organization Type', icon: <Building2 className="w-4 h-4" /> },
        { value: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
        { value: 'national_imperative', label: 'National Imperatives', icon: <Target className="w-4 h-4" /> },
    ];

    const handleViewAll = (category: string, orgs: Stakeholder[]) => {
        setSelectedCategory(category);
        setSelectedOrgs(orgs);
    };

    const handleCloseModal = () => {
        setSelectedCategory(null);
        setSelectedOrgs([]);
    };

    return (
        <div className="w-full">
            {/* Toggle Controls */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Group by:</span>
                    <div className="flex flex-wrap gap-2">
                        {groupingOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setGroupingType(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    groupingType === option.value
                                        ? 'bg-[#02808b] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quadrant Grid */}
            {sortedCategories.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500">No organizations found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {sortedCategories.map(([category, orgs]) => (
                        <LandscapeQuadrant
                            key={category}
                            category={category}
                            organizations={orgs}
                            groupingType={groupingType}
                            onViewAll={() => handleViewAll(category, orgs)}
                        />
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            <div className="mt-8 p-6 bg-[#f0f9fa] rounded-lg">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div>
                        <span className="font-semibold text-[#004d57]">{organizations.length}</span> total organizations
                    </div>
                    <div>
                        <span className="font-semibold text-[#004d57]">{sortedCategories.length}</span> categories
                    </div>
                    <div className="text-xs text-gray-500">
                        Click any logo or "View All" to explore organizations
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            {selectedCategory && (
                <CategoryModal
                    isOpen={!!selectedCategory}
                    onClose={handleCloseModal}
                    category={selectedCategory}
                    organizations={selectedOrgs}
                />
            )}
        </div>
    );
}

