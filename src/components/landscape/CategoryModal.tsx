'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Stakeholder } from '@/lib/api/stakeholders';
import { LandscapeLogo } from './LandscapeLogo';
import { Search } from 'lucide-react';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    organizations: Stakeholder[];
}

export function CategoryModal({ isOpen, onClose, category, organizations }: CategoryModalProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrgs = organizations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category}
            subtitle={`${organizations.length} ${organizations.length === 1 ? 'organization' : 'organizations'} in this category`}
            size="xl"
        >
            {/* Search Bar */}
            {organizations.length > 5 && (
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search organizations..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d77]"
                        />
                    </div>
                    {searchQuery && (
                        <p className="mt-2 text-sm text-gray-600">
                            Showing {filteredOrgs.length} of {organizations.length} organizations
                        </p>
                    )}
                </div>
            )}

            {/* Organizations Grid */}
            {filteredOrgs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No organizations found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredOrgs.map((org) => (
                        <div key={org.id} className="aspect-square flex items-center justify-center">
                            <LandscapeLogo organization={org} showTooltip={true} />
                        </div>
                    ))}
                </div>
            )}

            {/* Footer Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                    Click any logo to view organization details
                </p>
            </div>
        </Modal>
    );
}

