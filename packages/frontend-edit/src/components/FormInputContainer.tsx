import type { ReactNode } from "react";
import styles from "./FormInputContainer.module.css";

export default function FormInputContainer({
    children,
}: {
    children: ReactNode;
}) {
    return <div className={styles.formInputContainer}>{children}</div>;
}
