'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Save } from 'lucide-react';

const FOCUS_AREAS = [
    'Mental Health',
    'Emergency Response',
    'Family Support',
    'Trauma Recovery',
    'Community Resilience',
    'Youth Programs',
    'Elderly Care',
    'Disability Support',
    'Education',
    'Research',
];

const STATUS_OPTIONS = ['Planning', 'Active', 'Completed', 'On Hold'];

export default function NewProjectPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Planning',
        focus_areas: [] as string[],
        location: '',
        start_date: '',
        end_date: '',
        collaboration_needs: '',
    });

    const handleFocusAreaToggle = (area: string) => {
        setFormData(prev => ({
            ...prev,
            focus_areas: prev.focus_areas.includes(area)
                ? prev.focus_areas.filter(a => a !== area)
                : [...prev.focus_areas, area]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    lat: 0,
                    lng: 0,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create project');
            }

            const project = await response.json();
            setShowSuccess(true);
            setTimeout(() => {
                router.push(`/projects/${project.id}`);
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to create project');
        } finally {
            setIsSaving(false);
        }
    };

    if (!session) {
        return (
            <div className="container py-10">
                <p className="text-red-600">You must be signed in to create a project.</p>
                <Link href="/auth/signin">
                    <Button variant="primary" className="mt-4">Sign In</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-10">
                <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
                    <ArrowLeft size={16} />
                    Back to Projects
                </Link>

            <PageHeader
                title="Create New Project"
                description="Add a new project or collaboration opportunity to the ICAR platform"
            />

            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Project created successfully! Redirecting...</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Error: {error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="max-w-4xl space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Project Title *
                                </label>
                                <Input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="e.g., Mental Health Support for Displaced Families"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                                    placeholder="Describe the project, its goals, and impact..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Status *
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                                    >
                                        {STATUS_OPTIONS.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Location *
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        placeholder="e.g., Tel Aviv, Jerusalem, Haifa"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Focus Areas */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Focus Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 mb-4">
                                Select the focus areas that best describe this project:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {FOCUS_AREAS.map(area => (
                                    <button
                                        key={area}
                                        type="button"
                                        onClick={() => handleFocusAreaToggle(area)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            formData.focus_areas.includes(area)
                                                ? 'bg-[#02808b] text-white'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dates */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Collaboration Needs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Collaboration Needs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 mb-4">
                                What does this project need? (e.g., volunteers, funding, partners, resources)
                            </p>
                            <textarea
                                value={formData.collaboration_needs}
                                onChange={(e) => setFormData({ ...formData, collaboration_needs: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                                placeholder="List specific needs, separated by commas..."
                            />
                        </CardContent>
                    </Card>


                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSaving}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? 'Creating...' : 'Create Project'}
                        </Button>
                        <Link href="/dashboard/projects">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

