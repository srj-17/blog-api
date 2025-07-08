import styles from "./BlogHeader.module.css";
import BlogCard from "#components/BlogCard";
import SearchBar from "#components/SearchBar";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import { Link } from "react-router-dom";
import Avatar from "#components/Avatar";
import Button from "#components/Button";

export default function BlogHeader({
    topPost,
    loggedIn,
    userData,
    userLoading,
    userFetchError,
    setLoggedIn,
}) {
    function logOutHandler(e) {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <header className={styles.blogHeader}>
            <nav className={styles.navBar}>
                <SearchBar />
                <Link to="http://localhost:5000">Admin Mode</Link>
                <Link to="/users" className="users">
                    Users
                </Link>
                {loggedIn ? (
                    <Button
                        styleAsLink={true}
                        additionalStyles={styles.logOutButton}
                        onClick={logOutHandler}
                    >
                        Log Out
                    </Button>
                ) : null}
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
                        {topPost ? (
                            <>
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
                            </>
                        ) : null}{" "}
                    </div>
                </div>
            </div>
        </header>
    );
}
