import styles from "./UserCard.module.css";
import Button from "#components/Button";

export default function UserCard({ user }) {
    return (
        <div className={styles.userCard}>
            <div className={styles.userName}>
                <div className={styles.nameMeta}>Name:&nbsp;</div>
                {user.firstName} {user.lastName}
            </div>
            <div className={styles.email}>
                <div className={styles.emailMeta}>Email:&nbsp;</div>
                {user.email}
            </div>
            <div className={styles.seeProfileButton}>
                <Button variant="link" to={`/users/${user.id}`}>
                    See profile
                </Button>
            </div>
        </div>
    );
}
