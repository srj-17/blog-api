import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormInputContainer from "../../FormInputContainer";

export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseJson, setResponseJson] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginUrl = "http://localhost:3000/login";
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            async function login() {
                try {
                    const response = await fetch(loginUrl, {
                        method: "POST",
                        cors: true,
                        body: JSON.stringify(userInfo),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const jsonData = await response.json();

                    if (response.status >= 400) {
                        setFetchError(jsonData.msg);
                    }

                    // log in successful if server doesn't throw
                    // error
                    setIsLoggedIn(true);
                    localStorage.setItem("token", jsonData.token);
                } catch (e) {
                    setFetchError("Error during fetch");
                    throw new Error(e);
                }

                setLoading(false);
            }

            login();
        }
    }, [isSubmitted, userInfo]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);
    }

    if (isSubmitted) {
        if (fetchError) {
            return "Error :" + fetchError;
        }

        if (loading) {
            return "Loading...";
        }

        if (isLoggedIn) {
            return "Logged in successfully!";
        }
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <FormInputContainer>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={(e) => {
                        setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                />
            </FormInputContainer>
            <FormInputContainer>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={userInfo.password}
                    onChange={(e) => {
                        setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                />
            </FormInputContainer>
            <button type="submit">Log In</button>
        </form>
    );
}
