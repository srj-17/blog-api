import { useState, useEffect } from "react";

/*
 ** TODO: "data" is used in many places, and maybe
 ** it's used there with "null" checks. So, I can't
 ** use this now, but need to think of a way to make
 ** type checking of the fetched data work.
 **
 ** It doesn't work now because null isn't assignable to
 ** [] or most other types
 */
export interface FetchedData<FetchedDataType = any> {
    loggedIn: boolean;
    data: FetchedDataType;
    error: boolean;
    loading: boolean;
    setLoggedIn?: (arg: any) => any;
}

export function useFetch(url: string) {
    const [loggedIn, setLoggedIn] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const jwtToken = localStorage.getItem("editToken");

                if (!jwtToken) {
                    setLoggedIn(false);
                }

                const response = await fetch(url, {
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                const jsonData = await response.json();

                // 403 = forbidden
                if (response.status >= 400) {
                    // assume forbidden is not an error
                    if (response.status === 403) {
                        localStorage.removeItem("editToken");
                        setLoggedIn(false);
                    } else {
                        setError(true);
                    }
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
