import styles from "./App.module.css";
import BlogHeader from "./components/BlogHeader";
import Separator from "#components/Separator";
import Blogs from "#components/Blogs";
import Loading from "#components/Loading";
import { useFetch } from "#utils/fetch";
import ErrorPage from "../error/ErrorPage";
import { Navigate } from "react-router-dom";

export default function App() {
    const loggedInUserUrl = "http://localhost:3000/users";
    const {
        loggedIn,
        data: userData,
        error,
        loading,
        setLoggedIn,
    } = useFetch(loggedInUserUrl);

    if (loading) return <Loading />;

    if (error)
        return (
            <ErrorPage
                message={userData.message}
                statusCode={userData.statusCode}
            />
        );

    if (!loggedIn) return <Navigate to="/login" />;

    return (
        <div className={styles.homePage}>
            <BlogHeader
                userData={userData}
                loggedIn={loggedIn}
                userLoading={loading}
                setLoggedIn={setLoggedIn}
            />
            <Separator />
            <Blogs />
        </div>
    );
}
