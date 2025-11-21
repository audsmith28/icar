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
    nationalImperatives?: FilterOption[];
    selectedType: string;
    selectedFocus: string;
    selectedLocation: string;
    selectedStatus: string;
    selectedNationalImperative?: string;
    onTypeChange: (value: string) => void;
    onFocusChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onNationalImperativeChange?: (value: string) => void;
    onClearFilters: () => void;
}

export function Filters({
    types,
    focusAreas,
    locations,
    statuses,
    nationalImperatives = [],
    selectedType,
    selectedFocus,
    selectedLocation,
    selectedStatus,
    selectedNationalImperative = '',
    onTypeChange,
    onFocusChange,
    onLocationChange,
    onStatusChange,
    onNationalImperativeChange,
    onClearFilters,
}: FiltersProps) {
    const hasActiveFilters = selectedType || selectedFocus || selectedLocation || selectedStatus || selectedNationalImperative;

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#02808b]" />
                    <h3 className="text-lg font-semibold text-slate-900">Filter Organizations</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#02808b] transition-colors font-medium"
                    >
                        <X className="w-4 h-4" />
                        Clear all
                    </button>
                )}
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${nationalImperatives.length > 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4`}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Organization Type
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 transition-all"
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
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 transition-all"
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
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 transition-all"
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
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 transition-all"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                {nationalImperatives.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            National Imperative
                        </label>
                        <select
                            value={selectedNationalImperative}
                            onChange={(e) => onNationalImperativeChange?.(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 transition-all"
                        >
                            <option value="">All Imperatives</option>
                            {nationalImperatives.map((imperative) => (
                                <option key={imperative.value} value={imperative.value}>
                                    {imperative.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-wrap gap-2">
                        {selectedType && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-sm font-medium">
                                Type: {selectedType}
                                <button
                                    onClick={() => onTypeChange('')}
                                    className="hover:bg-[#02808b] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedFocus && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-sm font-medium">
                                Focus: {selectedFocus}
                                <button
                                    onClick={() => onFocusChange('')}
                                    className="hover:bg-[#02808b] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedLocation && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-sm font-medium">
                                Location: {selectedLocation}
                                <button
                                    onClick={() => onLocationChange('')}
                                    className="hover:bg-[#02808b] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedStatus && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-sm font-medium">
                                Status: {selectedStatus}
                                <button
                                    onClick={() => onStatusChange('')}
                                    className="hover:bg-[#02808b] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        )}
                        {selectedNationalImperative && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c8573c] bg-opacity-10 text-[#c8573c] rounded-full text-sm font-medium">
                                Imperative: {selectedNationalImperative}
                                <button
                                    onClick={() => onNationalImperativeChange?.('')}
                                    className="hover:bg-[#c8573c] hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
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
