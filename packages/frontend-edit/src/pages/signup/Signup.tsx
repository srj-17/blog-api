import SignupForm from "./components/SignupForm";
import styles from "./Signup.module.css";

export default function Signup() {
    return (
        <div className={styles.signupFormContainer}>
            <SignupForm />
        </div>
    );
}
