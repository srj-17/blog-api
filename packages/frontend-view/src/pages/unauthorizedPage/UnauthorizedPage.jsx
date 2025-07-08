import styles from "./UnauthorizedPage.module.css";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
    return (
        <div className={styles.unauthorizedPage}>
            <div className={styles.statusCode}>403</div>
            <div className={styles.message}>
                You are not allowed to view this page.
            </div>
            <div className={styles.homeLink}>
                <Link to="/login">Log In</Link> to view.
            </div>
        </div>
    );
}
