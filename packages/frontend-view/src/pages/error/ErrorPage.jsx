import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage({ statusCode, message }) {
    return (
        <div className={styles.errorPage}>
            <div className={styles.statusCode}>{statusCode || 404}</div>
            <div className={styles.message}>
                {message || "Requested Page is not available."}
            </div>
            <div className={styles.homeLink}>
                Go to <Link to="/">Home Page</Link>
            </div>
        </div>
    );
}
