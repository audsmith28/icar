'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { Search, Settings, BookOpen, ShieldCheck, LogOut, ChevronDown, Building2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from '../ui/Logo';

export const Navbar = () => {
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role || 'public';
    const isAdmin = userRole === 'admin';
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showOrganizationsMenu, setShowOrganizationsMenu] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);
    const organizationsRef = useRef<HTMLDivElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettingsMenu(false);
            }
            if (organizationsRef.current && !organizationsRef.current.contains(event.target as Node)) {
                setShowOrganizationsMenu(false);
            }
        };

        if (showSettingsMenu || showOrganizationsMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSettingsMenu, showOrganizationsMenu]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Logo variant="light" height={40} />

                <div className={styles.links}>
                    {/* Standardized navigation - same labels for all authenticated users */}
                    {session ? (
                        <>
                            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                            <div className={styles.dropdownWrapper} ref={organizationsRef}>
                                <button
                                    onClick={() => setShowOrganizationsMenu(!showOrganizationsMenu)}
                                    className={styles.navLink}
                                    aria-expanded={showOrganizationsMenu}
                                    aria-haspopup="true"
                                    aria-label="Organizations menu"
                                >
                                    Organizations
                                    <ChevronDown 
                                        size={16} 
                                        className={styles.chevron}
                                        style={{ transform: showOrganizationsMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        aria-hidden="true"
                                    />
                                </button>
                                {showOrganizationsMenu && (
                                    <div 
                                        className={styles.dropdownMenu}
                                        role="menu"
                                        aria-label="Organizations menu"
                                    >
                                        <Link 
                                            href="/dashboard/organizations" 
                                            className={styles.dropdownMenuItem}
                                            role="menuitem"
                                            onClick={() => setShowOrganizationsMenu(false)}
                                            style={{ color: '#212529' }}
                                        >
                                            <Building2 size={16} className="mr-2" style={{ color: '#02808b' }} aria-hidden="true" />
                                            <span>All Organizations</span>
                                        </Link>
                                        <Link 
                                            href="/dashboard/projects" 
                                            className={styles.dropdownMenuItem}
                                            role="menuitem"
                                            onClick={() => setShowOrganizationsMenu(false)}
                                            style={{ color: '#212529' }}
                                        >
                                            <Briefcase size={16} className="mr-2" style={{ color: '#02808b' }} aria-hidden="true" />
                                            <span>Projects</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link href="/ecosystem" className={styles.navLink}>Ecosystem</Link>
                        </>
                    ) : (
                        // Public navigation
                        <>
                            <div className={styles.dropdownWrapper} ref={organizationsRef}>
                                <button
                                    onClick={() => setShowOrganizationsMenu(!showOrganizationsMenu)}
                                    className={styles.navLink}
                                    aria-expanded={showOrganizationsMenu}
                                    aria-haspopup="true"
                                    aria-label="Organizations menu"
                                >
                                    Organizations
                                    <ChevronDown 
                                        size={16} 
                                        className={styles.chevron}
                                        style={{ transform: showOrganizationsMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        aria-hidden="true"
                                    />
                                </button>
                                {showOrganizationsMenu && (
                                    <div 
                                        className={styles.dropdownMenu}
                                        role="menu"
                                        aria-label="Organizations menu"
                                    >
                                        <Link 
                                            href="/organizations" 
                                            className={styles.dropdownMenuItem}
                                            role="menuitem"
                                            onClick={() => setShowOrganizationsMenu(false)}
                                            style={{ color: '#212529' }}
                                        >
                                            <Building2 size={16} className="mr-2" style={{ color: '#02808b' }} aria-hidden="true" />
                                            <span>All Organizations</span>
                                        </Link>
                                        <Link 
                                            href="/projects" 
                                            className={styles.dropdownMenuItem}
                                            role="menuitem"
                                            onClick={() => setShowOrganizationsMenu(false)}
                                            style={{ color: '#212529' }}
                                        >
                                            <Briefcase size={16} className="mr-2" style={{ color: '#02808b' }} aria-hidden="true" />
                                            <span>Projects</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link href="/ecosystem" className={styles.navLink}>Ecosystem</Link>
                        </>
                    )}
                </div>

                <div className={styles.actions}>
                    <form 
                        action="/search" 
                        method="get"
                        className={styles.searchWrapper}
                        role="search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const input = form.querySelector('input') as HTMLInputElement;
                            if (input?.value.trim()) {
                                window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                            }
                        }}
                    >
                        <Search size={18} className={styles.searchIcon} aria-hidden="true" />
                        <input 
                            type="text" 
                            name="q"
                            placeholder="Search ecosystem..." 
                            className={styles.searchInput}
                            aria-label="Search organizations and projects"
                            aria-describedby="search-description"
                        />
                        <span id="search-description" className="sr-only">Search for organizations and projects in the ICAR ecosystem</span>
                    </form>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <div className={styles.settingsWrapper} ref={settingsRef}>
                        <button
                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                            className={styles.settingsButton}
                            aria-label="Settings menu"
                            aria-expanded={showSettingsMenu}
                            aria-haspopup="true"
                        >
                            <Settings size={18} aria-hidden="true" />
                        </button>
                            {showSettingsMenu && (
                                <div 
                                    className={styles.settingsMenu}
                                    role="menu"
                                    aria-label="Settings menu"
                                >
                                    {session && (
                                        <>
                                            <Link href="/dashboard/resources" className={styles.settingsMenuItem}>
                                                <BookOpen size={16} className="mr-2" />
                                                Resources
                                            </Link>
                                            {(userRole === 'org' || userRole === 'funder') && (
                                                <Link href="/dashboard/my-organization" className={styles.settingsMenuItem}>
                                                    My Organization
                                                </Link>
                                            )}
                                            {isAdmin && (
                                                <>
                                                    <Link href="/dashboard/admin/claims" className={styles.settingsMenuItem}>
                                                        <ShieldCheck size={16} className="mr-2" />
                                                        Moderation
                                                    </Link>
                                                    <Link href="/dashboard/admin/settings" className={styles.settingsMenuItem}>
                                                        Admin Settings
                                                    </Link>
                                                </>
                                            )}
                                            <Link href="/dashboard/settings" className={styles.settingsMenuItem}>
                                                Preferences
                                            </Link>
                                            <div className="border-t border-slate-200 my-2"></div>
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className={`${styles.settingsMenuItem} w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700`}
                                                role="menuitem"
                                                aria-label="Sign out of your account"
                                            >
                                                <LogOut size={16} className="mr-2" aria-hidden="true" />
                                                Sign Out
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                    {!session && (
                        <Button variant="primary" size="sm" asChild>
                            <Link href="/auth/signin">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};
