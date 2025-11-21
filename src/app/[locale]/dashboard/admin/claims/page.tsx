'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OrganizationClaim } from '@/lib/api/claims';

export default function AdminClaimsPage() {
    const { data: session } = useSession();
    const [claims, setClaims] = useState<OrganizationClaim[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await fetch('/api/claims');
                if (!response.ok) {
                    throw new Error('Failed to fetch claims');
                }
                const data = await response.json();
                setClaims(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load claims');
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`/api/claims/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'approved' }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve claim');
            }

            const updatedClaim = await response.json();
            setClaims(claims.map(claim =>
                claim.id === id ? updatedClaim : claim
            ));
        } catch (err: any) {
            setError(err.message || 'Failed to approve claim');
        }
    };

    const handleReject = async (id: string) => {
        try {
            const response = await fetch(`/api/claims/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' }),
            });

            if (!response.ok) {
                throw new Error('Failed to reject claim');
            }

            const updatedClaim = await response.json();
            setClaims(claims.map(claim =>
                claim.id === id ? updatedClaim : claim
            ));
        } catch (err: any) {
            setError(err.message || 'Failed to reject claim');
        }
    };

    const pendingClaims = claims.filter(c => c.status === 'pending');
    const reviewedClaims = claims.filter(c => c.status !== 'pending');

    if (loading) {
        return (
            <div className="container py-10">
                <p>Loading claims...</p>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <PageHeader
                title="Organization Claims Moderation"
                description="Review and approve organization ownership claims"
            />

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Error: {error}</p>
                </div>
            )}

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
                                    <h3 className="text-lg font-semibold text-[#004d57]">
                                        {claim.organization_name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Claimed by: {claim.claimant_name} ({claim.claimant_email})
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Submitted: {claim.submitted_date}
                                    </p>
                                </div>
                                <Badge variant="warning">Pending</Badge>
                            </div>

                            {claim.notes && (
                                <div className="mb-4 p-3 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Notes:</span> {claim.notes}
                                    </p>
                                </div>
                            )}

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
                                        {claim.organization_name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {claim.claimant_name} ({claim.claimant_email})
                                    </p>
                                    {claim.reviewed_date && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Reviewed: {new Date(claim.reviewed_date).toLocaleDateString()}
                                        </p>
                                    )}
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
