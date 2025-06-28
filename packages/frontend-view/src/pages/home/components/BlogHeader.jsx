import styles from "./BlogHeader.module.css";
import BlogCard from "#components/BlogCard";
import SearchBar from "#components/SearchBar";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import {Link} from 'react-router-dom'

export default function BlogHeader({ topPost }) {
    const links = [
        {
            name: "Users",
            href: "/users",
        },
        {
            name: "Log In",
            href: "/login",
        },
    ];
    return (
        <header className={styles.blogHeader}>
            <div className={styles.brand}>
                You <br />
                Blog
            </div>
            <div className={styles.navigationContent}>
                <nav className={styles.navBar}>
                    <SearchBar />
                    {links.map((link, index) => {
                        return (
                            <Link key={index} to={link.href}>
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className={styles.topBlog}>
                    <BlogCard
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
        </header>
    );
}
