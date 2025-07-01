import styles from "./BlogComments.module.css";
import Separator from "#components/Separator";

export default function BlogComments({ comments }) {
    return (
        <div className={styles.blogComments}>
            <div className={styles.blogCommentsTitle}>Comments</div>
            {comments.map((comment, index) => {
                return (
                    <>
                        <div className="comment" key={comment.id}>
                            <div className={styles.title}>{comment.title}</div>
                            <div className={styles.content}>
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
