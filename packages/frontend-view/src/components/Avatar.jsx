import styles from "./Avatar.module.css";
import { Link } from "react-router-dom";

export default function Avatar({ userLoading, loggedIn, userData }) {
    if (!userLoading && loggedIn) {
        const [firstName, lastName] = userData.name.split(" ");
        const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
        return (
            <Link to={`/users/${userData.id}`} className={styles.avatar}>
                {userInitials}
            </Link>
        );
    } else {
        return (
            <Link to="/login" className="login">
                Login
            </Link>
        );
    }
}
