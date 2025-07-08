import React, { useRef, useState, useEffect } from "react";
import Editor from "#components/Editor";
import Quill from "quill";
import styles from "./CreateBlogPage.module.css";
import HomeButton from "#components/HomeButton";
import Button from "#components/Button";
import { Navigate } from "react-router-dom";

const Delta = Quill.import("delta");

export default function CreateBlogPage() {
    const [blogTitle, setBlogTitle] = useState("");

    // NOTE: body is in the form of quillDelta
    const [blogBody, setBlogBody] = useState(null);
    const [blogSubmitted, setBlogSubmitted] = useState(false);

    // Use a ref to access the quill instance directly
    const quillRef = useRef();
    useEffect(() => {
        setBlogBody(quillRef.current.getContents());
    }, []);

    async function handlePublishBlog(publishStatus = false) {
        const publishUrl = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/posts`;
        const bodyContent = {
            title: blogTitle,
            content: JSON.stringify(blogBody),
        };

        if (publishStatus === true) {
            bodyContent.published = true;
        }

        const response = await fetch(publishUrl, {
            mode: "cors",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editToken")}`,
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

    return (
        <>
            {blogSubmitted ? (
                <Navigate to="/" />
            ) : (
                <div className={styles.createBlogPage}>
                    <div className={styles.homeButtonContainer}>
                        <HomeButton />
                    </div>
                    <div className={styles.createBlogHeader}>
                        Create New Blog
                    </div>
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
                            defaultValue={new Delta()
                                .insert("Your Topic")
                                .insert("\n", { header: 1 })
                                .insert("Write your beautiful blog here...")}
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
