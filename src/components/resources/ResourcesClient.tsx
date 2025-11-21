'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceCard } from './ResourceCard';
import { Resource } from '@/lib/api/resources';
import { Search, Filter } from 'lucide-react';

export type ResourceCategory = 'all' | 'guide' | 'funding' | 'training' | 'tool' | 'research' | 'legal' | 'tech';

interface ResourcesClientProps {
    resources: Resource[];
}

export function ResourcesClient({ resources }: ResourcesClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    // Get unique types from resources
    const availableTypes = useMemo(() => {
        const types = new Set(resources.map(r => r.type));
        return Array.from(types).sort();
    }, [resources]);

    // Filter resources
    const filteredResources = useMemo(() => {
        let filtered = resources;

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(r => {
                const categoryMap: Record<string, string[]> = {
                    guide: ['Guide', 'guide', 'Document', 'document'],
                    funding: ['Database', 'database', 'Funding', 'funding', 'Grant', 'grant'],
                    training: ['Training', 'training', 'Course', 'course', 'Workshop', 'workshop'],
                    tool: ['Tool', 'tool', 'Template', 'template'],
                    research: ['Research', 'research', 'Report', 'report', 'Study', 'study'],
                    legal: ['Legal', 'legal', 'Compliance', 'compliance'],
                    tech: ['Technology', 'technology', 'Tech', 'tech', 'Software', 'software']
                };
                const categoryTypes = categoryMap[selectedCategory] || [];
                return categoryTypes.some(type => r.type.toLowerCase().includes(type.toLowerCase()));
            });
        }

        // Type filter
        if (selectedType !== 'all') {
            filtered = filtered.filter(r => r.type.toLowerCase() === selectedType.toLowerCase());
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(query) ||
                r.description.toLowerCase().includes(query) ||
                r.author.toLowerCase().includes(query) ||
                r.type.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [resources, selectedCategory, selectedType, searchQuery]);

    const categories: { value: ResourceCategory; label: string; count: number }[] = [
        { value: 'all', label: 'All', count: resources.length },
        { value: 'guide', label: 'Guides', count: resources.filter(r => ['Guide', 'Document'].includes(r.type)).length },
        { value: 'funding', label: 'Funding', count: resources.filter(r => ['Database', 'Funding', 'Grant'].includes(r.type)).length },
        { value: 'training', label: 'Training', count: resources.filter(r => ['Training', 'Course', 'Workshop'].includes(r.type)).length },
        { value: 'tool', label: 'Tools', count: resources.filter(r => ['Tool', 'Template'].includes(r.type)).length },
        { value: 'research', label: 'Research', count: resources.filter(r => ['Research', 'Report', 'Study'].includes(r.type)).length },
        { value: 'legal', label: 'Legal', count: resources.filter(r => ['Legal', 'Compliance'].includes(r.type)).length },
        { value: 'tech', label: 'Technology', count: resources.filter(r => ['Technology', 'Tech', 'Software'].includes(r.type)).length },
    ];

    return (
        <div className="container py-10">
            <PageHeader
                title="Resources"
                description="Tools, guides, and knowledge for the resilience ecosystem"
            />

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search resources..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                                selectedCategory === category.value
                                    ? 'border-[#02808b] text-[#02808b]'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {category.label}
                            <span className="ml-2 text-xs text-gray-500">({category.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Type:</span>
                </div>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                >
                    <option value="all">All Types</option>
                    {availableTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No resources found
                    </h3>
                    <p className="text-gray-600">
                        Try adjusting your search or filters.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            )}

            {/* Results Count */}
            {filteredResources.length > 0 && (
                <div className="mt-8 text-sm text-gray-600 text-center">
                    Showing {filteredResources.length} of {resources.length} resources
                </div>
            )}
        </div>
    );
}

