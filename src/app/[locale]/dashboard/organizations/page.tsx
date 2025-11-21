import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStakeholders } from '@/lib/api/stakeholders';
import { OrganizationsClient } from '@/components/organizations/OrganizationsClient';

export const dynamic = 'force-dynamic';

export default async function DashboardOrganizationsPage() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'public';

    try {
        const organizations = await getStakeholders(userRole);

        return <OrganizationsClient organizations={organizations} userRole={userRole} />;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        return (
            <div className="container py-10">
                <p className="text-red-600">Error loading organizations. Please try again later.</p>
            </div>
        );
    }
}
