import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { getStakeholders } from '@/lib/api/stakeholders';
import { getOpportunities } from '@/lib/api/opportunities';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
    const stakeholders = getStakeholders();
    const opportunities = getOpportunities();

    const stats = {
        stakeholders: stakeholders.length,
        opportunities: opportunities.filter(o => o.status === 'Open').length,
        activeOrganizations: stakeholders.filter(s => s.status === 'Active').length,
    };

    return (
        <div className="container py-10">
            <PageHeader
                title="About ICAR"
                description="Israel's Collective Action for Resilience"
            />

            <div className="space-y-8">
                {/* Mission & Vision */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                To connect stakeholders, map opportunities, and foster collaboration for a stronger,
                                more resilient ecosystem in Israel. We bridge the gap between NGOs, government bodies,
                                volunteers, and communities to address national challenges together.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                A unified platform where NGOs, government bodies, and volunteers can seamlessly
                                coordinate efforts to address national challenges. We envision a future where
                                collective action is effortless, transparent, and impactful.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Platform Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)] mb-2">
                                    {stats.stakeholders}
                                </div>
                                <div className="text-sm text-gray-600">Active Stakeholders</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)] mb-2">
                                    {stats.opportunities}
                                </div>
                                <div className="text-sm text-gray-600">Open Opportunities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[var(--color-sea-green-darkest)] mb-2">
                                    {stats.activeOrganizations}
                                </div>
                                <div className="text-sm text-gray-600">Active Organizations</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Features */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-[var(--color-sea-green-darker)]">Key Features</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Stakeholder Directory</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Discover and connect with organizations across the ecosystem.
                                </p>
                                <Link href="/organizations">
                                    <Button variant="primary">Explore Directory</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Opportunity Explorer</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Find ways to contribute and collaborate on meaningful projects.
                                </p>
                                <Link href="/projects">
                                    <Button variant="outline" size="sm">View Opportunities</Button>
                                </Link>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">Ecosystem Map</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Visualize stakeholders and opportunities geographically.
                                </p>
                                <Link href="/map">
                                    <Button variant="outline" size="sm">Open Map</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-[var(--color-off-white-sea-green)] to-white">
                    <CardContent className="pt-6 text-center">
                        <h3 className="text-xl font-semibold mb-2">Ready to Get Involved?</h3>
                        <p className="text-gray-600 mb-6">
                            Join the ICAR platform and start making a difference today.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/organizations">
                                <Button>Explore Stakeholders</Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline">Contact Us</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
