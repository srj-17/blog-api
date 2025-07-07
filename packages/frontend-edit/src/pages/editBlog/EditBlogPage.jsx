import { Navigate, useParams } from "react-router-dom";
import styles from "./EditBlogPage.module.css";
import HomeButton from "#components/HomeButton";
import Quill from "quill";
import { useState, useEffect, useRef } from "react";
import Editor from "#components/Editor";
import Button from "#components/Button";
import Loading from "#components/Loading";
import ErrorPage from "../error/ErrorPage";
import UnauthorizedPage from "../unauthorizedPage/UnauthorizedPage";
import { useFetch } from "#utils/fetch";

export default function EditBlogPage() {
    const { blogId } = useParams();
    const blogUrl = `http://localhost:3000/posts/${blogId}`;
    const [blogTitle, setBlogTitle] = useState("");
    const [blogBody, setBlogBody] = useState(null);
    const [blogSubmitted, setBlogSubmitted] = useState(false);
    const { loggedIn, data: blogData, error, loading } = useFetch(blogUrl);

    // Use a ref to access the quill instance directly
    const quillRef = useRef();

    useEffect(() => {
        if (!error && !loading) {
            setBlogTitle(blogData.title);

            // we'll have the reference to editor once the
            // child is mounted and updates the current
            setBlogBody(quillRef.current.getContents());
        }
    }, [loading]);

    async function handlePublishBlog(publishStatus = false) {
        const publishUrl = `http://localhost:3000/posts/${blogId}`;
        const bodyContent = {
            title: blogTitle,
            content: JSON.stringify(blogBody),
        };

        if (publishStatus === true) {
            bodyContent.published = true;
        }

        const response = await fetch(publishUrl, {
            mode: "cors",
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyContent),
        });

        // TODO: handle error cases
        if (response.ok) {
            setBlogTitle("");
            setBlogBody(null);
            setBlogSubmitted(true);
        }
    }

    if (loading) return <Loading />;

    if (!loggedIn) return <UnauthorizedPage />;

    if (error) return <ErrorPage statusCode={500} message={blogData.message} />;

    return (
        <>
            {blogSubmitted ? (
                <Navigate to="/" />
            ) : (
                <div className={styles.editBlogPage}>
                    <HomeButton />
                    <div className={styles.editBlogHeader}>Edit Blog</div>
                    <div className={styles.blogEditorContainer}>
                        <div className={styles.titleContainer}>
                            <label
                                htmlFor="title"
                                className={styles.titleLabel}
                            >
                                Title
                            </label>
                            <input
                                className={styles.titleInput}
                                placeholder="Never gonna give you up"
                                id="title"
                                type="text"
                                name="title"
                                required
                                value={blogTitle}
                                onChange={(e) => {
                                    setBlogTitle(e.target.value);
                                }}
                            />
                        </div>
                        <Editor
                            ref={quillRef}
                            defaultValue={JSON.parse(blogData.content)}
                            setBlogBody={setBlogBody}
                        />
                    </div>
                    <div className={styles.createBlogActions}>
                        <Button
                            onClick={() => {
                                handlePublishBlog(true);
                            }}
                        >
                            Publish Blog
                        </Button>
                        <Button
                            onClick={() => {
                                handlePublishBlog(false);
                            }}
                        >
                            Save As Draft
                        </Button>
                        <Button variant="link" to="/">
                            Discard Blog
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
