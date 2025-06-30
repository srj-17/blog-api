import styles from "./BlogHeader.module.css";
import BlogCard from "#components/BlogCard";
import SearchBar from "#components/SearchBar";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import { Link } from "react-router-dom";
import Avatar from "#components/Avatar";

export default function BlogHeader({
    topPost,
    loggedIn,
    userData,
    userLoading,
    userFetchError,
}) {
    return (
        <header className={styles.blogHeader}>
            <nav className={styles.navBar}>
                <SearchBar />
                <Link to="/users" className="users">
                    Users
                </Link>
                <Avatar
                    userLoading={userLoading}
                    userData={userData}
                    loggedIn={loggedIn}
                />
            </nav>
            <div className={styles.headerContent}>
                <div className={styles.brand}>
                    You <br />
                    Blog
                </div>
                <div className={styles.topBlogContainer}>
                    <div className={styles.topBlog}>
                        <BlogCard
                            id={topPost.id}
                            className={styles.blogCard}
                            title={topPost.title}
                            content={topPost.content}
                            publishedAt={dateStringToReadableDate(
                                topPost.publishedAt,
                            )}
                        />
                        <div className={styles.topBlogTitle}>
                            Read What's Happening
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
