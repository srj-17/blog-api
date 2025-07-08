import styles from "./BlogComments.module.css";
import Separator from "#components/Separator";
import Button from "#components/Button";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import UnauthorizedPage from "../../unauthorizedPage/UnauthorizedPage";
import Comment from "./Comment";

export default function BlogComments({
    comments: initialComments,
    isLoggedIn,
    postId,
}) {
    const [currentComments, setCurrentcomments] = useState(null);
    const [commentsChanged, setCommentsChanged] = useState(false);
    const [commentInputValue, setCommentInputValue] = useState("");

    useEffect(() => {
        if (commentsChanged) {
            async function fetchComments() {
                const commentsUrl = `http://localhost:3000/posts/${postId}/comments`;
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
    }, [commentsChanged]);

    async function handleAddComment(e) {
        e.preventDefault();
        const postCommentUrl = `http://localhost:3000/posts/${postId}/comments`;
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

        // TODO: check for errors here
        setCommentsChanged(true);
    }

    const comments = currentComments ? currentComments : initialComments;

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
                <UnauthorizedPage />
            )}

            {comments.map((comment, index) => {
                return (
                    <Fragment key={comment.id}>
                        <Comment
                            comment={comment}
                            setCommentsChanged={setCommentsChanged}
                        />
                        {index === comments.length - 1 ? null : <Separator />}
                    </Fragment>
                );
            })}
        </div>
    );
}
