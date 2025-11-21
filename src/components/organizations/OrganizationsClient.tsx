'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SidebarFilters } from '@/components/ui/SidebarFilters';
import { Link } from '@/i18n/routing';
import { Stakeholder } from '@/lib/api/stakeholders';
import { Building2, MapPin, ArrowRight, Users } from 'lucide-react';
import { OrgLogo } from './OrgLogo';
import { NATIONAL_IMPERATIVES } from '@/lib/national-imperatives';

interface OrganizationsClientProps {
    organizations: Stakeholder[];
    userRole?: 'public' | 'org' | 'funder' | 'admin';
}

export function OrganizationsClient({ organizations, userRole = 'public' }: OrganizationsClientProps) {
    const [selectedType, setSelectedType] = useState('');
    const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedNationalImperative, setSelectedNationalImperative] = useState<string[]>([]);

    // Extract unique filter options from data
    const filterOptions = useMemo(() => {
        const types = Array.from(new Set(organizations.map(o => o.type)))
            .map(t => ({ value: t, label: t }));

        const focusAreas = Array.from(
            new Set(organizations.flatMap(o => o.focus))
        ).map(f => ({ value: f, label: f }));

        const locations = Array.from(new Set(organizations.map(o => o.location)))
            .map(l => ({ value: l, label: l }));

        const statuses = Array.from(new Set(organizations.map(o => o.status)))
            .map(s => ({ value: s, label: s }));

        const nationalImperatives = NATIONAL_IMPERATIVES.map(imp => ({ value: imp, label: imp }));

        return { types, focusAreas, locations, statuses, nationalImperatives };
    }, [organizations]);

    // Filter organizations based on selected filters
    const filteredOrganizations = useMemo(() => {
        return organizations.filter(org => {
            // Single-select filters
            if (selectedType && org.type !== selectedType) return false;
            if (selectedStatus && org.status !== selectedStatus) return false;
            
            // Multi-select filters - check if any selected value matches
            if (selectedFocus.length > 0 && !selectedFocus.some(focus => org.focus.includes(focus))) return false;
            if (selectedLocation.length > 0 && !selectedLocation.includes(org.location)) return false;
            if (selectedNationalImperative.length > 0 && (!org.national_imperatives || !selectedNationalImperative.some(imp => org.national_imperatives?.includes(imp)))) return false;
            
            return true;
        });
    }, [organizations, selectedType, selectedFocus, selectedLocation, selectedStatus, selectedNationalImperative]);

    const clearFilters = () => {
        setSelectedType('');
        setSelectedFocus([]);
        setSelectedLocation([]);
        setSelectedStatus('');
        setSelectedNationalImperative([]);
    };

    const hasActiveFilters = selectedType || selectedFocus.length > 0 || selectedLocation.length > 0 || selectedStatus || selectedNationalImperative.length > 0;

    return (
        <div className="min-h-screen bg-sea-green-off-white">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-sea-green-darker bg-opacity-10 rounded-lg">
                            <Building2 className="w-6 h-6 text-sea-green-darker" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Organizations Directory
                        </h1>
                    </div>
                    <p className="text-base text-slate-600 max-w-2xl">
                        Explore resilience organizations across Israel working to strengthen communities and build a more resilient future.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Layout: Sidebar + Results */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <SidebarFilters
                        types={filterOptions.types}
                        focusAreas={filterOptions.focusAreas}
                        locations={filterOptions.locations}
                        statuses={filterOptions.statuses}
                        nationalImperatives={filterOptions.nationalImperatives}
                        selectedType={selectedType}
                        selectedFocus={selectedFocus}
                        selectedLocation={selectedLocation}
                        selectedStatus={selectedStatus}
                        selectedNationalImperative={selectedNationalImperative}
                        onTypeChange={setSelectedType}
                        onFocusChange={setSelectedFocus}
                        onLocationChange={setSelectedLocation}
                        onStatusChange={setSelectedStatus}
                        onNationalImperativeChange={setSelectedNationalImperative}
                        onClearFilters={clearFilters}
                    />

                    {/* Results Section */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-slate-500" />
                                <p className="text-sm font-medium text-slate-700">
                                    {filteredOrganizations.length} {filteredOrganizations.length === 1 ? 'organization' : 'organizations'}
                                    {hasActiveFilters && (
                                        <span className="text-slate-500"> (filtered from {organizations.length})</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Organizations Grid */}
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                    {filteredOrganizations.map((org) => (
                        <Link key={org.id} href={`/organizations/${org.id}`} className="group">
                            <Card className="h-full border border-slate-200 hover:border-sea-green-darker hover:shadow-xl transition-all duration-200 bg-white shadow-md">
                                <div className="p-6">
                                    {/* Card Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <OrgLogo orgId={org.id} orgName={org.name} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sea-green-darker transition-colors line-clamp-2">
                                                    {org.name}
                                                </h3>
                                                <Badge
                                                    variant={org.status === 'Active' ? 'success' : 'default'}
                                                    className="shrink-0"
                                                >
                                                    {org.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Building2 className="w-3.5 h-3.5" />
                                                <span className="font-medium">{org.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                        {org.description}
                                    </p>

                                    {/* Focus Areas */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {org.focus.slice(0, 3).map((area, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="text-xs px-2 py-0.5 bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                                            >
                                                {area}
                                            </Badge>
                                        ))}
                                        {org.focus.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs px-2 py-0.5 bg-slate-50 border-slate-300 text-slate-500"
                                            >
                                                +{org.focus.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{org.location}</span>
                                    </div>

                                    {/* Role-gated preview */}
                                    {userRole !== 'public' && org.collaboration_needs && (
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-xs text-slate-600 line-clamp-2">
                                                <span className="font-semibold text-slate-700">Collaboration:</span>{' '}
                                                {org.collaboration_needs}
                                            </p>
                                        </div>
                                    )}

                                    {/* View Profile CTA */}
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-sm font-medium text-sea-green-darker group-hover:text-sea-green-darkest transition-colors">
                                            View Profile
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-sea-green-darker group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Card>
                            </Link>
                        ))}
                        </div>

                        {/* Empty State */}
                        {filteredOrganizations.length === 0 && (
                            <div className="text-center py-16" role="status" aria-live="polite">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-sea-green-off-white rounded-full mb-6 border-2 border-sea-green-darker border-opacity-20">
                                    <Building2 className="w-10 h-10 text-sea-green-darker" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold text-sea-green-darkest mb-3">
                                    {hasActiveFilters ? 'No organizations match your filters' : 'No organizations available'}
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                                    {hasActiveFilters 
                                        ? 'Try adjusting your search criteria or clearing filters to see more results.'
                                        : 'Organizations will appear here once they join the ICAR platform.'}
                                </p>
                                {hasActiveFilters ? (
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-2.5 bg-sea-green-darker text-white rounded-lg hover:bg-sea-green-darkest transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2"
                                        aria-label="Clear all filters and show all organizations"
                                    >
                                        Clear all filters
                                    </button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link href="/contact">
                                            <button className="px-6 py-2.5 bg-sea-green-darker text-white rounded-lg hover:bg-sea-green-darkest transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2">
                                                Contact Us
                                            </button>
                                        </Link>
                                        <Link href="/about">
                                            <button className="px-6 py-2.5 bg-white border-2 border-sea-green-darker text-sea-green-darker rounded-lg hover:bg-sea-green-off-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
