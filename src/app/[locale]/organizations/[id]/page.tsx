import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getStakeholderById } from '@/lib/api/stakeholders';
import { getProjects } from '@/lib/api/projects';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { OrgLogo } from '@/components/organizations/OrgLogo';
import { ClaimOrgButton } from '@/components/organizations/ClaimOrgButton';

export const dynamic = 'force-dynamic';

export default async function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'public';

    const organization = await getStakeholderById(id, userRole);

    if (!organization) {
        notFound();
    }

    // Get organization's projects (filtered by role)
    const allProjects = await getProjects(userRole);
    const orgProjects = allProjects.filter(p => p.organization_id === id);

    const isPublic = userRole === 'public';
    const canViewBudget = userRole === 'funder' || userRole === 'admin';
    const canViewCollaboration = userRole === 'org' || userRole === 'funder' || userRole === 'admin';

    return (
        <div className="container py-10">
            <Link href="/organizations" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft size={16} />
                Back to Organizations
            </Link>

            <div className="mb-6">
                <div className="flex items-start gap-6">
                    <OrgLogo orgId={organization.id} orgName={organization.name} size="lg" />
                    <div className="flex-1">
                        <PageHeader
                            title={organization.name}
                            description={`${organization.type} • ${organization.location}`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">{organization.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Focus Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {organization.focus.map(area => (
                                    <Badge key={area} variant="secondary">{area}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role-gated: Collaboration Needs */}
                    {canViewCollaboration && organization.collaboration_needs && (
                        <Card className="border-[var(--color-sea-green)] border-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Collaboration Needs
                                    <Badge variant="outline" className="text-xs">Authenticated</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{organization.collaboration_needs}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Organization's Projects */}
                    {orgProjects.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Projects ({orgProjects.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orgProjects.map(project => (
                                        <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-semibold text-[var(--color-sea-green-darkest)]">
                                                    {project.title}
                                                </h4>
                                                <Badge variant={project.status === 'Active' ? 'success' : 'default'}>
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.focus_areas.slice(0, 3).map((area, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">{area}</Badge>
                                                ))}
                                            </div>
                                            {canViewCollaboration && project.collaboration_needs && (
                                                <p className="text-xs text-gray-600 mt-2 pt-2 border-t">
                                                    <span className="font-medium">Needs:</span> {project.collaboration_needs}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Email</span>
                                <p className="mt-1">{organization.email || organization.contact}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Status</span>
                                <div className="mt-1">
                                    <Badge variant={organization.status === 'Active' ? 'success' : 'warning'}>
                                        {organization.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role-gated: Budget */}
                    {canViewBudget && organization.budget && (
                        <Card className="border-[var(--color-sea-green)] border-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Budget
                                    <Badge variant="outline" className="text-xs">Funder/Admin</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-[var(--color-sea-green-darkest)]">
                                    ₪{organization.budget.toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Claim Organization */}
                    <ClaimOrgButton
                        orgId={organization.id}
                        orgName={organization.name}
                        userEmail={session?.user?.email || undefined}
                        userName={session?.user?.name || undefined}
                    />

                    {/* Sign in CTA for public users */}
                    {isPublic && (
                        <Card className="bg-blue-50">
                            <CardContent className="pt-6">
                                <p className="text-sm text-gray-700 mb-3">
                                    Want to see collaboration opportunities and budget details?
                                </p>
                                <Link href="/auth/signin">
                                    <Button className="w-full">Sign In</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
