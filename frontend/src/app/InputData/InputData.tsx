"use client";

import axios from "axios";
import React, { useRef, useState } from "react";
import Input, { InputType } from "../components/Input/Input";
import { DetailForecast } from "../DetailForecast/DetailForecast";
import styles from "./InputData.module.css";

export const InputData: React.FC = () => {
    const lastPayloadRef = useRef("");
    const submittingRef = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reading, setReading] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            name: String(formData.get("name") ?? ""),
            birthDate: String(formData.get("birthDate") ?? ""),
            birthTime: String(formData.get("birthTime") ?? ""),
            birthPlace: String(formData.get("birthPlace") ?? ""),
        };
        const payloadKey = JSON.stringify(data);

        if (submittingRef.current || payloadKey === lastPayloadRef.current) {
            return;
        }

        submittingRef.current = true;
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                "http://localhost:3001/horoscope",
                data,
            );

            lastPayloadRef.current = payloadKey;
            console.log("Horoscope response:", response.data);
            setReading(response.data.reading);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Không thể gửi dữ liệu:",
                    error.response?.data ?? error.message,
                );
            } else {
                console.error("Đã xảy ra lỗi:", error);
            }
        } finally {
            submittingRef.current = false;
            setIsSubmitting(false);
        }


    
    }

    if (reading) {
        return (
            <DetailForecast
                reading={reading}
                onBack={() => {
                    setReading(null);
                    lastPayloadRef.current = "";
                }}
            />
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionIcon}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                        </svg>
                    </div>

                    <h2 className={styles.sectionTitle}>
                        Khám phá bản mệnh
                    </h2>

                    <p className={styles.sectionSubtitle}>
                        Nhập thông tin để xem bản đồ sao của bạn
                    </p>
                </div>

                <form className={styles.fields} onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        label="Tên"
                        placeholder="Nhập tên của bạn"
                        type={InputType.Text}
                        required
                    />

                    <Input
                        name="birthDate"
                        label="Ngày sinh"
                        type={InputType.Date}
                        required
                    />

                    <Input
                        name="birthTime"
                        label="Giờ sinh"
                        type={InputType.Time}
                        required
                    />

                    <Input
                        name="birthPlace"
                        label="Nơi sinh"
                        placeholder="Nhập nơi sinh"
                        type={InputType.Text}
                        required
                    />

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang gửi..." : "Xem kết quả"}
                    </button>
                </form>
            </div>
        </section>
    );
};
