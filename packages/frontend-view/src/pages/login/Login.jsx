import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    return (
        <div className={styles.loginFormContainer}>
            <LoginForm />
        </div>
    );
}
