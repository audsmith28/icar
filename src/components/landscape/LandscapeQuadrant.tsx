'use client';

import React from 'react';
import { Stakeholder } from '@/lib/api/stakeholders';
import { LandscapeLogo } from './LandscapeLogo';
import { ArrowRight, Brain, Building2, MapPin, Target, Heart, Utensils, Users, GraduationCap, Zap, Shield } from 'lucide-react';

interface LandscapeQuadrantProps {
    category: string;
    organizations: Stakeholder[];
    onViewAll: () => void;
    groupingType: 'focus' | 'type' | 'location' | 'national_imperative';
}

// Category icon mapping
const getCategoryIcon = (category: string, groupingType: string) => {
    const categoryLower = category.toLowerCase();
    
    if (groupingType === 'focus') {
        if (categoryLower.includes('mental') || categoryLower.includes('health')) return <Brain className="w-6 h-6" />;
        if (categoryLower.includes('emergency') || categoryLower.includes('response')) return <Shield className="w-6 h-6" />;
        if (categoryLower.includes('food') || categoryLower.includes('security')) return <Utensils className="w-6 h-6" />;
        if (categoryLower.includes('community') || categoryLower.includes('development')) return <Users className="w-6 h-6" />;
        if (categoryLower.includes('education')) return <GraduationCap className="w-6 h-6" />;
        if (categoryLower.includes('family') || categoryLower.includes('support')) return <Heart className="w-6 h-6" />;
        if (categoryLower.includes('technology') || categoryLower.includes('tech')) return <Zap className="w-6 h-6" />;
    }
    
    if (groupingType === 'type') {
        return <Building2 className="w-6 h-6" />;
    }
    
    if (groupingType === 'location') {
        return <MapPin className="w-6 h-6" />;
    }
    
    if (groupingType === 'national_imperative') {
        return <Target className="w-6 h-6" />;
    }
    
    return <Building2 className="w-6 h-6" />;
};

// Category color mapping
const getCategoryColor = (category: string, groupingType: string): string => {
    const categoryLower = category.toLowerCase();
    
    if (groupingType === 'focus') {
        if (categoryLower.includes('mental') || categoryLower.includes('health')) return '#02808b';
        if (categoryLower.includes('emergency') || categoryLower.includes('response')) return '#d95222';
        if (categoryLower.includes('food') || categoryLower.includes('security')) return '#83c5be';
        if (categoryLower.includes('community') || categoryLower.includes('development')) return '#ffddd2';
        if (categoryLower.includes('education')) return '#0284c7';
        if (categoryLower.includes('family') || categoryLower.includes('support')) return '#f43f5e';
        if (categoryLower.includes('technology') || categoryLower.includes('tech')) return '#f59e0b';
    }
    
    // Default colors for other grouping types
    const colors = ['#02808b', '#d95222', '#83c5be', '#ffddd2', '#0284c7', '#0ea5e9'];
    const index = category.charCodeAt(0) % colors.length;
    return colors[index];
};

export function LandscapeQuadrant({ 
    category, 
    organizations, 
    onViewAll,
    groupingType 
}: LandscapeQuadrantProps) {
    const previewCount = 6;
    const previewOrgs = organizations.slice(0, previewCount);
    const remainingCount = organizations.length - previewCount;
    const categoryColor = getCategoryColor(category, groupingType);
    const CategoryIcon = () => getCategoryIcon(category, groupingType);

    return (
        <div 
            className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#02808b] hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            style={{ borderTopColor: `${categoryColor}40`, borderTopWidth: '4px' }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
                    >
                        <CategoryIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-sea-green-darkest line-clamp-1">
                            {category}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {organizations.length} {organizations.length === 1 ? 'organization' : 'organizations'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Grid Preview */}
            <div className="grid grid-cols-3 gap-3 mb-4 flex-1 min-h-[200px]">
                {previewOrgs.map((org) => (
                    <div key={org.id} className="aspect-square flex items-center justify-center">
                        <LandscapeLogo organization={org} showTooltip={true} />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            {organizations.length > previewCount && (
                <button
                    onClick={onViewAll}
                    className="w-full mt-auto px-4 py-2.5 bg-gray-50 hover:bg-sea-green-darker hover:text-white text-gray-700 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                    View All {organizations.length}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            )}
        </div>
    );
}

