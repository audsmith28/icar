'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileUpload } from '@/components/organizations/FileUpload';

const ORG_TYPES = ['NGO', 'Government', 'Private Sector', 'Academic', 'Community Group', 'Funder', 'Startup'];
const STATUS_OPTIONS = ['Active', 'Inactive', 'Pending'];

export default function MyOrganizationPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        description: '',
        focusAreas: [] as string[],
        collaborationNeeds: '',
        email: '',
        contact: '',
        status: 'Active',
        contactSetting: 'open' as 'open' | 'via_icar' | 'closed'
    });

    useEffect(() => {
        const fetchOrganization = async () => {
            if (!session) {
                setLoading(false);
                return;
            }

            const organizationId = (session.user as any)?.organizationId;
            if (!organizationId) {
                setError('No organization associated with your account');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/stakeholders/${organizationId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch organization');
                }
                const org = await response.json();
                setFormData({
                    name: org.name || '',
                    type: org.type || '',
                    location: org.location || '',
                    description: org.description || '',
                    focusAreas: org.focus || [],
                    collaborationNeeds: org.collaboration_needs || '',
                    email: org.email || '',
                    contact: org.contact || '',
                    status: org.status || 'Active',
                    contactSetting: org.contact_setting || 'open'
                });
            } catch (err: any) {
                setError(err.message || 'Failed to load organization');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganization();
    }, [session]);

    const handleSave = async () => {
        if (!session) {
            setError('You must be signed in');
            return;
        }

        const organizationId = (session.user as any)?.organizationId;
        if (!organizationId) {
            setError('No organization associated with your account');
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/stakeholders/${organizationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    type: formData.type,
                    location: formData.location,
                    description: formData.description,
                    focus: formData.focusAreas,
                    collaboration_needs: formData.collaborationNeeds,
                    email: formData.email,
                    contact: formData.contact,
                    status: formData.status,
                    contact_setting: formData.contactSetting,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save organization');
            }

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to save organization');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-10">
                <p>Loading organization...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="container py-10">
                <p className="text-red-600">You must be signed in to manage your organization.</p>
            </div>
        );
    }

    const organizationId = (session.user as any)?.organizationId;
    if (!organizationId) {
        return (
            <div className="container py-10">
                <p className="text-red-600">No organization associated with your account. Please contact support.</p>
            </div>
        );
    }

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

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Error: {error}</p>
                </div>
            )}

            <div className="max-w-4xl">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
                                >
                                    {ORG_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.focusAreas.length > 0 ? (
                            formData.focusAreas.map((area, idx) => (
                                <Badge key={idx} variant="secondary">{area}</Badge>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No focus areas set</p>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        Contact admin to modify focus areas
                    </p>
                </Card>

                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Status</h3>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                    >
                        {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </Card>

                <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-2">Contact Settings</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Control how other users can contact your organization
                    </p>
                    <div className="space-y-3">
                        <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="contactSetting"
                                value="open"
                                checked={formData.contactSetting === 'open'}
                                onChange={(e) => setFormData({ ...formData, contactSetting: e.target.value as any })}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-medium text-gray-900">Open</p>
                                <p className="text-sm text-gray-600">Anyone can contact you directly</p>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="contactSetting"
                                value="via_icar"
                                checked={formData.contactSetting === 'via_icar'}
                                onChange={(e) => setFormData({ ...formData, contactSetting: e.target.value as any })}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-medium text-gray-900">Via ICAR</p>
                                <p className="text-sm text-gray-600">Contact requests go through ICAR team</p>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="contactSetting"
                                value="closed"
                                checked={formData.contactSetting === 'closed'}
                                onChange={(e) => setFormData({ ...formData, contactSetting: e.target.value as any })}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-medium text-gray-900">Closed</p>
                                <p className="text-sm text-gray-600">No contact requests accepted</p>
                            </div>
                        </label>
                    </div>
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

                {/* File Uploads */}
                <FileUpload organizationId={organizationId} />

                <div className="flex gap-4">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Link href="/dashboard">
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
