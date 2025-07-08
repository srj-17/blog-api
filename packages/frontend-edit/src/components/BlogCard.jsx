import styles from "./BlogCard.module.css";
import Button from "#components/Button";
import capitalize from "#utils/capitalize";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function BlogCard({
    blog,
    setBlogChanged,
    setBlogNotification,
}) {
    const [viewBlogTrigger, setViewBlogTrigger] = useState(false);
    const [editBlogTrigger, setEditBlogTrigger] = useState(false);

    async function handleViewBlog() {
        setViewBlogTrigger(true);
    }

    async function handlePublishBlog(e) {
        e.stopPropagation();
        const newPublishedState = blog.published ? false : true;
        const newBlogInformation = {
            ...blog,
            published: newPublishedState,
        };
        const updateUrl = `http://localhost:3000/posts/${blog.id}`;
        const response = await fetch(updateUrl, {
            method: "PUT",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBlogInformation),
        });

        if (response.ok) {
            setBlogChanged(true);
            setBlogNotification(
                `Blog "${blog.title}" ${newPublishedState ? "published" : "saved back to draft."}`,
            );
        }
    }

    async function handleDeleteBlog(e) {
        e.stopPropagation();
        const updateUrl = `http://localhost:3000/posts/${blog.id}`;
        const response = await fetch(updateUrl, {
            method: "DELETE",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setBlogChanged(true);
            setBlogNotification(`Blog "${blog.title}" deleted.`);
        }
    }

    function handleBlogEdit(e) {
        e.stopPropagation();
        setEditBlogTrigger(true);
    }

    return (
        <>
            {editBlogTrigger ? (
                <Navigate to={`/edit/${blog.id}`} />
            ) : viewBlogTrigger ? (
                <Navigate to={`/blogs/${blog.id}`} />
            ) : (
                <div className={styles.blogCard} onClick={handleViewBlog}>
                    <div className={styles.blogInfo}>
                        <div className={styles.blogDate}>
                            {blog.published
                                ? `Published At: ${dateStringToReadableDate(blog.publishedAt)}`
                                : `Created At: ${dateStringToReadableDate(blog.createdAt)}`}
                        </div>
                        <div className={styles.blogTitle}>
                            {capitalize(blog.title)}
                        </div>
                    </div>
                    <div className={styles.blogActions}>
                        <Button onClick={handleBlogEdit}>Edit</Button>
                        <Button onClick={handleDeleteBlog}>Delete</Button>
                        <Button onClick={handlePublishBlog}>
                            {blog.published ? "Unpublish" : "Publish"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
