import React from 'react';
import { Link } from '@/i18n/routing';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './Navbar.module.css';

import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>ICAR</span>
                    <span className={styles.logoSub}>Collective</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/opportunities">Opportunities</Link>
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Search ecosystem..." className={styles.searchInput} />
                    </div>
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
