import BlogCard from "#components/BlogCard";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import styles from "./BlogContainer.module.css";
import { Link } from "react-router-dom";

export default function BlogContainer({ blogs }) {
    if (blogs.length === 0) return <div>No Blogs Found</div>;
    return (
        <section className={styles.blogsContainer}>
            <div className={styles.blogsContainerTitle}>Explore Blogs</div>
            <div className={styles.blogs}>
                {/* we only show 6 latest blogs in the homepage */}
                {blogs.slice(0, 6).map((blog) => {
                    return (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            content={blog.content}
                            publishedAt={dateStringToReadableDate(
                                blog.publishedAt,
                            )}
                        />
                    );
                })}
            </div>
            <div className={styles.blogsContainerFooter}>
                <Link to="/blogs">Explore More</Link>
            </div>
        </section>
    );
}
