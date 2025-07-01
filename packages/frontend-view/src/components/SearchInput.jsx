import styles from "./SearchInput.module.css";

export default function SearchInput({ onChange, value, name }) {
    return (
        <input
            onChange={onChange}
            value={value}
            name={name}
            className={styles.searchInput}
            type="search"
            autoComplete="false"
        />
    );
}
