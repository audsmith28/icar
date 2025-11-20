import React from 'react';
import styles from './Footer.module.css';

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
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} ICAR Collective. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
