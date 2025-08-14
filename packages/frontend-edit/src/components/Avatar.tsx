import styles from "./Avatar.module.css";
import { Link } from "react-router-dom";

interface AvatarProps {
    userLoading: boolean;
    loggedIn: boolean;
    userData: {
        name: string;
        id: number;
    };
}

export default function Avatar({
    userLoading,
    loggedIn,
    userData,
}: AvatarProps) {
    if (!userLoading && loggedIn) {
        const [firstName, lastName] = userData.name.split(" ");
        const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
        return (
            <div className={styles.avatarContainer}>
                <div className={styles.avatar}>{userInitials}</div>
            </div>
        );
    } else {
        return (
            <div>
                <Link to="/login" className="login">
                    Login
                </Link>
            </div>
        );
    }
}
