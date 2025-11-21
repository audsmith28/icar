'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { Search, Settings, Map, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role || 'public';
    const isAdmin = userRole === 'admin';
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    // Close settings menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettingsMenu(false);
            }
        };

        if (showSettingsMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSettingsMenu]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>ICAR</span>
                    <span className={styles.logoSub}>Collective</span>
                </Link>

                <div className={styles.links}>
                    {/* Standardized navigation - same labels for all authenticated users */}
                    {session ? (
                        <>
                            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                            <Link href="/dashboard/organizations" className={styles.navLink}>Organizations</Link>
                            <Link href="/dashboard/projects" className={styles.navLink}>Projects</Link>
                            <Link href="/ecosystem" className={styles.navLink}>
                                <Map size={16} className={styles.navIcon} />
                                Ecosystem
                            </Link>
                        </>
                    ) : (
                        // Public navigation
                        <>
                            <Link href="/organizations" className={styles.navLink}>Organizations</Link>
                            <Link href="/projects" className={styles.navLink}>Projects</Link>
                            <Link href="/ecosystem" className={styles.navLink}>
                                <Map size={16} className={styles.navIcon} />
                                Ecosystem
                            </Link>
                        </>
                    )}
                </div>

                <div className={styles.actions}>
                    <form 
                        action="/search" 
                        method="get"
                        className={styles.searchWrapper}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const input = form.querySelector('input') as HTMLInputElement;
                            if (input?.value.trim()) {
                                window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                            }
                        }}
                    >
                        <Search size={18} className={styles.searchIcon} />
                        <input 
                            type="text" 
                            name="q"
                            placeholder="Search ecosystem..." 
                            className={styles.searchInput}
                            aria-label="Search organizations and projects"
                        />
                    </form>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <div className={styles.settingsWrapper} ref={settingsRef}>
                        <button
                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                            className={styles.settingsButton}
                            aria-label="Settings"
                        >
                            <Settings size={18} />
                        </button>
                            {showSettingsMenu && (
                                <div className={styles.settingsMenu}>
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
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                    {!session && (
                        <Button size="sm" asChild>
                            <Link href="/auth/signin">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};
