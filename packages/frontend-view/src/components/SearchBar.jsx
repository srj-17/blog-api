import styles from "./SearchBar.module.css";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { useEffect } from "react";
import SearchResultCard from "./SearchResultCard";
import Separator from "./Separator";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const postsUrl = `http://localhost:3000/posts/all?${new URLSearchParams(
                {
                    searchQuery: searchText,
                    limit: 7,
                },
            ).toString()}`;

            const response = await fetch(postsUrl);
            const responseBody = await response.json();
            if (response.statusCode >= 400) {
                console.error(responseBody);
            }

            setSearchResults(responseBody);
        }

        if (searchText.length >= 3) {
            fetchPosts();
        } else {
            setSearchResults([]);
        }
    }, [searchText]);

    function handleSearchTextChange(e) {
        setSearchText(e.target.value);
    }

    return (
        <form
            className={styles.searchBar}
            method="get"
            action={
                searchResults.length >= 1
                    ? `/blogs/${searchResults[0].id}`
                    : "#"
            }
        >
            <svg
                className={styles.magnifyingGlass}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                aria-hidden="true"
            >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <SearchInput
                onChange={handleSearchTextChange}
                value={searchText}
                name="searchQuery"
            />
            {searchResults && searchResults.length > 0 ? (
                <div className={styles.searchResults}>
                    {searchResults.map((result, index) => {
                        return (
                            <>
                                <SearchResultCard
                                    key={result.id}
                                    result={result}
                                />
                                {index === searchResults.length - 1 ? null : (
                                    <Separator />
                                )}
                            </>
                        );
                    })}
                </div>
            ) : null}
            <Button type="submit">Search</Button>
        </form>
    );
}
