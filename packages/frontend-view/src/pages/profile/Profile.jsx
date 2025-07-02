import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import HomeButton from "#components/HomeButton";
import capitalize from "#utils/capitalize";
import UsersBlogsContainer from "./components/UsersBlogsContainer";
import Separator from "#components/Separator";
import Users from "../users/Users.jsx";

export default function Profile() {
    const { userId } = useParams();
    const url = `http://localhost:3000/users/${userId}`;
    const { loggedIn, data: user, error, loading } = useFetch(url);

    if (!loggedIn) {
        return (
            <div>
                You're not logged in. Please <Link to="/login">Log In</Link> to
                view information.
            </div>
        );
    }

    // request for all users
    if (!userId) {
        return <Users />;
    }

    return (
        <div className={styles.profilePage}>
            {loading ? (
                "Loading..."
            ) : error ? (
                "Error fetching user"
            ) : (
                <div className={styles.firstSection}>
                    <HomeButton className={styles.homeButton} />
                    <div className={styles.profileTitle}>
                        {capitalize(user.firstName)} {capitalize(user.lastName)}
                        's Blogs
                    </div>
                    <Separator />
                    <UsersBlogsContainer blogs={user.posts} />
                </div>
            )}
        </div>
    );
}
