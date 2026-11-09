import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <svg
                    className={styles.logoIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                </svg>
                <span className={styles.logoText}>Celestial</span>
            </div>

            {/* Navigation Links */}
            <nav className={styles.nav}>
                <Link href="/" className={`${styles.navLink} ${styles.active}`}>
                    Home
                </Link>
                <Link href="/about" className={styles.navLink}>
                    About Us
                </Link>
                <Link href="/readers" className={styles.navLink}>
                    Readers
                </Link>
                <Link href="/services" className={styles.navLink}>
                    Services <span className={styles.dropdownIcon}>▾</span>
                </Link>
                <Link href="/horoscope" className={styles.navLink}>
                    Horoscope
                </Link>
                <Link href="/blog" className={styles.navLink}>
                    Blog
                </Link>
            </nav>

            {/* Reservation Tab Button */}
            <button className={styles.reservationBtn}>
                <span>Res</span>
                <span>erv</span>
                <span>atio</span>
                <span>n</span>
            </button>
        </header>
    );
};

export default Header;