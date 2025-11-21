import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStakeholders, getStakeholderById } from '@/lib/api/stakeholders';
import { getProjects } from '@/lib/api/projects';
import { getOpportunities, type Opportunity } from '@/lib/api/opportunities';
import { Link } from '@/i18n/routing';
import { Building2, Briefcase, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { OrgDashboard } from '@/components/dashboard/OrgDashboard';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    const user = session.user as any;
    const role = user?.role || 'public';
    const organizationId = user?.organizationId;

    // Fetch data
    const organizations = await getStakeholders(role);
    const projects = await getProjects(role);
    const opportunities = await getOpportunities();

    // If user is org/stakeholder and has an organization, show org dashboard
    if ((role === 'org' || role === 'funder') && organizationId) {
        const org = await getStakeholderById(organizationId, role);
        if (org) {
            // Filter projects for this organization
            const userProjects = projects.filter(p => p.organization_id === organizationId);
            
            return (
                <div className="min-h-screen bg-[#fafafa]">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <OrgDashboard 
                            org={org}
                            userProjects={userProjects}
                            allProjects={projects}
                            allOpportunities={opportunities}
                            userRole={role}
                        />
                    </div>
                </div>
            );
        }
    }

    // Admin view (or fallback for org users without organization)
    // Calculate stats
    const stats = {
        organizations: organizations.length,
        projects: projects.length,
        opportunities: opportunities.filter((o: Opportunity) => o.status === 'Open').length,
    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-br from-[#004d57] to-[#02808b]">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-white">
                        Welcome back, {user?.name || 'User'}
                    </h1>
                    <p className="text-lg lg:text-xl text-white">
                        Role: <span className="font-semibold capitalize">{role}</span>
                    </p>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Organizations Stat Card */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-[#e8f4f5] rounded-lg">
                                <Building2 className="w-6 h-6 text-[#02808b]" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-[#004d57] mb-1">
                            {stats.organizations}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                            Organizations
                        </div>
                    </div>

                    {/* Projects Stat Card */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-[#fff4f0] rounded-lg">
                                <TrendingUp className="w-6 h-6 text-[#d95222]" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-[#004d57] mb-1">
                            {stats.projects}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                            Active Projects
                        </div>
                    </div>

                        {/* Projects Stat Card */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#fff4f0] rounded-lg">
                                    <Briefcase className="w-6 h-6 text-[#d95222]" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-[#004d57] mb-1">
                                {stats.opportunities}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                                Projects Seeking Collaboration
                            </div>
                        </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="space-y-6">
                    {/* Organizations Card */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-8">
                            <div className="flex flex-col lg:flex-row items-start gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-[#e8f4f5] rounded-lg">
                                            <Building2 className="w-6 h-6 text-[#02808b]" />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-[#004d57]">
                                            Organizations Directory
                                        </h2>
                                    </div>
                                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                                        Browse and connect with resilience organizations across Israel. Discover their focus areas, locations, and collaboration opportunities.
                                    </p>
                                    <Link href="/dashboard/organizations">
                                        <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                                            Browse Organizations
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="hidden lg:block p-4 bg-[#f0f9fa] rounded-lg">
                                    <Building2 className="w-12 h-12 text-[#02808b]" />
                                </div>
                            </div>
                        </div>
                    </div>

                        {/* Projects Card */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-8">
                                <div className="flex flex-col lg:flex-row items-start gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-[#fff4f0] rounded-lg">
                                                <Briefcase className="w-6 h-6 text-[#d95222]" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-[#004d57]">
                                                Projects
                                            </h2>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                                            Discover projects seeking partners and resources. Find ways to contribute your expertise and drive collective impact.
                                        </p>
                                        <Link href="/dashboard/projects">
                                            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                                                View Projects
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="hidden lg:block p-4 bg-[#fff4f0] rounded-lg">
                                        <Briefcase className="w-12 h-12 text-[#d95222]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ecosystem Card */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-8">
                                <div className="flex flex-col lg:flex-row items-start gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-[#e8f4f5] rounded-lg">
                                                <TrendingUp className="w-6 h-6 text-[#02808b]" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-[#004d57]">
                                                Ecosystem
                                            </h2>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                                            Visualize the resilience ecosystem with interactive charts and organization logos. Understand the ecosystem at a glance.
                                        </p>
                                        <Link href="/ecosystem">
                                            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                                                View Ecosystem
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                </div>
                                <div className="hidden lg:block p-4 bg-[#e8f4f5] rounded-lg">
                                    <TrendingUp className="w-12 h-12 text-[#02808b]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Claims Card (Admin only) */}
                    {role === 'admin' && (
                        <div className="bg-gradient-to-br from-[#004d57] to-[#02808b] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-8 text-white">
                                <div className="flex flex-col lg:flex-row items-start gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-white/20 rounded-lg">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                                Moderate Claims
                                            </h2>
                                        </div>
                                        <p className="text-white/90 mb-6 leading-relaxed text-lg">
                                            Review and approve organization ownership claims. Ensure the integrity of the ICAR directory.
                                        </p>
                                        <Link href="/dashboard/admin/claims">
                                            <Button variant="outline" size="lg" className="inline-flex items-center gap-2 on-dark">
                                                Review Claims
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="hidden lg:block p-4 bg-white/20 rounded-lg">
                                        <CheckCircle className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* My Organization Card (Org role only) */}
                    {role === 'org' && (
                        <div className="bg-gradient-to-br from-[#004d57] to-[#02808b] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-8 text-white">
                                <div className="flex flex-col lg:flex-row items-start gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-white/20 rounded-lg">
                                                <Users className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                                My Organization
                                            </h2>
                                        </div>
                                        <p className="text-white/90 mb-6 leading-relaxed text-lg">
                                            Manage your organization profile, update collaboration needs, and showcase your impact to the ecosystem.
                                        </p>
                                        <Link href="/dashboard/my-organization">
                                            <Button variant="outline" size="lg" className="inline-flex items-center gap-2 on-dark">
                                                Manage Profile
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="hidden lg:block p-4 bg-white/20 rounded-lg">
                                        <Users className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
