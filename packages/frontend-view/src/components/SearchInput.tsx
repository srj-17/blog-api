import styles from "./SearchInput.module.css";

interface SearchInputProps {
    // TODO: more specific
    onChange: (e: any) => any;
    value: string;
    name: string;
}

export default function SearchInput({
    onChange,
    value,
    name,
}: SearchInputProps) {
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
