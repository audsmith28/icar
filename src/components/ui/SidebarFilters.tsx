'use client';

import React, { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
    value: string;
    label: string;
}

interface SidebarFiltersProps {
    types: FilterOption[];
    focusAreas: FilterOption[];
    locations: FilterOption[];
    statuses: FilterOption[];
    nationalImperatives: FilterOption[];
    selectedType: string;
    selectedFocus: string[];
    selectedLocation: string[];
    selectedStatus: string;
    selectedNationalImperative: string[];
    onTypeChange: (value: string) => void;
    onFocusChange: (values: string[]) => void;
    onLocationChange: (values: string[]) => void;
    onStatusChange: (value: string) => void;
    onNationalImperativeChange: (values: string[]) => void;
    onClearFilters: () => void;
}

export function SidebarFilters({
    types,
    focusAreas,
    locations,
    statuses,
    nationalImperatives,
    selectedType,
    selectedFocus,
    selectedLocation,
    selectedStatus,
    selectedNationalImperative,
    onTypeChange,
    onFocusChange,
    onLocationChange,
    onStatusChange,
    onNationalImperativeChange,
    onClearFilters,
}: SidebarFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        focus: true,
        location: true,
        imperative: true,
    });

    const hasActiveFilters = 
        selectedType || 
        selectedFocus.length > 0 || 
        selectedLocation.length > 0 || 
        selectedStatus || 
        selectedNationalImperative.length > 0;

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCheckboxChange = (
        value: string,
        currentValues: string[],
        onChange: (values: string[]) => void
    ) => {
        if (currentValues.includes(value)) {
            onChange(currentValues.filter(v => v !== value));
        } else {
            onChange([...currentValues, value]);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-sea-green-darker" />
                        <span className="font-medium text-slate-900">Filters</span>
                        {hasActiveFilters && (
                            <span className="px-2 py-0.5 bg-sea-green-darker text-white text-xs rounded-full">
                                {[
                                    selectedType ? 1 : 0,
                                    selectedFocus.length,
                                    selectedLocation.length,
                                    selectedStatus ? 1 : 0,
                                    selectedNationalImperative.length
                                ].reduce((a, b) => a + b, 0)}
                            </span>
                        )}
                    </div>
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                </button>
            </div>

            {/* Sidebar Filters */}
            <aside
                className={`
                    ${isOpen ? 'block' : 'hidden'} lg:block
                    w-full lg:w-64 bg-white border border-slate-200 rounded-xl shadow-md p-6
                    lg:sticky lg:top-4 lg:self-start
                    mb-6 lg:mb-0
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-sea-green-darker" />
                        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="flex items-center gap-1 text-sm text-slate-600 hover:text-sea-green-darker transition-colors"
                            title="Clear all filters"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Organization Type - Dropdown (Single Select) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Organization Type
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => onTypeChange(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:border-transparent bg-white text-slate-900 text-sm"
                        >
                            <option value="">All Types</option>
                            {types.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Focus Areas - Checkboxes (Multi-Select) */}
                    <div>
                        <button
                            onClick={() => toggleSection('focus')}
                            className="w-full flex items-center justify-between mb-2"
                        >
                            <label className="text-sm font-medium text-slate-700">
                                Focus Areas
                                {selectedFocus.length > 0 && (
                                    <span className="ml-2 text-xs text-sea-green-darker">
                                        ({selectedFocus.length})
                                    </span>
                                )}
                            </label>
                            {expandedSections.focus ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            )}
                        </button>
                        {expandedSections.focus && (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {focusAreas.map((area) => (
                                    <label
                                        key={area.value}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFocus.includes(area.value)}
                                            onChange={() => handleCheckboxChange(
                                                area.value,
                                                selectedFocus,
                                                onFocusChange
                                            )}
                                            className="w-4 h-4 text-sea-green-darker border-slate-300 rounded focus:ring-sea-green-darker"
                                        />
                                        <span className="text-sm text-slate-700">{area.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location - Checkboxes (Multi-Select) */}
                    <div>
                        <button
                            onClick={() => toggleSection('location')}
                            className="w-full flex items-center justify-between mb-2"
                        >
                            <label className="text-sm font-medium text-slate-700">
                                Location
                                {selectedLocation.length > 0 && (
                                    <span className="ml-2 text-xs text-sea-green-darker">
                                        ({selectedLocation.length})
                                    </span>
                                )}
                            </label>
                            {expandedSections.location ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            )}
                        </button>
                        {expandedSections.location && (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {locations.map((location) => (
                                    <label
                                        key={location.value}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedLocation.includes(location.value)}
                                            onChange={() => handleCheckboxChange(
                                                location.value,
                                                selectedLocation,
                                                onLocationChange
                                            )}
                                            className="w-4 h-4 text-sea-green-darker border-slate-300 rounded focus:ring-sea-green-darker"
                                        />
                                        <span className="text-sm text-slate-700">{location.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status - Dropdown (Single Select) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Status
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => onStatusChange(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b] focus:border-transparent bg-white text-slate-900 text-sm"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* National Imperatives - Checkboxes (Multi-Select) */}
                    {nationalImperatives.length > 0 && (
                        <div>
                            <button
                                onClick={() => toggleSection('imperative')}
                                className="w-full flex items-center justify-between mb-2"
                            >
                                <label className="text-sm font-medium text-slate-700">
                                    National Imperatives
                                    {selectedNationalImperative.length > 0 && (
                                        <span className="ml-2 text-xs text-[#d95222]">
                                            ({selectedNationalImperative.length})
                                        </span>
                                    )}
                                </label>
                                {expandedSections.imperative ? (
                                    <ChevronUp className="w-4 h-4 text-slate-500" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                )}
                            </button>
                            {expandedSections.imperative && (
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {nationalImperatives.map((imperative) => (
                                        <label
                                            key={imperative.value}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedNationalImperative.includes(imperative.value)}
                                                onChange={() => handleCheckboxChange(
                                                    imperative.value,
                                                    selectedNationalImperative,
                                                    onNationalImperativeChange
                                                )}
                                                className="w-4 h-4 text-[#d95222] border-slate-300 rounded focus:ring-[#d95222]"
                                            />
                                            <span className="text-sm text-slate-700">{imperative.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="pt-4 border-t border-slate-200">
                            <p className="text-xs font-medium text-slate-500 mb-2">Active Filters:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedType && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sea-green-darker bg-opacity-10 text-sea-green-darker rounded-full text-xs">
                                        Type: {selectedType}
                                        <button
                                            onClick={() => onTypeChange('')}
                                            className="hover:bg-sea-green-darker hover:bg-opacity-20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedFocus.map(focus => (
                                    <span key={focus} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-xs">
                                        {focus}
                                        <button
                                            onClick={() => onFocusChange(selectedFocus.filter(f => f !== focus))}
                                            className="hover:bg-sea-green-darker hover:bg-opacity-20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                {selectedLocation.map(location => (
                                    <span key={location} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#02808b] bg-opacity-10 text-[#02808b] rounded-full text-xs">
                                        {location}
                                        <button
                                            onClick={() => onLocationChange(selectedLocation.filter(l => l !== location))}
                                            className="hover:bg-sea-green-darker hover:bg-opacity-20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                {selectedStatus && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sea-green-darker bg-opacity-10 text-sea-green-darker rounded-full text-xs">
                                        Status: {selectedStatus}
                                        <button
                                            onClick={() => onStatusChange('')}
                                            className="hover:bg-sea-green-darker hover:bg-opacity-20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedNationalImperative.map(imp => (
                                    <span key={imp} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d95222]/10 text-[#d95222] rounded-full text-xs">
                                        {imp}
                                        <button
                                            onClick={() => onNationalImperativeChange(selectedNationalImperative.filter(i => i !== imp))}
                                            className="hover:bg-[#d95222] hover:bg-opacity-20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

