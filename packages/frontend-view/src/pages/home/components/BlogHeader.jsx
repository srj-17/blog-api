import styles from "./BlogHeader.module.css";
import BlogCard from "#components/BlogCard";
import SearchBar from "#components/SearchBar";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function BlogHeader({
    topPost,
    loggedIn,
    userData,
    userLoading,
    userFetchError,
}) {
    const [links, setLinks] = useState([
        {
            name: "Users",
            href: "/users",
            className: "users",
        },
        {
            name: "Login",
            href: "/login",
            className: styles.avatar,
        },
    ]);

    useEffect(() => {
        if (loggedIn && !userLoading && !userFetchError) {
            const [firstName, lastName] = userData.name.split(" ");
            const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
            setLinks([
                {
                    name: "Users",
                    href: "/users",
                    className: "users",
                },
                {
                    name: userInitials,
                    href: `/users/${userData.id}`,
                    className: styles.avatar,
                },
            ]);
        } else {
            setLinks([
                {
                    name: "Users",
                    href: "/users",
                    className: "users",
                },
                {
                    name: "Login",
                    href: "/login",
                    className: styles.avatar,
                },
            ]);
        }
    }, [userLoading]);

    return (
        <header className={styles.blogHeader}>
            <nav className={styles.navBar}>
                <SearchBar />
                {links.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            to={link.href}
                            className={link.className}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
            <div className={styles.headerContent}>
                <div className={styles.brand}>
                    You <br />
                    Blog
                </div>
                <div className={styles.topBlogContainer}>
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
            </div>
        </header>
    );
}
