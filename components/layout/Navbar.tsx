import React from 'react';
import Link from 'next/link';
import { Search, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './Navbar.module.css';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>ICAR</span>
                    <span className={styles.logoSub}>Collective</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/stakeholders">Stakeholders</Link>
                    <Link href="/opportunities">Opportunities</Link>
                    <Link href="/about">About</Link>
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Search ecosystem..." className={styles.searchInput} />
                    </div>
                    <Button variant="outline" size="sm">
                        <Globe size={16} />
                        <span style={{ marginLeft: '4px' }}>EN</span>
                    </Button>
                    <Button size="sm">Login</Button>
                </div>
            </div>
        </nav>
    );
};
