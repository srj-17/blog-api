import styles from "./BlogCard.module.css";
import Button from "#components/Button";
import capitalize from "#utils/capitalize";

export default function BlogCard({ blog }) {
    return (
        <div className={styles.blogCard}>
            <div className={styles.blogInfo}>
                <div className={styles.blogDate}>
                    {blog.published ? blog.publishedDate : blog.createdDate}
                </div>
                <div className={styles.blogTitle}>{capitalize(blog.title)}</div>
            </div>
            <div className={styles.blogActions}>
                <Button variant="link" to={`/edit/${blog.id}`}>
                    Edit
                </Button>
                <Button>Delete</Button>
                {blog.published ? (
                    <Button>UnPublish</Button>
                ) : (
                    <Button>Publish</Button>
                )}
            </div>
        </div>
    );
}
