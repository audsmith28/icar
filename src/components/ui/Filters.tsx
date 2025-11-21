'use client';

import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterOption {
    value: string;
    label: string;
}

interface FiltersProps {
    types: FilterOption[];
    focusAreas: FilterOption[];
    locations: FilterOption[];
    statuses: FilterOption[];
    selectedType: string;
    selectedFocus: string;
    selectedLocation: string;
    selectedStatus: string;
    onTypeChange: (value: string) => void;
    onFocusChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onClearFilters: () => void;
}

export function Filters({
    types,
    focusAreas,
    locations,
    statuses,
    selectedType,
    selectedFocus,
    selectedLocation,
    selectedStatus,
    onTypeChange,
    onFocusChange,
    onLocationChange,
    onStatusChange,
    onClearFilters,
}: FiltersProps) {
    const hasActiveFilters = selectedType || selectedFocus || selectedLocation || selectedStatus;

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[var(--color-sea-green)]" />
                    <h3 className="text-lg font-semibold text-slate-900">Filter Organizations</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[var(--color-sea-green)] transition-colors font-medium"
                    >
                        <X className="w-4 h-4" />
                        Clear all
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Organization Type
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)] focus:border-transparent bg-white text-slate-900 transition-all"
                    >
                        <option value="">All Types</option>
                        {types.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Focus Area
                    </label>
                    <select
                        value={selectedFocus}
                        onChange={(e) => onFocusChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)] focus:border-transparent bg-white text-slate-900 transition-all"
                    >
                        <option value="">All Focus Areas</option>
                        {focusAreas.map((area) => (
                            <option key={area.value} value={area.value}>
                                {area.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Location
                    </label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => onLocationChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)] focus:border-transparent bg-white text-slate-900 transition-all"
                    >
                        <option value="">All Locations</option>
                        {locations.map((location) => (
                            <option key={location.value} value={location.value}>
                                {location.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)] focus:border-transparent bg-white text-slate-900 transition-all"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-wrap gap-2">
                        {selectedType && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-sea-green)] bg-opacity-10 text-[var(--color-sea-green)] rounded-full text-sm font-medium">
                                Type: {selectedType}
                                <button
                                    onClick={() => onTypeChange('')}
                                    className="hover:bg-[var(--color-sea-green)] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedFocus && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-sea-green)] bg-opacity-10 text-[var(--color-sea-green)] rounded-full text-sm font-medium">
                                Focus: {selectedFocus}
                                <button
                                    onClick={() => onFocusChange('')}
                                    className="hover:bg-[var(--color-sea-green)] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedLocation && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-sea-green)] bg-opacity-10 text-[var(--color-sea-green)] rounded-full text-sm font-medium">
                                Location: {selectedLocation}
                                <button
                                    onClick={() => onLocationChange('')}
                                    className="hover:bg-[var(--color-sea-green)] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedStatus && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-sea-green)] bg-opacity-10 text-[var(--color-sea-green)] rounded-full text-sm font-medium">
                                Status: {selectedStatus}
                                <button
                                    onClick={() => onStatusChange('')}
                                    className="hover:bg-[var(--color-sea-green)] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
