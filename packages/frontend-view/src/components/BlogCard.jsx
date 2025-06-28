import styles from "./BlogCard.module.css";

// className for additional styles
export default function BlogCard({ className, title, content, publishedAt }) {
    return (
        <div className={`${className} ${styles.blogCard}`}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.publishedAt}>{publishedAt}</div>
        </div>
    );
}
