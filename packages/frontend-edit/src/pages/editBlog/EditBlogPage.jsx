import { useParams } from "react-router-dom";
import styles from "./EditBlogPage.module.css";

export default function EditBlogPage() {
    const { blogId } = useParams();
    return (
        <div className={styles.editBlogPage}>
            This is where you edit blog {blogId}
        </div>
    );
}
