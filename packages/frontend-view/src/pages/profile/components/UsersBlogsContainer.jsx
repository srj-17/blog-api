import BlogsGrid from "#components/BlogsGrid";
import styles from "./UsersBlogsContainer.module.css";

export default function UsersBlogsContainer({ blogs }) {
    return (
        <div className={styles.blogsContainer}>
            <BlogsGrid blogs={blogs} />
        </div>
    );
}
