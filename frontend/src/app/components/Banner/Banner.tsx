"use client";

import React from "react";
import styles from "./Banner.module.css";

// Component vẽ biểu tượng tia sao lấp lánh (Sparkle) 4 cánh
const SparkleIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
    size = 18,
    className,
    style,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={style}
    >
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
);

export const Banner: React.FC = () => {
    return (
        <section className={styles.bannerSection}>
            {/* Lớp màu overlay ánh tím chuyển sắc */}
            <div className={styles.overlay} aria-hidden="true" />

            <div className={styles.contentWrapper}>
                {/* Tiêu đề chính */}
                <h1 className={styles.title}>
                    Unveiling the Universe <br /> Within You[cite: 2]
                </h1>

                {/* Phụ đề */}
                <p className={styles.subtitle}>
                    Celestial helps you exploring your cosmic path[cite: 2]
                </p>

                {/* Nút hành động */}
                <div className={styles.actionGroup}>
                    {/* Nút xanh dạ quang chia 3 dòng */}
                    <button type="button" className={styles.btnPrimary}>
                        Boo{"\n"}k a{"\n"}Ses{"\n"}sion[cite: 2]
                    </button>

                    {/* Nút outline Weekly Horoscope */}
                    <button type="button" className={styles.btnSecondary}>
                        Weekly Horoscope[cite: 2]
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;