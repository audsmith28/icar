'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { Map } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import styles from './Navbar.module.css';

export const PublicNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>ICAR</span>
                    <span className={styles.logoSub}>Collective</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/organizations" className={styles.navLink}>Organizations</Link>
                    <Link href="/projects" className={styles.navLink}>Projects</Link>
                    <Link href="/ecosystem" className={styles.navLink}>
                        <Map size={16} className={styles.navIcon} />
                        Ecosystem
                    </Link>
                </div>

                <div className={styles.actions}>
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <Link href="/auth/signin">
                        <Button size="sm">Login</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
