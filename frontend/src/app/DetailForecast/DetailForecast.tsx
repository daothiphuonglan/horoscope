import styles from "./DetailForecast.module.css";

interface DetailForecastProps {
  reading: string;
  onBack: () => void;
}

export const DetailForecast: React.FC<DetailForecastProps> = ({ reading, onBack }) => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Kết quả tử vi của bạn</h2>
        <div className={styles.reading}>{reading}</div>
        <button type="button" className={styles.backButton} onClick={onBack}>
          Xem kết quả khác
        </button>
      </div>
    </section>
  );
};
