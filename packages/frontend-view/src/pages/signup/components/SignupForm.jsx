import { useEffect, useState } from "react";
import FormInputContainer from "../../../components/FormInputContainer";
import styles from "./SignupForm.module.css";
import Separator from "#components/Separator";
import Button from "#components/Button";
import { Navigate } from "react-router-dom";
import ErrorPage from "../../error/ErrorPage";
import Loading from "#components/Loading";

export default function SignupForm() {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseJson, setResponseJson] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);
    const signupSubmitUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/users`;

    useEffect(() => {
        if (isSubmitted) {
            async function signup() {
                try {
                    const response = await fetch(signupSubmitUrl, {
                        method: "POST",
                        cors: true,
                        body: JSON.stringify(userInfo),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const jsonData = await response.json();

                    if (response.status >= 400) {
                        throw new Error(jsonData.msg);
                    }

                    setResponseJson(jsonData);
                } catch (e) {
                    setFetchError(e);
                }

                setLoading(false);
            }

            signup();
        }
    }, [isSubmitted, userInfo]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);
    }

    if (isSubmitted) {
        return (
            <div>
                {" "}
                {loading ? (
                    <Loading />
                ) : fetchError ? (
                    <ErrorPage
                        message={"There was some error during form submission"}
                        statusCode={500}
                    />
                ) : (
                    <Navigate to="/login" />
                )}
            </div>
        );
    } else {
        return (
            <form
                className={styles.signupForm}
                method="POST"
                onSubmit={handleSubmit}
            >
                <div className={styles.signupHeader}>Sign Up</div>
                <Separator />
                <FormInputContainer>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        required
                        value={userInfo.firstName}
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                firstName: e.target.value,
                            })
                        }
                    />
                </FormInputContainer>
                <FormInputContainer>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        required
                        value={userInfo.lastName}
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                lastName: e.target.value,
                            })
                        }
                    />
                </FormInputContainer>
                <FormInputContainer>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={userInfo.email}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, email: e.target.value })
                        }
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
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                password: e.target.value,
                            })
                        }
                    />
                </FormInputContainer>
                <Button additionalStyles={styles.signupButton} type="submit">
                    Sign Up
                </Button>
            </form>
        );
    }
}
