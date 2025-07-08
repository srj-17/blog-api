import { useFetch } from "#utils/fetch";
import HomeButton from "#components/HomeButton";
import Separator from "#components/Separator";
import BlogsGrid from "#components/BlogsGrid";
import styles from "./BlogsPage.module.css";
import Loading from "#components/Loading";
import ErrorPage from "../error/ErrorPage";

export default function BlogsPage() {
    // NOTE: Pagination not added because there aren't enough blogs
    const blogUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts/all?${new URLSearchParams(
        {
            limit: 30,
        },
    ).toString()}`;
    const { loggedIn, data: blogs, error, loading } = useFetch(blogUrl);

    return (
        <div className={styles.blogsPage}>
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPage
                    statusCode={blogs.statusCode || 404}
                    message={blogs.msg || "Not Found."}
                />
            ) : (
                <div className={styles.firstSection}>
                    <HomeButton className={styles.homeButton} />
                    <div className={styles.blogsTitle}>Explore Blogs</div>
                    <Separator />
                    <div className={styles.blogsContainer}>
                        <BlogsGrid blogs={blogs} />
                    </div>
                </div>
            )}
        </div>
    );
}
