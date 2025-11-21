'use client';

import React, { useState } from 'react';
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

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>ICAR</span>
                    <span className={styles.logoSub}>Collective</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                    <Link href="/dashboard/organizations" className={styles.navLink}>Organizations</Link>
                    <Link href="/dashboard/opportunities" className={styles.navLink}>Opportunities</Link>
                    <Link href="/landscape" className={styles.navLink}>
                        <Map size={16} className={styles.navIcon} />
                        Map
                    </Link>
                    <Link href="/dashboard/resources" className={styles.navLink}>
                        <BookOpen size={16} className={styles.navIcon} />
                        Resources
                    </Link>
                    {isAdmin && (
                        <Link href="/dashboard/admin/claims" className={styles.navLink}>
                            <ShieldCheck size={16} className={styles.navIcon} />
                            Moderation
                        </Link>
                    )}
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Search ecosystem..." className={styles.searchInput} />
                    </div>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <div className={styles.settingsWrapper}>
                        <button
                            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                            className={styles.settingsButton}
                            aria-label="Settings"
                        >
                            <Settings size={18} />
                        </button>
                        {showSettingsMenu && (
                            <div className={styles.settingsMenu}>
                                <Link href="/dashboard/my-organization" className={styles.settingsMenuItem}>
                                    My Profile
                                </Link>
                                {isAdmin && (
                                    <Link href="/dashboard/admin/settings" className={styles.settingsMenuItem}>
                                        Admin Settings
                                    </Link>
                                )}
                                <Link href="/dashboard/settings" className={styles.settingsMenuItem}>
                                    Preferences
                                </Link>
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
