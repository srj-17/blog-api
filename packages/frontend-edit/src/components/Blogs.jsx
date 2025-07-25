import styles from "./Blogs.module.css";
import { useFetch } from "../utils/fetch";
import Loading from "#components/Loading";
import ErrorPage from "../pages/error/ErrorPage";
import BlogCard from "#components/BlogCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blogs() {
    const blogsUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts`;
    const { loggedIn, data: blogs, error, loading } = useFetch(blogsUrl);
    const [blogChanged, setBlogChanged] = useState(false);
    const [blogNotification, setBlogNotification] = useState(null);
    const [updatedBlogs, setUpdatedBlogs] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (blogChanged) {
            async function fetchBlogs() {
                const response = await fetch(blogsUrl, {
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("editToken")}`,
                    },
                });
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setFetchError(true);
                }

                setUpdatedBlogs(responseJson);
            }

            fetchBlogs();
        }

        setBlogChanged(false);

        const NOTIFICATION_PERIOD = 1000;
        const id = setTimeout(() => {
            setBlogNotification(null);
        }, NOTIFICATION_PERIOD);

        return () => clearTimeout(id);
    }, [blogChanged]);

    const blogsToDisplay = updatedBlogs ?? blogs;
    return (
        <>
            {loading ? (
                <Loading />
            ) : error || fetchError ? (
                <ErrorPage />
            ) : (
                <div className={styles.blogs}>
                    {blogNotification ? (
                        <div className={styles.blogNotification}>
                            {blogNotification}
                        </div>
                    ) : null}
                    <div className={styles.blogsHeader}>Your Blogs</div>
                    {blogsToDisplay.length >= 1 ? (
                        blogsToDisplay.map((blog) => {
                            return (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                    setBlogChanged={setBlogChanged}
                                    setBlogNotification={setBlogNotification}
                                />
                            );
                        })
                    ) : (
                        <div>
                            No Blogs found.{" "}
                            <Link to="/create">Create Blog</Link>.
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
