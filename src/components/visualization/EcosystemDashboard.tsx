'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Building2, Briefcase, MapPin, TrendingUp } from 'lucide-react';
import { IsraelRegionMap } from './IsraelRegionMap';

interface Organization {
    id: string;
    name: string;
    type: string;
    focus: string[];
    location: string;
    status: string;
}

interface Project {
    id: string;
    status: string;
    location: string;
}

interface EcosystemDashboardProps {
    organizations: Organization[];
    projects: Project[];
}

// Israeli regions mapping
const ISRAELI_REGIONS: Record<string, string> = {
    'Tel Aviv': 'Tel Aviv',
    'Jerusalem': 'Jerusalem',
    'Haifa': 'Haifa',
    'Beer Sheva': 'South',
    'South District': 'South',
    'North': 'North',
    'Center': 'Center',
    'West Bank': 'Judea and Samaria',
};

const COLORS = {
    teal: '#02808b',
    orange: '#d95222',
    peach: '#ffb4a0',
    lightTeal: '#83c5be',
    darkTeal: '#004d57',
};

export function EcosystemDashboard({ organizations, projects }: EcosystemDashboardProps) {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedField, setSelectedField] = useState('all');

    // Calculate statistics
    const stats = useMemo(() => {
        const activeOrgs = organizations.filter(org => org.status === 'Active');
        const activeProjects = projects.filter(p => p.status === 'Active');
        
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

        // Regional distribution
        const regionCounts: Record<string, number> = {};
        organizations.forEach(org => {
            const region = ISRAELI_REGIONS[org.location] || org.location || 'Other';
            regionCounts[region] = (regionCounts[region] || 0) + 1;
        });

        // Focus area percentages for pie chart
        const focusAreaPercentages = Object.entries(focusAreaCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([name, value]) => ({
                name,
                value,
                percentage: ((value / organizations.length) * 100).toFixed(1)
            }));

        // Type percentages
        const typePercentages = Object.entries(typeCounts)
            .map(([name, value]) => ({
                name,
                value,
                percentage: Number(((value / organizations.length) * 100).toFixed(1))
            }));

        return {
            totalOrganizations: organizations.length,
            activeOrganizations: activeOrgs.length,
            totalProjects: projects.length,
            activeProjects: activeProjects.length,
            focusAreaCounts,
            typeCounts,
            regionCounts,
            focusAreaPercentages,
            typePercentages,
        };
    }, [organizations, projects]);

    // Prepare chart data
    const focusAreaBarData = Object.entries(stats.focusAreaCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value]) => ({ name, value }));

    const regionBarData = Object.entries(stats.regionCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ name, value }));

    const typePieData = stats.typePercentages.map(item => ({
        name: item.name,
        value: item.value,
    }));

    const focusAreaPieData = stats.focusAreaPercentages.map(item => ({
        name: item.name,
        value: item.value,
    }));

    return (
        <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6 bg-gradient-to-br from-sea-green-darker to-sea-green-darkest text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Building2 className="w-8 h-8 opacity-80" />
                        <span className="text-sm opacity-90">Total</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.totalOrganizations}</div>
                    <div className="text-sm opacity-90">Organizations</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-orange to-orange-hover text-white">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 opacity-80" />
                        <span className="text-sm opacity-90">Active</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.activeOrganizations}</div>
                    <div className="text-sm opacity-90">Active Organizations</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-sea-green-darker to-sea-green-darkest text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Briefcase className="w-8 h-8 opacity-80" />
                        <span className="text-sm opacity-90">Total</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.totalProjects}</div>
                    <div className="text-sm opacity-90">Projects</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-orange to-orange-hover text-white">
                    <div className="flex items-center justify-between mb-2">
                        <MapPin className="w-8 h-8 opacity-80" />
                        <span className="text-sm opacity-90">Regions</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">{Object.keys(stats.regionCounts).length}</div>
                    <div className="text-sm opacity-90">Geographic Areas</div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Interactive Israel Map */}
                <IsraelRegionMap regionData={stats.regionCounts} />

                {/* Middle: Bar Chart - Focus Areas */}
                <Card className="p-6 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-sea-green-darkest mb-1">
                            Organizations by Focus Area
                        </h3>
                        <p className="text-xs text-gray-500">
                            {stats.focusAreaPercentages.length} focus areas represented
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={focusAreaBarData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    width={120}
                                    stroke="#6b7280" 
                                    fontSize={11}
                                    tick={{ fill: '#374151' }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#fff', 
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="value" fill={COLORS.teal} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Summary stats below chart */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Total organizations:</span>
                            <span className="font-semibold text-sea-green-darkest">{stats.totalOrganizations}</span>
                        </div>
                    </div>
                </Card>

                {/* Right: Pie Chart - Organization Types */}
                <Card className="p-6 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-sea-green-darkest mb-1">
                            Organizations by Type
                        </h3>
                        <p className="text-xs text-gray-500">
                            {typePieData.length} organization types
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={typePieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => {
                                        const percentage = ((value / stats.totalOrganizations) * 100).toFixed(1);
                                        return `${name}: ${percentage}%`;
                                    }}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {typePieData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={[COLORS.teal, COLORS.orange, COLORS.peach, COLORS.lightTeal][index % 4]} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#fff', 
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px'
                                    }}
                                    formatter={(value: number, name: string, props: any) => [`${value} (${(props.payload.percent * 100).toFixed(0)}%)`, name]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Breakdown list below chart */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                            {typePieData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: [COLORS.teal, COLORS.orange, COLORS.peach, COLORS.lightTeal][index % 4] }}
                                        />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-sea-green-darkest">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Bottom: Focus Area Percentages with Donut Charts */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-sea-green-darkest mb-4">
                    Active Organizations by Focus Area
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.focusAreaPercentages.slice(0, 8).map((item, index) => (
                        <div key={item.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="relative w-16 h-16">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: item.name, value: item.value },
                                                { name: 'Other', value: stats.totalOrganizations - item.value }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={20}
                                            outerRadius={30}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                        >
                                            <Cell fill={COLORS.teal} />
                                            <Cell fill="#e5e7eb" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-sea-green-darkest">
                                        {item.percentage}%
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    {item.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {item.value} organizations
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

