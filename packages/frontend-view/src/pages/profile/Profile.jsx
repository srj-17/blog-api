import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";
import { Link } from "react-router-dom";

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
        return <div> Users </div>;
    }

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : error ? (
                "Error fetching user"
            ) : (
                <div className="user">
                    <div className="name">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            )}
        </div>
    );
}
