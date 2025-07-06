import styles from "./BlogCard.module.css";
import Button from "#components/Button";
import capitalize from "#utils/capitalize";
import dateStringToReadableDate from "#utils/dateStringToReadableDate";

export default function BlogCard({
    blog,
    setBlogChanged,
    setBlogNotification,
}) {
    async function handlePublishBlog() {
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
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    async function handleDeleteBlog() {
        const updateUrl = `http://localhost:3000/posts/${blog.id}`;
        const response = await fetch(updateUrl, {
            method: "DELETE",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setBlogChanged(true);
            setBlogNotification(`Blog "${blog.title}" deleted.`);
        }
    }

    return (
        <div className={styles.blogCard}>
            <div className={styles.blogInfo}>
                <div className={styles.blogDate}>
                    {blog.published
                        ? `Published At: ${dateStringToReadableDate(blog.publishedAt)}`
                        : `Created At: ${dateStringToReadableDate(blog.createdAt)}`}
                </div>
                <div className={styles.blogTitle}>{capitalize(blog.title)}</div>
            </div>
            <div className={styles.blogActions}>
                <Button variant="link" to={`/edit/${blog.id}`}>
                    Edit
                </Button>
                <Button onClick={handleDeleteBlog}>Delete</Button>
                <Button onClick={handlePublishBlog}>
                    {blog.published ? "Unpublish" : "Publish"}
                </Button>
            </div>
        </div>
    );
}
