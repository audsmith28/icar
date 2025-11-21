import React from 'react';
import { getStakeholders } from '@/lib/api/stakeholders';
import { getProjects } from '@/lib/api/projects';
import { PageHero } from '@/components/ui/PageHero';
import { EcosystemDashboard } from '@/components/visualization/EcosystemDashboard';
import { Link } from '@/i18n/routing';
import { LandscapeMap } from '@/components/landscape/LandscapeMap';
import { Button } from '@/components/ui/Button';
import { TrendingUp, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EcosystemPage() {
    // Fetch data as public (basic stats only)
    const organizations = await getStakeholders('public');
    const projects = await getProjects('public');

    return (
        <div className="min-h-screen bg-sea-green-off-white">
            {/* Page Hero Header - with gap from navbar */}
            <div className="mt-4">
                <PageHero
                    title="ICAR Ecosystem"
                    description="Visualizing the resilience ecosystem across Israel"
                    icon={TrendingUp}
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Enhanced Dashboard - Guidestar Style */}
                <EcosystemDashboard organizations={organizations} projects={projects} />

                {/* Ecosystem Map - Categorized Organization Logos */}
                <div className="mt-16">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-sea-green-darker rounded-lg">
                                <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <h2 className="text-3xl font-bold text-sea-green-darkest">
                                Ecosystem Map
                            </h2>
                        </div>
                        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
                            Explore organizations grouped by different dimensions. Use the toggle buttons to view organizations by focus area, type, location, or national imperatives.
                        </p>
                    </div>
                    <LandscapeMap organizations={organizations} />
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
                    <h3 className="text-xl font-semibold text-sea-green-darkest mb-3">
                        Join the ICAR Ecosystem
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Connect with organizations, discover collaboration opportunities, and strengthen resilience together.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/organizations">
                            <Button variant="primary" size="md">
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
        </div>
    );
}
