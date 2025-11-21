import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getProjects } from '@/lib/api/projects';
import { Link } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

export default async function OpportunitiesPage() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'public';

    try {
        // Get all projects with role-based filtering
        const allProjects = await getProjects(userRole);

        // Filter to only projects with collaboration needs
        const projectsWithNeeds = allProjects.filter(p => p.collaboration_needs);

        const canViewCollaboration = userRole !== 'public';

        return (
            <div className="container py-10">
                <PageHeader
                    title="Collaboration Opportunities"
                    description="Discover projects seeking partners, volunteers, and resources"
                />

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                        {canViewCollaboration
                            ? `Showing ${projectsWithNeeds.length} projects with collaboration opportunities`
                            : 'Sign in to see detailed collaboration needs and connect with organizations'}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {projectsWithNeeds.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-[#004d55] mb-1 hover:text-[#006d77] transition-colors">
                                                {project.title}
                                            </h3>
                                        <Link
                                            href={`/organizations/${project.organization_id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-[#006d77] hover:underline"
                                        >
                                            {project.organization_name}
                                        </Link>
                                    </div>
                                    <Badge variant={project.status === 'Active' ? 'success' : 'default'}>
                                        {project.status}
                                    </Badge>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.focus_areas.slice(0, 3).map((area, idx) => (
                                        <Badge key={idx} variant="outline">{area}</Badge>
                                    ))}
                                </div>

                                <div className="text-xs text-gray-500 mb-3">
                                    <span className="font-medium">{project.location}</span>
                                    {project.start_date && project.end_date && (
                                        <span> • {project.start_date} - {project.end_date}</span>
                                    )}
                                </div>

                                {/* Role-gated: Collaboration Needs */}
                                {canViewCollaboration && project.collaboration_needs && (
                                    <div className="mt-4 pt-4 border-t bg-[#f0f9fa] -m-6 mt-4 p-4 rounded-b-lg">
                                        <p className="text-xs font-medium text-gray-700 mb-1">Collaboration Needs:</p>
                                        <p className="text-sm text-gray-800">{project.collaboration_needs}</p>
                                    </div>
                                )}

                                {/* Public user CTA */}
                                {!canViewCollaboration && (
                                    <div className="mt-4 pt-4 border-t">
                                        <Link 
                                            href="/auth/signin" 
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-[#006d77] hover:underline"
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

                {projectsWithNeeds.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No collaboration opportunities available at this time.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching opportunities:', error);
        return (
            <div className="container py-10">
                <p className="text-red-600">Error loading opportunities. Please try again later.</p>
            </div>
        );
    }
}
