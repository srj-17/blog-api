import { useState, useEffect } from "react";

export function useFetch(url) {
    const [loggedIn, setLoggedIn] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const jwtToken = localStorage.getItem("token");

                if (!jwtToken) {
                    setLoggedIn(false);
                }

                const response = await fetch(url, {
                    cors: true,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                const jsonData = await response.json();

                // 403 = forbidden
                if (response.status >= 400) {
                    // assume forbidden is not an error
                    if (response.status === 403) {
                        localStorage.removeItem("token");
                        setLoggedIn(false);
                    }
                    console.error(jsonData.msg);
                    setError(true);
                }

                setData(jsonData);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setLoading(false);
        }

        getData();
    }, [url]);

    return { loggedIn, data, error, loading, setLoggedIn };
}
