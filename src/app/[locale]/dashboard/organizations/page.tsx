import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/routing';
import { getStakeholders } from '@/lib/api/stakeholders';

export const dynamic = 'force-dynamic';

export default async function StakeholdersPage() {
    const stakeholders = getStakeholders();

    return (
        <div className="container py-10">
            <PageHeader
                title="Stakeholder Directory"
                description="Connect with organizations across the ecosystem"
                action={{ label: 'Add Organization', href: '#' }}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stakeholders.map((stakeholder) => (
                    <Link key={stakeholder.id} href={`/organizations/${stakeholder.id}`}>
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{stakeholder.name}</CardTitle>
                                    <Badge variant={stakeholder.status === 'Active' ? 'success' : 'secondary'}>
                                        {stakeholder.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">{stakeholder.type} • {stakeholder.location}</p>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{stakeholder.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {stakeholder.focus.slice(0, 3).map((area: string) => (
                                        <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
