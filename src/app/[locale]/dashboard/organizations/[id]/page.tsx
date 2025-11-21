import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getStakeholderById } from '@/lib/api/stakeholders';
import { notFound } from 'next/navigation';

export default async function StakeholderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const stakeholder = getStakeholderById(id);

    if (!stakeholder) {
        notFound();
    }

    return (
        <div className="container py-10">
            <PageHeader
                title={stakeholder.name}
                description={`${stakeholder.type} • ${stakeholder.location}`}
            />

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">{stakeholder.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Focus Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {stakeholder.focus.map(area => (
                                    <Badge key={area} variant="secondary">{area}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Email</span>
                                <p className="mt-1">{stakeholder.email || stakeholder.contact}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Status</span>
                                <div className="mt-1">
                                    <Badge variant={stakeholder.status === 'Active' ? 'success' : 'warning'}>
                                        {stakeholder.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
