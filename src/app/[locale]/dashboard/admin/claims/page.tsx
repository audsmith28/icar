'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Claim {
    id: string;
    organizationName: string;
    claimantName: string;
    claimantEmail: string;
    submittedDate: string;
    status: 'pending' | 'approved' | 'rejected';
    notes: string;
}

export default function AdminClaimsPage() {
    const [claims, setClaims] = useState<Claim[]>([
        {
            id: '1',
            organizationName: 'Tech for Good Israel',
            claimantName: 'Sarah Cohen',
            claimantEmail: 'sarah@techforgood.org.il',
            submittedDate: '2024-01-15',
            status: 'pending',
            notes: 'I am the Executive Director of this organization.'
        },
        {
            id: '2',
            organizationName: 'Community Resilience Network',
            claimantName: 'David Levi',
            claimantEmail: 'david@crn.org.il',
            submittedDate: '2024-01-14',
            status: 'pending',
            notes: 'Founder and CEO. Can provide documentation.'
        },
        {
            id: '3',
            organizationName: 'Green Horizons Initiative',
            claimantName: 'Rachel Goldstein',
            claimantEmail: 'rachel@greenhorizons.org.il',
            submittedDate: '2024-01-12',
            status: 'approved',
            notes: 'Program Director with authorization letter.'
        }
    ]);

    const handleApprove = (id: string) => {
        setClaims(claims.map(claim =>
            claim.id === id ? { ...claim, status: 'approved' as const } : claim
        ));
    };

    const handleReject = (id: string) => {
        setClaims(claims.map(claim =>
            claim.id === id ? { ...claim, status: 'rejected' as const } : claim
        ));
    };

    const pendingClaims = claims.filter(c => c.status === 'pending');
    const reviewedClaims = claims.filter(c => c.status !== 'pending');

    return (
        <div className="container py-10">
            <PageHeader
                title="Organization Claims Moderation"
                description="Review and approve organization ownership claims"
            />

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    <span className="font-medium">{pendingClaims.length}</span> pending claims awaiting review
                </p>
            </div>

            {/* Pending Claims */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pending Claims</h2>
                <div className="space-y-4">
                    {pendingClaims.map((claim) => (
                        <Card key={claim.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-[var(--color-sea-green-darkest)]">
                                        {claim.organizationName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Claimed by: {claim.claimantName} ({claim.claimantEmail})
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Submitted: {claim.submittedDate}
                                    </p>
                                </div>
                                <Badge variant="warning">Pending</Badge>
                            </div>

                            <div className="mb-4 p-3 bg-gray-50 rounded">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Notes:</span> {claim.notes}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleApprove(claim.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Approve Claim
                                </Button>
                                <Button
                                    onClick={() => handleReject(claim.id)}
                                    variant="outline"
                                    className="border-red-600 text-red-600 hover:bg-red-50"
                                >
                                    Reject Claim
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {pendingClaims.length === 0 && (
                        <Card className="p-6 text-center text-gray-500">
                            No pending claims at this time
                        </Card>
                    )}
                </div>
            </div>

            {/* Reviewed Claims */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recently Reviewed</h2>
                <div className="space-y-4">
                    {reviewedClaims.map((claim) => (
                        <Card key={claim.id} className="p-6 opacity-75">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {claim.organizationName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {claim.claimantName} ({claim.claimantEmail})
                                    </p>
                                </div>
                                <Badge variant={claim.status === 'approved' ? 'success' : 'default'}>
                                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
