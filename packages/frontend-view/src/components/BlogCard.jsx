import styles from "./BlogCard.module.css";
import Button from "#components/Button";
import ReactEllipsis from "react-ellipsis-component";
import capitalize from "#utils/capitalize";

// className for additional styles
export default function BlogCard({
    id,
    className,
    title,
    content,
    publishedAt,
}) {
    return (
        <div className={`${className} ${styles.blogCard}`}>
            <div className={styles.title}>{capitalize(title)}</div>
            <div className={styles.description}>
                <div className={styles.publishedAt}>{publishedAt}</div>
                <ReactEllipsis
                    className={styles.content}
                    text={content}
                    maxLine="7"
                    ellipsisNode="..."
                />
                <Button variant="link" to={`/blogs/${id}`}>
                    Read Blog
                </Button>
            </div>
        </div>
    );
}
