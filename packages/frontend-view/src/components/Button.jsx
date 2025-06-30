import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button(props) {
    const { variant } = props;
    if (variant === "link") {
        return (
            <Link className={styles.linkButton} {...props}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    );
}
