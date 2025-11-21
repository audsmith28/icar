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
import { Card } from '@/components/ui/Card';

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
            {/* Enhanced Toggle Controls */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-sea-green-off-white to-white border-sea-green-light">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-sea-green-darker" />
                        <span className="text-sm font-semibold text-sea-green-darkest uppercase tracking-wide">Group by:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {groupingOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setGroupingType(option.value)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    groupingType === option.value
                                        ? 'bg-sea-green-darker text-white shadow-lg transform scale-105'
                                        : 'bg-white text-gray-700 hover:bg-sea-green-off-white border-2 border-gray-200 hover:border-sea-green-darker hover:shadow-md'
                                }`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Quadrant Grid */}
            {sortedCategories.length === 0 ? (
                <div className="text-center py-16" role="status" aria-live="polite">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-sea-green-off-white rounded-full mb-6 border-2 border-sea-green-darker border-opacity-20">
                        <Building2 className="w-10 h-10 text-sea-green-darker" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-sea-green-darkest mb-3">No organizations found</h3>
                    <p className="text-gray-600">Organizations will appear here once they join the ICAR platform.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {sortedCategories.map(([category, orgs], index) => (
                        <div 
                            key={category}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <LandscapeQuadrant
                                category={category}
                                organizations={orgs}
                                groupingType={groupingType}
                                onViewAll={() => handleViewAll(category, orgs)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Enhanced Summary Stats */}
            <Card className="mt-8 p-6 bg-gradient-to-br from-sea-green-off-white to-white border-sea-green-light">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-sea-green-darkest mb-1">
                            {organizations.length}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            Total Organizations
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-sea-green-darkest mb-1">
                            {sortedCategories.length}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            Active Categories
                        </div>
                    </div>
                    <div className="text-center md:text-left flex items-center justify-center md:justify-start">
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold text-sea-green-darkest">💡 Tip:</span> Click any logo or "View All" to explore organizations
                        </div>
                    </div>
                </div>
            </Card>

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

