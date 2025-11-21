'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function MyOrganizationPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock organization data
    const [formData, setFormData] = useState({
        name: 'Green Horizons Initiative',
        type: 'NGO',
        location: 'Tel Aviv',
        description: 'Promoting sustainable agriculture and environmental resilience in urban areas.',
        focusAreas: ['Climate Adaptation', 'Sustainable Agriculture', 'Urban Resilience'],
        collaborationNeeds: 'Seeking partnerships with tech companies for IoT sensors and data analytics platforms.',
        email: 'contact@greenhorizons.org.il',
        status: 'Active'
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Mock save - in production would call API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="container py-10">
            <PageHeader
                title="My Organization"
                description="Manage your organization profile"
            />

            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Changes saved successfully!</p>
                </div>
            )}

            <div className="max-w-3xl">
                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                                >
                                    <option>NGO</option>
                                    <option>Government</option>
                                    <option>Private Sector</option>
                                    <option>Academic</option>
                                    <option>Community Group</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.focusAreas.map((area, idx) => (
                            <Badge key={idx} variant="secondary">{area}</Badge>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        Contact admin to modify focus areas
                    </p>
                </Card>

                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Collaboration Needs</h3>
                    <textarea
                        value={formData.collaborationNeeds}
                        onChange={(e) => setFormData({ ...formData, collaborationNeeds: e.target.value })}
                        rows={4}
                        placeholder="Describe what kind of partnerships, resources, or support you're seeking..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-sea-green)]"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        This will be visible to authenticated users and funders
                    </p>
                </Card>

                <div className="flex gap-4">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button variant="outline">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
