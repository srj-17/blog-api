import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";

export default function Profile() {
    const { userId } = useParams();
    const url = `http://localhost:3000/users/${userId}`;
    const { loggedIn, data: user, error, loading } = useFetch(url);

    if (!loggedIn) {
        return (
            <div>
                You're not logged in. Please <a href="/login">Log In</a> to view
                information.
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
