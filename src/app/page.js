import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/quiz');
  return (
    <div className={styles.page}>
      <h2 className={`${styles.main} ${styles.animation}`}>
        Coming Soon..!!
      </h2>
    </div>
  );
}
