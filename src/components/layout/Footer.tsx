import React from 'react';
import styles from './Footer.module.css';
import { Link } from '@/i18n/routing';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>ICAR Collective</h3>
                        <p>Israel's Collective Action for Resilience</p>
                    </div>
                    <div className={styles.links}>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Use</Link>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} ICAR Collective. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
