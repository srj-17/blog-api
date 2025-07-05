import styles from "./App.module.css";
import BlogHeader from "./components/BlogHeader";
import Separator from "#components/Separator";
import Blogs from "#components/Blogs";

export default function App() {
    return (
        <div className={styles.homePage}>
            <BlogHeader />
            <Separator />
            <Blogs />
        </div>
    );
}
