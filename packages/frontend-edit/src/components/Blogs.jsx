import styles from "./Blogs.module.css";
import { useFetch } from "../utils/fetch";
import Loading from "#components/Loading";
import ErrorPage from "../pages/error/ErrorPage";
import BlogCard from "#components/BlogCard";
import { useEffect, useState } from "react";

export default function Blogs() {
    const blogsUrl = "http://localhost:3000/posts";
    const { loggedIn, data: blogs, error, loading } = useFetch(blogsUrl);
    const [blogChanged, setBlogChanged] = useState(false);
    const [updatedBlogs, setUpdatedBlogs] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        if (blogChanged) {
            async function fetchBlogs() {
                const response = await fetch(blogsUrl, { mode: "cors" });
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setFetchError(true);
                }

                setUpdatedBlogs(responseJson);
            }

            fetchBlogs();
        }

        setBlogChanged(false);
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
                    <div className={styles.blogsHeader}>Your Blogs</div>
                    {blogsToDisplay.map((blog) => {
                        return (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                setBlogChanged={setBlogChanged}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
