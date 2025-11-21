import React from 'react';
import { getStakeholders } from '@/lib/api/stakeholders';
import { getProjects } from '@/lib/api/projects';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SimpleBarChart } from '@/components/visualization/SimpleBarChart';
import { Link } from '@/i18n/routing';
import { LandscapeMap } from '@/components/landscape/LandscapeMap';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function EcosystemPage() {
    // Fetch data as public (basic stats only)
    const organizations = await getStakeholders('public');
    const projects = await getProjects('public');

    // Calculate statistics
    const focusAreaCounts: Record<string, number> = {};
    organizations.forEach(org => {
        org.focus.forEach(area => {
            focusAreaCounts[area] = (focusAreaCounts[area] || 0) + 1;
        });
    });

    const typeCounts: Record<string, number> = {};
    organizations.forEach(org => {
        typeCounts[org.type] = (typeCounts[org.type] || 0) + 1;
    });

    const locationCounts: Record<string, number> = {};
    organizations.forEach(org => {
        locationCounts[org.location] = (locationCounts[org.location] || 0) + 1;
    });

    const statusCounts: Record<string, number> = {};
    organizations.forEach(org => {
        statusCounts[org.status] = (statusCounts[org.status] || 0) + 1;
    });

    const projectStatusCounts: Record<string, number> = {};
    projects.forEach(project => {
        projectStatusCounts[project.status] = (projectStatusCounts[project.status] || 0) + 1;
    });

    // Prepare chart data
    const focusAreaData = Object.entries(focusAreaCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([label, value]) => ({ label, value }));

    const typeData = Object.entries(typeCounts)
        .map(([label, value]) => ({ label, value }));

    const locationData = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([label, value]) => ({ label, value }));

    const statusData = Object.entries(statusCounts)
        .map(([label, value]) => ({
            label,
            value,
            color: label === 'Active' ? '#10b981' : '#f59e0b'
        }));

    const projectStatusData = Object.entries(projectStatusCounts)
        .map(([label, value]) => ({
            label,
            value,
            color: label === 'Active' ? '#10b981' : label === 'Planning' ? '#3b82f6' : '#6b7280'
        }));

    return (
        <div className="container py-10">
            <PageHeader
                title="ICAR Ecosystem"
                description="Visualizing the resilience ecosystem across Israel"
            />

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 text-center">
                    <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)]">
                        {organizations.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Organizations</div>
                </Card>
                <Card className="p-6 text-center">
                    <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)]">
                        {projects.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Active Projects</div>
                </Card>
                <Card className="p-6 text-center">
                    <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)]">
                        {Object.keys(focusAreaCounts).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Focus Areas</div>
                </Card>
                <Card className="p-6 text-center">
                    <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)]">
                        {Object.keys(locationCounts).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Locations</div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <SimpleBarChart
                    title="Organizations by Focus Area"
                    data={focusAreaData}
                />
                <SimpleBarChart
                    title="Organizations by Type"
                    data={typeData}
                />
                <SimpleBarChart
                    title="Organizations by Location"
                    data={locationData}
                />
                <SimpleBarChart
                    title="Organization Status"
                    data={statusData}
                />
                <SimpleBarChart
                    title="Project Status"
                    data={projectStatusData}
                />
            </div>

            {/* Ecosystem Map - Categorized Organization Logos */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-[var(--color-sea-green-darkest)] mb-6">
                    Ecosystem Map
                </h2>
                <p className="text-gray-600 mb-6 max-w-3xl">
                    Explore organizations grouped by different dimensions. Use the toggle buttons above to view organizations by focus area, type, location, or national imperatives.
                </p>
                <LandscapeMap organizations={organizations} />
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-[var(--color-off-white-sea-green)] rounded-lg text-center">
                <h3 className="text-xl font-semibold text-[var(--color-sea-green-darkest)] mb-3">
                    Join the ICAR Ecosystem
                </h3>
                <p className="text-gray-700 mb-4">
                    Connect with organizations, discover collaboration opportunities, and strengthen resilience together.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/organizations">
                        <Button variant="secondary" size="md">
                            Explore Organizations
                        </Button>
                    </Link>
                    <Link href="/auth/signin">
                        <Button variant="outline" size="md">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
