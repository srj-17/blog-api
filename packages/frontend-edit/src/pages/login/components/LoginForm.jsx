import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormInputContainer from "#components/FormInputContainer";
import Loading from "#components/Loading";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import Separator from "#components/Separator";
import Button from "#components/Button";
import ErrorPage from "../../error/ErrorPage";

export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseJson, setResponseJson] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/login`;
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
                        setFetchError({
                            statusCode: response.status,
                            message: jsonData.msg,
                        });
                    } else {
                        // log in successful if server doesn't throw
                        // error
                        setIsLoggedIn(true);
                        localStorage.setItem("editToken", jsonData.token);
                    }
                } catch (e) {
                    setFetchError({ msg: "Error during fetch" });
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
            return (
                <ErrorPage
                    statusCode={fetchError.statusCode || 400}
                    message={fetchError.message || "Error during fetch."}
                />
            );
        }

        if (loading) {
            return <Loading />;
        }

        if (isLoggedIn) {
            return <Navigate to="/" />;
        }
    }

    return (
        <form
            className={styles.loginForm}
            method="POST"
            onSubmit={handleSubmit}
        >
            <div className={styles.loginHeader}>Log In</div>
            <Separator />
            <FormInputContainer>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
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
                    required
                    value={userInfo.password}
                    onChange={(e) => {
                        setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                />
            </FormInputContainer>
            <Button additionalStyles={styles.loginButton} type="submit">
                Log In
            </Button>
            <div>
                Not logged in?{" "}
                <Link className={styles.signupLink} to="/signup">
                    Sign Up
                </Link>
            </div>
        </form>
    );
}
