import styles from "./Loading.module.css";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingCircle}>
                <div className={styles.opaque}></div>
                <div className={styles.transparent}></div>
            </div>
        </div>
    );
}
