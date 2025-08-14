import { useFetch, type FetchedData } from "#utils/fetch";
import HomeButton from "#components/HomeButton";
import Separator from "#components/Separator";
import BlogsGrid from "#components/BlogsGrid";
import styles from "./BlogsPage.module.css";
import Loading from "#components/Loading";
import ErrorPage from "../error/ErrorPage";

export default function BlogsPage() {
    // NOTE: Pagination not added because there aren't enough blogs

    // TODO: make type more specific
    const searchParams = {
        limit: 30,
    };
    const blogUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts/all?${new URLSearchParams(
        searchParams as any,
    ).toString()}`;
    const { data: blogs, error, loading }: FetchedData = useFetch(blogUrl);

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
                    <HomeButton />
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
