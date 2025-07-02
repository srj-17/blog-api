import { useFetch } from "#utils/fetch";
import UserCard from "./components/UserCard.jsx";
import styles from "./Users.module.css";
import Loading from "#components/Loading";

export default function Users() {
    const userUrl = "http://localhost:3000/users/all";
    const { loggedIn, data: users, error, loading } = useFetch(userUrl);

    if (!loggedIn) {
        return <div> You must log in to access this page. </div>;
    }

    if (loading) return <Loading />;
    if (error) return <div>Error fetching the users</div>;

    return (
        <div className={styles.usersPage}>
            <div className={styles.title}>Users</div>
            <div className={styles.users}>
                <div className={styles.metadata}>
                    <div className="name">Name</div>
                    <div className="email">Email</div>
                    <div className="profile">Profile</div>
                </div>
                {users.map((user) => {
                    return <UserCard key={user.id} user={user} />;
                })}
            </div>
        </div>
    );
}
