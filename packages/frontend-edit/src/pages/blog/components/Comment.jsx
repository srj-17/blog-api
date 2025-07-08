import styles from "./Comment.module.css";
import Button from "#components/Button";
import { useState } from "react";
import { useEffect } from "react";

export default function Comment({
    comment,
    setCommentsChanged,
    setCommentNotification,
}) {
    const [commentEditMode, setCommentEditMode] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.content);

    async function handleCommentDelete() {
        const deleteUrl = `http://localhost:3000/posts/${comment.postId}/comments/${comment.id}`;
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
            },
            mode: "cors",
        });

        if (response.ok) {
            setCommentsChanged(true);
            setCommentNotification("Comment Deleted!");
        }
    }

    function handleCommentEditToggle() {
        setCommentEditMode(commentEditMode ? false : true);
        if (commentEditMode) {
            setCommentContent(comment.content);
        }
    }

    async function handleCommentEdit() {
        const commentChangeUrl = `http://localhost:3000/posts/${comment.postId}/comments/${comment.id}`;
        const response = await fetch(commentChangeUrl, {
            method: "PUT",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: commentContent }),
        });

        if (response.ok) {
            setCommentEditMode(false);
            setCommentsChanged(true);
            setCommentNotification("Comment Edited!");
        }
    }

    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.commentAuthor}>{comment.author.email}</div>
            {commentEditMode ? (
                <input
                    autoComplete="off"
                    className={styles.commentEdit}
                    value={commentContent}
                    onChange={(e) => {
                        setCommentContent(e.target.value);
                    }}
                ></input>
            ) : (
                <div className={styles.commentContent}>{comment.content}</div>
            )}
            <div className={styles.commentActionButtons}>
                {commentEditMode ? (
                    <>
                        <Button onClick={handleCommentEdit}>Save</Button>
                        <Button onClick={handleCommentEditToggle}>
                            Discard
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleCommentEditToggle}>Edit</Button>
                        <Button
                            onClick={handleCommentDelete}
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
