import styles from "./BlogComments.module.css";
import Separator from "#components/Separator";
import Button from "#components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function BlogComments({ comments, isLoggedIn, postId }) {
    async function handleAddComment(e) {
        e.preventDefault();
        const postCommentUrl = `http://localhost:3000/posts/${postId}/comments`;
        // dummy body
        const requestBody = { content: "hello, from the program" };
        const response = await fetch(postCommentUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const addedComment = await response.json();
    }

    return (
        <div className={styles.blogComments}>
            <div className={styles.blogCommentsTitle}>Comments</div>

            {isLoggedIn ? (
                <form className={styles.addComment} action="#">
                    <input
                        type="text"
                        id="addCommentInput"
                        name="comment"
                        placeholder="The post was really good..."
                        className={styles.addCommentInput}
                    />
                    <div className="addCommentButtonContainer">
                        <Button onClick={handleAddComment}>Add comment</Button>
                    </div>
                </form>
            ) : (
                <div className={styles.addCommentLoggedOut}>
                    <Link to="/login">Log In</Link> to add your comment.
                </div>
            )}

            {comments.map((comment, index) => {
                return (
                    <>
                        <div className={styles.comment} key={comment.id}>
                            <div className={styles.commentAuthor}>
                                {comment.author.email}
                            </div>
                            <div className={styles.commentContent}>
                                {comment.content}
                            </div>
                        </div>
                        {index === comments.length - 1 ? null : <Separator />}
                    </>
                );
            })}
        </div>
    );
}
