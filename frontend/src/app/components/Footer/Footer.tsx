"use client";

import React, { useState } from "react";
import styles from "./Footer.module.css";
import { companyLinks, serviceLinks, contactInfo } from "./footer.config";

export const Footer: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        console.log("Subscribed email:", email);
        setEmail("");
    };

    return (
        <footer className={styles.footer}>
            {/* Hiệu ứng ánh sáng tím ở đáy */}
            <div className={styles.radialGlow} aria-hidden="true" />

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Cột 1: Brand & Socials */}
                    <div className={styles.brandCol}>
                        <div className={styles.logo}>
                            <svg
                                className={styles.logoIcon}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                            <span className={styles.logoText}>Celestial</span>
                        </div>

                        <p className={styles.description}>
                            We help you exploring your cosmic path
                        </p>

                        <div className={styles.socialList}>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className={styles.socialLink}
                            >
                                <svg className={styles.socialIconFb} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className={styles.socialLink}
                            >
                                <svg
                                    className={styles.socialIconIg}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (formerly Twitter)"
                                className={styles.socialLink}
                            >
                                <svg className={styles.socialIconX} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Cột 2: Company */}
                    <div>
                        <h3 className={styles.columnTitle}>Company</h3>
                        <ul className={styles.linkList}>
                            {companyLinks.map((link) => (
                                <li key={link.label} className={styles.linkItem}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3: Services */}
                    <div>
                        <h3 className={styles.columnTitle}>Services</h3>
                        <ul className={styles.linkList}>
                            {serviceLinks.map((link) => (
                                <li key={link.label} className={styles.linkItem}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 4: Contact Us */}
                    <div>
                        <h3 className={styles.columnTitle}>Contact Us</h3>
                        <div className={styles.contactInfo}>
                            <p>
                                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                            </p>
                            <p>
                                <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}>
                                    {contactInfo.phone}
                                </a>
                            </p>
                            <p className={styles.address}>{contactInfo.address}</p>
                        </div>
                    </div>

                    {/* Cột 5: Newsletter */}
                    <div className={styles.newsletterCol}>
                        <h3 className={styles.columnTitle}>Subscribe for any updates</h3>
                        <form onSubmit={handleSubscribe} className={styles.form}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                className={styles.input}
                            />
                            <button type="submit" className={styles.submitBtn}>
                                Sub{"\n"}scr{"\n"}ibe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;