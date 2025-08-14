import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export interface ButtonProps {
    variant?: string;
    to?: string;
    type?: "button" | "submit" | "reset";
    additionalStyles?: string;
    onClick?: (e: any) => void;
    children?: React.ReactNode;
    styleAsLink?: boolean;
}

export default function Button({
    variant,
    to,
    type,
    additionalStyles,
    onClick,
    children,
    styleAsLink,
}: ButtonProps) {
    if (variant === "link") {
        return (
            <Link
                to={to!}
                className={`${additionalStyles || ""} ${styleAsLink ? styles.link : styles.linkButton}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${
                styleAsLink
                    ? styles.link
                    : variant === "destructive"
                      ? styles.destructiveButton
                      : styles.button
            } ${additionalStyles || ""}`}
        >
            {children}
        </button>
    );
}
