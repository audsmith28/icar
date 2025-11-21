'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    LogOut,
    Briefcase,
    Settings,
    Tags
} from 'lucide-react';
import { UserRole } from '@/lib/auth';

interface SidebarProps {
    role?: UserRole;
}

export function Sidebar({ role = 'org' }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname?.includes(path);

    // Core navigation for all authenticated users (MVP only)
    const coreItems = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Organizations', href: '/dashboard/organizations', icon: Users },
        { label: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    ];

    // Org-specific items
    const orgItems = role === 'org' ? [
        { label: 'My Organization', href: '/dashboard/my-organization', icon: Settings },
    ] : [];

    // Admin-only items
    const adminItems = role === 'admin' ? [
        { label: 'Moderate Claims', href: '/dashboard/admin/claims', icon: Users },
        { label: 'Taxonomy', href: '/dashboard/admin/taxonomy', icon: Tags },
    ] : [];

    const items = [...coreItems, ...orgItems, ...adminItems];

    return (
        <aside className="w-64 bg-white border-r h-full flex flex-col">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-[#004d57]">ICAR Platform</h2>
                <p className="text-xs text-gray-500 mt-1">
                    {role === 'admin' && 'Admin'}
                    {role === 'funder' && 'Funder'}
                    {role === 'org' && 'Organization'}
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive(item.href)
                            ? 'bg-[#f0f9fa] text-[#004d57] font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto p-4 border-t">
                <button
                    onClick={() => {/* Sign out logic */ }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
