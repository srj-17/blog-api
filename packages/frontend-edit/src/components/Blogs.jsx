import styles from "./Blogs.module.css";
import { useFetch } from "../utils/fetch";
import Loading from "#components/Loading";
import ErrorPage from "../pages/error/ErrorPage";
import BlogCard from "#components/BlogCard";

export default function Blogs() {
    const blogsUrl = "http://localhost:3000/posts";
    const { loggedIn, data: blogs, error, loading } = useFetch(blogsUrl);

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPage />
            ) : (
                <div className={styles.blogs}>
                    <div className={styles.blogsHeader}>Your Blogs</div>
                    {blogs.map((blog) => {
                        return <BlogCard key={blog.id} blog={blog} />;
                    })}
                </div>
            )}
        </>
    );
}
