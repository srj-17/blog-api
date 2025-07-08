import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";
import HomeButton from "#components/HomeButton";
import capitalize from "#utils/capitalize";
import styles from "./BlogPage.module.css";
import BlogComments from "./components/BlogComments";
import Loading from "#components/Loading";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import DOMPurify from "dompurify";

export default function BlogPage(props) {
    const { blogId } = useParams();
    const blogUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts/${blogId}?${new URLSearchParams(
        {
            include: "comments",
        },
    ).toString()}`;
    const {
        loggedIn: isLoggedIn,
        data: blogData,
        error: blogError,
        loading: blogIsLoading,
    } = useFetch(blogUrl);

    if (blogIsLoading) return <Loading />;

    const authorName = capitalize(
        `${blogData.author.firstName} ${blogData.author.lastName}`,
    );

    const delta = JSON.parse(blogData.content);
    const deltaOps = delta.ops;
    const converter = new QuillDeltaToHtmlConverter(deltaOps);
    const htmlBlogContent = converter.convert();

    return (
        <div className={styles.blogPage}>
            <HomeButton />
            <div className={styles.blogMeta}>
                <div className={styles.author}>{authorName}</div>
                <div className={styles.blogTitle}>
                    {capitalize(blogData.title)}
                </div>
            </div>
            {/* not so dangerous because user doesn't provide this input,
            we get that by parsing the deltaOps created by frontend-edit, 
            but just to be safe, we're using DOMPurify */}
            <div
                className={styles.blogContent}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(htmlBlogContent),
                }}
            />
            <BlogComments
                postId={blogData.id}
                isLoggedIn={isLoggedIn}
                comments={blogData.comments}
            />
        </div>
    );
}
