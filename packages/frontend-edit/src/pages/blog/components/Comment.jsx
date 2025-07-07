import styles from "./Comment.module.css";
import Button from "#components/Button";

export default function Comment({ comment, setCommentsChanged }) {
    async function handleCommentDelete() {
        const deleteUrl = `http://localhost:3000/posts/${comment.postId}/comments/${comment.id}`;
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            mode: "cors",
        });

        if (response.ok) {
            setCommentsChanged(true);
        }
    }

    function hanleCommentEdit() {}

    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.commentAuthor}>{comment.author.email}</div>
            <div className={styles.commentContent}>{comment.content}</div>
            <div className={styles.commentActionButtons}>
                <Button onClick={hanleCommentEdit}>Edit</Button>
                <Button onClick={handleCommentDelete}>Delete</Button>
            </div>
        </div>
    );
}
