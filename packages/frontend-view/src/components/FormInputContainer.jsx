import styles from "./FormInputContainer.module.css";

export default function FormInputContainer({ children }) {
    return <div className={styles.formInputContainer}>{children}</div>;
}
