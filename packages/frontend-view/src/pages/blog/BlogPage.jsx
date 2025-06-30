import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";
import HomeButton from "#components/HomeButton";
import capitalize from "#utils/capitalize";
import styles from "./BlogPage.module.css";

export default function BlogPage(props) {
    const { blogId } = useParams();
    const blogUrl = `http://localhost:3000/posts/${blogId}`;
    const {
        isLoggedIn,
        data: blogData,
        error: blogError,
        loading: blogIsLoading,
    } = useFetch(blogUrl);
    // get author for the given blog

    if (blogIsLoading) return "Loading...";

    const authorName = capitalize(
        `${blogData.author.firstName} ${blogData.author.lastName}`,
    );

    return (
        <div className={styles.blogPage}>
            <HomeButton />
            <div className={styles.blogMeta}>
                <div className={styles.author}>{authorName}</div>
                <div className={styles.blogTitle}>
                    {capitalize(blogData.title)}
                </div>
            </div>
            <div className={styles.blogContent}>{blogData.content}</div>
        </div>
    );
}
