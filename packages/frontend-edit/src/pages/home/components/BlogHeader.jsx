import styles from "./BlogHeader.module.css";
import Button from "#components/Button";
import Avatar from "#components/Avatar";

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
                <Button>Add New Blog</Button>
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
