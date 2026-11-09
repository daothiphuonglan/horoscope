import React from 'react';
import styles from './ServicesSection.module.css';

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
}

const servicesData: ServiceItem[] = [
    {
        id: '01',
        title: 'Natal Chart Readings',
        description:
            'We generate your natal chart and interpret the positions of the planets, signs, and houses to give you insights into your personality, strengths, weaknesses, and life path.',
        imageUrl: '/image/backgroundBanner3.png', // Thay bằng đường dẫn ảnh thực tế của bạn
        imageAlt: 'Natal chart and crystals',
    },
    {
        id: '02',
        title: 'Compatibility Readings',
        description:
            'We can analyze the compatibility between two individuals by comparing their natal charts. This can help people understand their relationships with partners, friends, or family members better.',
        imageUrl: '/image/backgroundBanner2.png',
        imageAlt: 'Crystal ball reading',
    },
    {
        id: '03',
        title: 'Progression Readings',
        description:
            'We provide insights into upcoming planetary transits and progressions that may influence your life events and experiences. It can be useful for timing significant decisions or life changes.',
        imageUrl: '/image/Background.png',
        imageAlt: 'Tarot cards reading',
    },
];

export const ServicesSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header Section */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <span className={styles.subTitle}>SERVICES</span>
                        <h2 className={styles.mainTitle}>
                            Discover <span className={styles.italicHighlight}>Your Path</span> in the Stars with Us
                        </h2>
                    </div>
                    <button className={styles.seeAllBtn}>See All Services</button>
                </div>

                {/* Services List (Z-pattern / Zigzag) */}
                <div className={styles.list}>
                    {servicesData.map((service, index) => {
                        const isReversed = index % 2 !== 0; // Item 02 đảo vị trí ảnh sang trái

                        return (
                            <div
                                key={service.id}
                                className={`${styles.item} ${isReversed ? styles.reversed : ''}`}
                            >
                                {/* Content block */}
                                <div className={styles.contentBlock}>
                                    <div className={styles.idNumber}>{service.id}</div>
                                    <div className={styles.textGroup}>
                                        <h3 className={styles.itemTitle}>{service.title}</h3>
                                        <p className={styles.itemDesc}>{service.description}</p>
                                    </div>
                                </div>

                                {/* Image block */}
                                <div className={styles.imageBlock}>
                                    <img
                                        src={service.imageUrl}
                                        alt={service.imageAlt}
                                        className={styles.image}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;