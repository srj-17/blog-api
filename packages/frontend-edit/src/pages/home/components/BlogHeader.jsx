import styles from "./BlogHeader.module.css";
import Button from "#components/Button";

export default function BlogHeader() {
    return (
        <header className={styles.blogHeader}>
            <nav className={styles.navBar}>
                <Button>Add New Blog</Button>
                {/* TODO: implement an avatar of logged in person here */}
            </nav>
            <div className={styles.headerTitle}>
                You <br /> Blog
            </div>
        </header>
    );
}
