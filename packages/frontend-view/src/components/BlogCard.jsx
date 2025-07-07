import styles from "./BlogCard.module.css";
import Button from "#components/Button";
import ReactEllipsis from "react-ellipsis-component";
import capitalize from "#utils/capitalize";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { convert as htmlToTextConvert } from "html-to-text";

// className for additional styles
export default function BlogCard({
    id,
    className,
    title,
    content,
    publishedAt,
}) {
    const delta = JSON.parse(content);
    const deltaOps = delta.ops;
    const converter = new QuillDeltaToHtmlConverter(deltaOps);
    const htmlBlogContent = converter.convert();
    const blogContent = htmlToTextConvert(htmlBlogContent);
    return (
        <div className={`${className} ${styles.blogCard}`}>
            <div className={styles.title}>{capitalize(title)}</div>
            <div className={styles.description}>
                <div className={styles.publishedAt}>{publishedAt}</div>
                <ReactEllipsis
                    className={styles.content}
                    text={blogContent}
                    maxLine="7"
                    ellipsisNode="..."
                />
                <Button variant="link" to={`/blogs/${id}`}>
                    Read Blog
                </Button>
            </div>
        </div>
    );
}
