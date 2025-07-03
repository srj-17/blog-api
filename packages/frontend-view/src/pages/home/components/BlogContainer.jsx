import styles from "./BlogContainer.module.css";
import { Link } from "react-router-dom";
import BlogsGrid from "#components/BlogsGrid";

export default function BlogContainer({ blogs }) {
    if (blogs.length === 0) return <div>No Blogs Found</div>;
    return (
        <section className={styles.blogsContainer}>
            <div className={styles.blogsContainerTitle}>Explore Blogs</div>
            <div className={styles.blogs}>
                {/* we only show 6 latest blogs in the homepage */}
                <BlogsGrid blogs={blogs} count={6} />
            </div>
            <div className={styles.blogsContainerFooter}>
                <Link className={styles.exploreMoreLink} to="/blogs">
                    Explore More
                </Link>
            </div>
        </section>
    );
}
