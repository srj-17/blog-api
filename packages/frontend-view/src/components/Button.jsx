import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
    variant,
    to,
    type,
    additionalStyles,
    onClick,
    children,
}) {
    if (variant === "link") {
        return (
            <Link
                to={to}
                className={`${additionalStyles} ${styles.linkButton}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${additionalStyles} ${styles.button}`}
        >
            {children}
        </button>
    );
}
