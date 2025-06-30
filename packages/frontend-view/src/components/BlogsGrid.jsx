import styles from "./BlogsGrid.module.css";
import BlogCard from "./BlogCard.jsx";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";

// count = number of blogs to show
export default function BlogsGrid({ blogs, count }) {
    const blogsToDisplay = count ? blogs.slice(0, count) : blogs;
    return (
        <div className={styles.blogs}>
            {/* we only show 6 latest blogs in the homepage */}
            {blogsToDisplay.map((blog) => {
                return (
                    <BlogCard
                        id={blog.id}
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        publishedAt={dateStringToReadableDate(blog.publishedAt)}
                    />
                );
            })}
        </div>
    );
}
