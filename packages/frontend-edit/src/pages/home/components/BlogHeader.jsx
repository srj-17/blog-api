import styles from "./BlogHeader.module.css";
import Button from "#components/Button";
import Avatar from "#components/Avatar";
import { Link } from "react-router-dom";

export default function BlogHeader({
    userLoading,
    loggedIn,
    userData,
    setLoggedIn,
}) {
    function logOutHandler(e) {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <header className={styles.blogHeader}>
            <nav className={styles.navBar}>
                <Link to="http://localhost:5173">View Mode</Link>
                <Link to="/create">Create Blog</Link>
                {/* no need to ask for login because only logged in users should be able to view this */}
                <Button
                    styleAsLink={true}
                    additionalStyles={styles.logOutButton}
                    onClick={logOutHandler}
                >
                    Log Out
                </Button>
                <Avatar
                    userLoading={userLoading}
                    loggedIn={loggedIn}
                    userData={userData}
                />
            </nav>
            <div className={styles.headerTitle}>
                You <br /> Blog
            </div>
        </header>
    );
}
