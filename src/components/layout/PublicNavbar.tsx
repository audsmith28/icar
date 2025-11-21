'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from '../ui/Logo';
import { ChevronDown, Building2, Briefcase } from 'lucide-react';
import styles from './Navbar.module.css';

export const PublicNavbar = () => {
    const [showOrganizationsMenu, setShowOrganizationsMenu] = useState(false);
    const organizationsRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (organizationsRef.current && !organizationsRef.current.contains(event.target as Node)) {
                setShowOrganizationsMenu(false);
            }
        };

        if (showOrganizationsMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOrganizationsMenu]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Logo variant="light" height={40} />

                <div className={styles.links}>
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
                    <Link href="/ecosystem" className={styles.navLink}>
                        Ecosystem
                    </Link>
                </div>

                <div className={styles.actions}>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <Link href="/auth/signin">
                        <Button variant="primary" size="sm">Login</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
