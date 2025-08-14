import styles from "./FormInputContainer.module.css";
import type { ReactNode } from "react";

export default function FormInputContainer({
    children,
}: {
    children: ReactNode;
}) {
    return <div className={styles.formInputContainer}>{children}</div>;
}
