'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Project } from '@/lib/api/projects';

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

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const { data: session } = useSession();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${projectId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                const data = await response.json();
                setProject(data);
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    status: data.status || 'Planning',
                    focus_areas: data.focus_areas || [],
                    location: data.location || '',
                    start_date: data.start_date || '',
                    end_date: data.end_date || '',
                    collaboration_needs: data.collaboration_needs || '',
                });
            } catch (err: any) {
                setError(err.message || 'Failed to load project');
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

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
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    lat: null,
                    lng: null,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update project');
            }

            setShowSuccess(true);
            setTimeout(() => {
                router.push(`/projects/${projectId}`);
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to update project');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete project');
            }

            router.push('/dashboard/projects');
        } catch (err: any) {
            setError(err.message || 'Failed to delete project');
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-10">
                <p>Loading project...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-10">
                <p className="text-red-600">Project not found.</p>
                <Link href="/dashboard/projects">
                    <Button variant="outline" className="mt-4">Back to Projects</Button>
                </Link>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="container py-10">
                <p className="text-red-600">You must be signed in to edit a project.</p>
                <Link href="/auth/signin">
                    <Button variant="primary" className="mt-4">Sign In</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <Link href={`/projects/${projectId}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
                <ArrowLeft size={16} />
                Back to Project
            </Link>

            <PageHeader
                title="Edit Project"
                description="Update project information"
            />

            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Project updated successfully! Redirecting...</p>
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
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sea-green-darker"
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
                            <textarea
                                value={formData.collaboration_needs}
                                onChange={(e) => setFormData({ ...formData, collaboration_needs: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
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
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isDeleting ? 'Deleting...' : 'Delete Project'}
                        </Button>
                        <Link href={`/projects/${projectId}`}>
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

