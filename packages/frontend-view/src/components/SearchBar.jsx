import styles from "./SearchBar.module.css";
export default function SearchBar() {
    // TODO: implement features for autocompletion here
    return (
        <form className={styles.searchBar} method="get" action="#">
            <input
                className={styles.searchInput}
                type="search"
                name="search-bar"
            />
            <button type="submit">Search</button>
        </form>
    );
}
