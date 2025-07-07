import { useFetch } from "#utils/fetch";
import styles from "./App.module.css";
import BlogHeader from "./components/BlogHeader";
import Separator from "#components/Separator";
import BlogContainer from "./components/BlogContainer";
import Loading from "#components/Loading";
import ErrorPage from "../error/ErrorPage";

function App() {
    const postsUrl = "http://localhost:3000/posts/all";
    const userUrl = "http://localhost:3000/users";
    const {
        loggedIn,
        data: posts,
        error,
        loading,
        setLoggedIn,
    } = useFetch(postsUrl);
    const {
        data: userData,
        error: userFetchError,
        loading: userLoading,
    } = useFetch(userUrl);

    if (loading) {
        return <Loading />;
    }

    // NOTE: when the user logs out, and the request is sent,
    // the useFetch should set the error as true as well, since 403
    // is also error, but IDK why, for now, it's not setting it, and our
    // app works as expected
    if (error) {
        // if error, the payload (data) has the error information
        return (
            <ErrorPage
                statusCode={posts.statusCode || 404}
                message={posts.msg || "Not Found."}
            />
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.topSection}>
                <BlogHeader
                    topPost={posts[0]}
                    loggedIn={loggedIn}
                    userData={userData}
                    userLoading={userLoading}
                    userFetchError={userFetchError}
                    setLoggedIn={setLoggedIn}
                />
                <Separator />
                {posts ? <BlogContainer blogs={posts} /> : "No Posts Found"}
            </div>
            <div className={styles.middleSection}>
                <div className={styles.middleSectionBigWords}>CREATE</div>
                <div className={styles.middleSectionSmallWords}>TO INSPIRE</div>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                        >
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                        </svg>
                        <div className={styles.contactName}>mail@gmail.com</div>
                    </div>
                    <div className={styles.contact}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                        >
                            <path d="M440-400h80v-120h120v-80H520v-120h-80v120H320v80h120v120Zm40 214q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                        </svg>
                        <div className={styles.contactName}>
                            Based in Kathmandu
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                        >
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
                        </svg>
                        <div className={styles.contactName}>
                            alternate@mail.com
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                        >
                            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                        </svg>
                        <div className={styles.contactName}>980000000</div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    Copyright &copy; 2025 srj-17. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}

export default App;
