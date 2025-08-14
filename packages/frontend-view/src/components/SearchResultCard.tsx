import styles from "./SearchResultCard.module.css";
import { Link } from "react-router-dom";
import ReactEllipsis from "react-ellipsis-component";

interface Blog {
    id: number;
    title: string;
    content: string;
}

export default function SearchResultCard({ result: blog }: { result: Blog }) {
    return (
        <Link to={`/blogs/${blog.id}`} className={styles.searchResult}>
            <div className={styles.resultTitle}>{blog.title}</div>
            <ReactEllipsis
                className={styles.resultContent}
                text={blog.content}
                maxLine={2}
                ellipsis={true}
            />
        </Link>
    );
}
