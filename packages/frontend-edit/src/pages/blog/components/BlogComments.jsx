import styles from "./BlogComments.module.css";
import Separator from "#components/Separator";
import Button from "#components/Button";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

export default function BlogComments({
    comments: initialComments,
    isLoggedIn,
    postId,
}) {
    const [currentComments, setCurrentcomments] = useState(null);
    const [commentsChanged, setCommentsChanged] = useState(false);
    const [commentInputValue, setCommentInputValue] = useState("");
    const [commentNotification, setCommentNotification] = useState(null);

    useEffect(() => {
        if (commentsChanged) {
            async function fetchComments() {
                const commentsUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts/${postId}/comments`;
                const response = await fetch(commentsUrl, { mode: "cors" });
                const newComments = await response.json();

                if (response.ok) {
                    setCurrentcomments(newComments);
                }
            }

            fetchComments();
            setCommentsChanged(false);
            setCommentInputValue("");
        }

        const NOTIFICATION_PERIOD = 1000;
        const id = setTimeout(() => {
            setCommentNotification(null);
        }, NOTIFICATION_PERIOD);
        return () => clearTimeout(id);
    }, [commentsChanged, postId]);

    async function handleAddComment(e) {
        e.preventDefault();
        const postCommentUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts/${postId}/comments`;
        const requestBody = { content: commentInputValue };
        const response = await fetch(postCommentUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            setCommentNotification("Comment Added!");
        }

        if (response.status >= 400) {
            setCommentNotification("Comment could not be added.");
        }

        setCommentsChanged(true);
    }

    const comments = currentComments ? currentComments : initialComments;

    return (
        <div className={styles.blogComments}>
            {commentNotification ? (
                <div className={styles.commentNotification}>
                    {commentNotification}
                </div>
            ) : null}
            <div className={styles.blogCommentsTitle}>Comments</div>

            {isLoggedIn ? (
                <form className={styles.addComment} action="#">
                    <input
                        autoComplete="off"
                        type="text"
                        id="addCommentInput"
                        name="comment"
                        placeholder="The post was really good..."
                        value={commentInputValue}
                        onChange={(e) => {
                            setCommentInputValue(e.target.value);
                        }}
                        className={styles.addCommentInput}
                    />
                    <div className="addCommentButtonContainer">
                        <Button onClick={handleAddComment}>Add comment</Button>
                    </div>
                </form>
            ) : (
                <div className={styles.loggedOut}>
                    <div>
                        You are not allowed to comment.{" "}
                        <Link to="/login">Log In</Link> to comment.
                    </div>
                </div>
            )}

            {comments.map((comment, index) => {
                return (
                    <Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            setCommentsChanged={setCommentsChanged}
                            setCommentNotification={setCommentNotification}
                        />
                        {index === comments.length - 1 ? null : <Separator />}
                    </Fragment>
                );
            })}
        </div>
    );
}
