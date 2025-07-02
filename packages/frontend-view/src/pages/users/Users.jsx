import { useFetch } from "#utils/fetch";
import UserCard from "./components/UserCard.jsx";
import styles from "./Users.module.css";
import Loading from "#components/Loading";
import UnauthorizedPage from "../unauthorizedPage/UnauthorizedPage";

export default function Users() {
    const userUrl = "http://localhost:3000/users/all";
    const { loggedIn, data: users, error, loading } = useFetch(userUrl);

    if (!loggedIn) {
        return <UnauthorizedPage />;
    }

    if (loading) return <Loading />;
    if (error)
        return (
            <ErrorPage
                message={users.msg || "Error Fetching Users."}
                statusCode={users.statusCode || 404}
            />
        );

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
