import LoginForm from "./components/LoginForm";
import HomeButton from "#components/HomeButton";
import styles from "./Login.module.css";

export default function Login() {
    return (
        <div className={styles.loginFormContainer}>
            <HomeButton />
            <LoginForm />
        </div>
    );
}
