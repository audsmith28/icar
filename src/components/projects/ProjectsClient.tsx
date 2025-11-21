'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { Plus, MapPin, Briefcase } from 'lucide-react';
import { Project } from '@/lib/api/projects';
import { UserRole } from '@/lib/auth';

interface ProjectsClientProps {
    userRole: UserRole;
    isDashboard?: boolean;
    allProjects: Project[];
    opportunities: Project[];
}

export function ProjectsClient({ 
    userRole, 
    isDashboard = false, 
    allProjects,
    opportunities
}: ProjectsClientProps) {
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams?.get('tab');
    // Default to "Seeking Collaboration" to avoid sparse "All Projects" view
    // Only default to "all" if explicitly requested via URL
    const [activeTab, setActiveTab] = useState<'all' | 'seeking-collaboration'>(
        tabFromUrl === 'all' ? 'all' : 'seeking-collaboration'
    );

    useEffect(() => {
        if (tabFromUrl === 'all') {
            setActiveTab('all');
        } else if (tabFromUrl === 'seeking-collaboration') {
            setActiveTab('seeking-collaboration');
        }
    }, [tabFromUrl]);

    const canViewCollaboration = userRole !== 'public';
    const canCreateProject = userRole === 'org' || userRole === 'funder' || userRole === 'admin';

    const displayedProjects = activeTab === 'seeking-collaboration' ? opportunities : allProjects;

    return (
        <div className="min-h-screen bg-sea-green-off-white">
            {/* Page Hero Header */}
            <PageHero
                title="Projects"
                description={
                    activeTab === 'seeking-collaboration'
                        ? "Projects seeking partners, volunteers, and resources"
                        : "All projects in the ICAR ecosystem"
                }
                icon={Briefcase}
                action={canCreateProject ? {
                    label: "Create Project",
                    href: "/projects/new",
                    variant: 'outline'
                } : undefined}
            />

            <div className="container py-10">

                {/* Tabs */}
                <div className="mb-6 border-b border-slate-200">
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                            activeTab === 'all'
                                ? 'border-sea-green-darker text-sea-green-darker'
                                : 'border-transparent text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        All Projects
                        <span className="ml-2 text-xs text-slate-500">
                            ({allProjects.length})
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('seeking-collaboration')}
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                            activeTab === 'seeking-collaboration'
                                ? 'border-[#d95222] text-[#d95222]'
                                : 'border-transparent text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Seeking Collaboration
                        <span className="ml-2 text-xs text-slate-500">
                            ({opportunities.length})
                        </span>
                    </button>
                </div>
            </div>

            {/* Info Banner */}
            {activeTab === 'seeking-collaboration' && (
                <div className="mb-6 p-4 bg-sea-green-off-white border border-sea-green-darker border-opacity-20 rounded-lg">
                    <p className="text-sm text-slate-700">
                        {canViewCollaboration
                            ? `Showing ${opportunities.length} projects that are seeking partners, volunteers, or resources`
                            : 'Sign in to see detailed collaboration needs and connect with organizations'}
                    </p>
                </div>
            )}

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {displayedProjects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-sea-green-darkest mb-1 hover:text-sea-green-darker transition-colors">
                                            {project.title}
                                        </h3>
                                        <Link
                                            href={`/organizations/${project.organization_id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-sea-green-darker hover:underline"
                                        >
                                            {project.organization_name}
                                        </Link>
                                    </div>
                                    <Badge variant={project.status === 'Active' ? 'success' : 'default'}>
                                        {project.status}
                                    </Badge>
                                </div>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.focus_areas?.slice(0, 3).map((area, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {area}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    <MapPin size={14} />
                                    <span className="font-medium">{project.location}</span>
                                    {project.start_date && project.end_date && (
                                        <>
                                            <span>•</span>
                                            <span>{project.start_date} - {project.end_date}</span>
                                        </>
                                    )}
                                </div>

                                {/* Role-gated: Collaboration Needs */}
                                {canViewCollaboration && project.collaboration_needs && (
                                    <div className="mt-4 pt-4 border-t bg-sea-green-off-white -m-6 mt-4 p-4 rounded-b-lg">
                                        <p className="text-xs font-medium text-gray-700 mb-1">Collaboration Needs:</p>
                                        <p className="text-sm text-gray-800 line-clamp-2">{project.collaboration_needs}</p>
                                    </div>
                                )}

                                {/* Public user CTA */}
                                {!canViewCollaboration && activeTab === 'seeking-collaboration' && (
                                    <div className="mt-4 pt-4 border-t">
                                        <Link 
                                            href="/auth/signin" 
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-sea-green-darker hover:underline"
                                        >
                                            Sign in to see collaboration details →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {displayedProjects.length === 0 && (
                <div className="text-center py-16" role="status" aria-live="polite">
                    <div className="max-w-md mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-sea-green-off-white rounded-full mb-6 border-2 border-sea-green-darker border-opacity-20">
                            <Briefcase className="w-10 h-10 text-sea-green-darker" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-sea-green-darkest mb-3">
                            {activeTab === 'seeking-collaboration'
                                ? 'No projects seeking collaboration at this time'
                                : 'No projects found'}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {activeTab === 'seeking-collaboration'
                                ? 'Check back soon or browse all projects to see what organizations are working on.'
                                : 'Projects will appear here as organizations add them to the platform.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {activeTab === 'seeking-collaboration' && (
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className="px-6 py-2.5 bg-sea-green-darker text-white rounded-lg hover:bg-sea-green-darkest transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2"
                                    aria-label="View all projects"
                                >
                                    View all projects
                                </button>
                            )}
                            {activeTab === 'all' && canCreateProject && (
                                <Link href="/projects/new">
                                    <Button variant="primary" className="focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2">
                                        Create Your First Project
                                    </Button>
                                </Link>
                            )}
                            {activeTab === 'all' && !canCreateProject && (
                                <Link href="/auth/signin">
                                    <Button variant="outline" className="focus:outline-none focus:ring-2 focus:ring-sea-green-darker focus:ring-offset-2">
                                        Sign In to Create Project
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

