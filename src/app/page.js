import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h2 className={`${styles.main} ${styles.animation}`}>
        Coming Soon..!!
      </h2>
    </div>
  );
}
