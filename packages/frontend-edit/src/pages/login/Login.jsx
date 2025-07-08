import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    return (
        <div className={styles.loginFormContainer}>
            <Link className={styles.viewLink} to="http://localhost:5173">
                Back to View Mode
            </Link>
            <LoginForm />
        </div>
    );
}
