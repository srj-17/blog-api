import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
    variant,
    to,
    type,
    additionalStyles,
    onClick,
    children,
    styleAsLink,
}) {
    if (variant === "link") {
        return (
            <Link
                to={to}
                className={`${additionalStyles} ${styleAsLink ? styles.link : styles.linkButton}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styleAsLink ? styles.link : styles.button} ${additionalStyles}`}
        >
            {children}
        </button>
    );
}
