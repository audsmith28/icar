import React from 'react';
import { Link } from '@/i18n/routing';
import { Building2, Briefcase, BookOpen, ArrowRight, TrendingUp, FileText } from 'lucide-react';
import type { Stakeholder } from '@/lib/api/stakeholders';
import type { Project } from '@/lib/api/projects';
import type { Opportunity } from '@/lib/api/opportunities';

interface OrgDashboardProps {
    org: Stakeholder;
    userProjects: Project[];
    allProjects: Project[];
    allOpportunities: Opportunity[];
    userRole: string;
}

function Card({
    title,
    description,
    primaryAction,
    primaryActionHref,
    children,
}: {
    title: string;
    description?: string;
    primaryAction?: string;
    primaryActionHref?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="rounded-xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-sm text-slate-700">{description}</p>
                    )}
                </div>
                {primaryAction && primaryActionHref && (
                    <Link href={primaryActionHref}>
                        <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-800 hover:bg-slate-50">
                            {primaryAction}
                        </button>
                    </Link>
                )}
            </div>
            {children && <div className="mt-3">{children}</div>}
        </div>
    );
}

export function OrgDashboard({ org, userProjects, allProjects, allOpportunities, userRole }: OrgDashboardProps) {
    // Calculate profile completeness (mock for now)
    const profileCompleteness = org.description ? 85 : 60;
    
    // Calculate stats
    const activeProjects = userProjects.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
    const openOpportunities = allOpportunities.filter(o => o.status === 'Open').length;
    const resourcesShared = 0; // TODO: implement resources count
    
    // Get active projects for this org
    const activeProjectsList = userProjects
        .filter(p => p.status === 'Active' || p.status === 'In Progress')
        .slice(0, 3);
    
    // Get recommended opportunities (filter by region or focus areas)
    const recommendedOpportunities = allOpportunities
        .filter(o => o.status === 'Open')
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Hero section */}
            <section className="rounded-xl bg-[#004d55] px-6 py-5 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
                    Organization dashboard
                </p>
                <h1 className="mt-1 text-2xl font-semibold">
                    Welcome, {org.name}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-teal-100">
                    This space gives your organization a clear view of your collaborations,
                    opportunities, and contributions within the ICAR ecosystem.
                </p>
            </section>

            {/* Stats + profile summary */}
            <section className="grid gap-4 lg:grid-cols-[2fr,1.4fr] mt-6">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Active projects
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-[#004d55]">
                            {activeProjects}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Open opportunities
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-[#004d55]">
                            {openOpportunities}
                        </p>
                    </div>
                    <div className="rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Resources shared
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-[#004d55]">
                            {resourcesShared}
                        </p>
                    </div>
                </div>

                {/* Profile completeness */}
                <div className="rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Your organization profile
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                        Type: <span className="font-medium">{org.type}</span>
                    </p>
                    <p className="text-sm text-slate-700">
                        Primary region: <span className="font-medium">{org.location}</span>
                    </p>
                    <p className="text-sm text-slate-700">
                        Contact: <span className="font-medium">{org.email}</span>
                    </p>
                    <div className="mt-3">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                            Profile completeness
                        </p>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                            <div
                                className="h-2 rounded-full bg-[#e29578]"
                                style={{ width: `${profileCompleteness}%` }}
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-600">
                            {profileCompleteness}% complete. Completing your profile
                            helps ICAR match you with better opportunities.
                        </p>
                        <Link href="/dashboard/my-organization">
                            <button className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200">
                                Update profile
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main grid – projects + opportunities + resources */}
            <section className="grid gap-4 lg:grid-cols-[1.6fr,1.4fr] mt-6">
                {/* Left column */}
                <div className="space-y-4">
                    {/* Active projects */}
                    <Card
                        title="Active collaborations"
                        description="Projects your organization is currently involved in."
                        primaryAction="View all projects"
                        primaryActionHref="/dashboard/opportunities"
                    >
                        {activeProjectsList.length > 0 ? (
                            <ul className="space-y-3 text-sm text-slate-700">
                                {activeProjectsList.map((p) => (
                                    <li
                                        key={p.id}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                                    >
                                        <p className="font-medium text-[#004d55]">{p.title}</p>
                                        <p className="text-xs text-slate-600">
                                            Your role: {p.organization_id === org.id ? 'Lead partner' : 'Participant'} · Status: {p.status}
                                        </p>
                                        {p.collaboration_needs && (
                                            <p className="mt-1 text-xs text-slate-600">
                                                Next step: {p.collaboration_needs.substring(0, 60)}...
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-600">No active projects yet.</p>
                        )}
                    </Card>

                    {/* Opportunities for you */}
                    <Card
                        title="Opportunities that may fit your organization"
                        description="Based on your profile and region."
                        primaryAction="Browse all opportunities"
                        primaryActionHref="/dashboard/opportunities"
                    >
                        {recommendedOpportunities.length > 0 ? (
                            <ul className="space-y-3 text-sm text-slate-700">
                                {recommendedOpportunities.map((o) => (
                                    <li key={o.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                                        <p className="font-medium text-[#004d55]">{o.title}</p>
                                        <p className="text-xs text-slate-600">
                                            {o.location} · {o.type}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-600">
                                            {o.description.substring(0, 80)}...
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-600">No opportunities available at this time.</p>
                        )}
                    </Card>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Resources */}
                    <Card
                        title="Resources for your team"
                        description="A few starting points relevant to your work."
                    >
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>• Community Preparedness Playbook</li>
                            <li>• Volunteer coordination starter kit</li>
                            <li>• Template for joint exercises with municipalities</li>
                        </ul>
                        <Link href="/dashboard/resources">
                            <button className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200">
                                Open resources library
                            </button>
                        </Link>
                    </Card>

                    {/* Support / contact */}
                    <Card
                        title="Need support from ICAR?"
                        description="We can help you clarify opportunities, join projects, or share what you're learning."
                    >
                        <p className="text-sm text-slate-700">
                            Use this space in the future for messages, upcoming convenings,
                            and direct contact with ICAR facilitators.
                        </p>
                        <Link href="/contact">
                            <button className="mt-3 rounded-full bg-[#e29578] px-3 py-1 text-xs font-medium text-white hover:bg-[#d17f63]">
                                Contact ICAR team
                            </button>
                        </Link>
                    </Card>
                </div>
            </section>
        </div>
    );
}

