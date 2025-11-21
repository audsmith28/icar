import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProjectById } from '@/lib/api/projects';
import { getStakeholderById } from '@/lib/api/stakeholders';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle, Edit } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { OrgLogo } from '@/components/organizations/OrgLogo';
import { ExpressInterestButton } from '@/components/projects/ExpressInterestButton';
import { Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'public';

    // Get project from database
    const project = await getProjectById(id, userRole);

    if (!project) {
        notFound();
    }

    // Get owner organization
    const ownerOrg = await getStakeholderById(project.organization_id, userRole);

    // Transform project data to match the required structure
    const projectData = {
        id: project.id,
        title: project.title,
        owner: project.organization_name,
        description: project.description,
        themes: project.focus_areas || [],
        region: project.location,
        dateRange: {
            start: project.start_date,
            end: project.end_date,
        },
        status: project.status,
        collaborationNeeds: project.collaboration_needs 
            ? project.collaboration_needs.split(',').map(n => n.trim()).filter(n => n.length > 0)
            : ['Volunteer support', 'Resource sharing', 'Coordination'],
        partners: [
            'Community Resilience Center — Haifa',
            'Regional Emergency Coordination Forum',
            'Neighborhood Preparedness Coalition'
        ]
    };

    const canViewCollaboration = userRole === 'org' || userRole === 'funder' || userRole === 'admin';
    const isPublic = userRole === 'public';
    const organizationId = (session?.user as any)?.organizationId;
    const canEdit = userRole === 'admin' || (organizationId && project.organization_id === organizationId);

    // Format dates
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-sea-green-off-white">
            {/* Page Hero Header */}
            <PageHero
                title={project.title}
                description={`${project.organization_name} • ${project.location}`}
                icon={Briefcase}
                variant="compact"
                action={canEdit ? {
                    label: "Edit Project",
                    href: `/projects/${id}/edit`,
                    variant: 'outline'
                } : undefined}
            />

            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Back link */}
                <Link 
                    href="/dashboard/projects" 
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Link>

                {/* Header Section with Status Badge */}
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge 
                            variant={
                                projectData.status === 'Active' ? 'success' : 
                                projectData.status === 'Planning' ? 'warning' : 
                                'default'
                            }
                            className="text-sm font-semibold"
                        >
                            {projectData.status}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-600">
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            <span className="font-medium">{projectData.owner}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>{projectData.region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>
                                {formatDate(projectData.dateRange.start)} - {formatDate(projectData.dateRange.end)}
                            </span>
                        </div>
                    </div>
                </div>
                {ownerOrg && (
                    <OrgLogo orgId={ownerOrg.id} orgName={ownerOrg.name} size="lg" />
                )}

                {/* Themes/Tags */}
                {projectData.themes.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 mb-6">
                        {projectData.themes.map((theme, idx) => (
                            <Badge key={idx} variant="outline" className="bg-slate-50 border-slate-300 text-slate-700">
                                {theme}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Project Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {projectData.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Collaboration Needs */}
                        {canViewCollaboration && projectData.collaborationNeeds.length > 0 && (
                            <Card className="border-2 border-sea-green-darker">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        What this project needs
                                        <Badge variant="outline" className="text-xs">Authenticated</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {projectData.collaborationNeeds.map((need, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-sea-green-darker mt-0.5 shrink-0" />
                                                <span className="text-slate-700">{need}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Partners Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Partners</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {projectData.partners.map((partner, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-10 h-10 rounded-lg bg-sea-green-darker bg-opacity-10 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-sea-green-darker" />
                                            </div>
                                            <span className="font-medium text-slate-900">{partner}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Express Interest CTA */}
                        <Card className="bg-gradient-to-br from-sea-green-off-white to-white border-2 border-sea-green-darker">
                            <CardContent className="pt-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-semibold text-sea-green-darkest mb-2">
                                        Interested in this project?
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Express your interest and connect with the project team.
                                    </p>
                                </div>
                                <ExpressInterestButton
                                    projectTitle={projectData.title}
                                    projectId={projectData.id}
                                    ownerName={projectData.owner}
                                    ownerEmail={ownerOrg?.email}
                                />
                            </CardContent>
                        </Card>

                        {/* Owner Organization Card */}
                        {ownerOrg && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Owner</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4">
                                        <OrgLogo orgId={ownerOrg.id} orgName={ownerOrg.name} size="md" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{ownerOrg.name}</h4>
                                            <p className="text-sm text-slate-600">{ownerOrg.type}</p>
                                        </div>
                                    </div>
                                    <Link href={`/organizations/${ownerOrg.id}`}>
                                        <Button variant="outline" className="w-full">
                                            View Organization Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}

                        {/* Sign in CTA for public users */}
                        {isPublic && (
                            <Card className="bg-blue-50">
                                <CardContent className="pt-6">
                                    <p className="text-sm text-slate-700 mb-3">
                                        Sign in to see collaboration needs and express interest in this project.
                                    </p>
                                    <Link href="/auth/signin">
                                        <Button variant="primary" className="w-full">Sign In</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

