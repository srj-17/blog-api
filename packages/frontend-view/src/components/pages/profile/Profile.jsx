import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function useUser(userId) {
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const jwtToken = localStorage.getItem("token");

                if (!jwtToken) {
                    setLoggedIn(false);
                }

                const userURL = `http://localhost:3000/users/${userId}`;
                const response = await fetch(userURL, {
                    cors: true,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                const jsonData = await response.json();

                // 403 = forbidden
                if (response.status >= 400) {
                    if (response.status === 403) {
                        localStorage.removeItem("token");
                        setLoggedIn(false);
                    }
                    console.error(jsonData.msg);
                    setError(true);
                }

                setUser(jsonData);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setLoading(false);
        }

        getUser();
    }, [userId]);

    return { loggedIn, user, error, loading };
}

export default function Profile() {
    const { userId } = useParams();
    const { loggedIn, user, error, loading } = useUser(userId);

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
