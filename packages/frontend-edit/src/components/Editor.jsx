import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";

// Editor is an uncontrolled React component
export default function Editor({
    // this ref is the quillRef that we passed from parent
    ref,
    defaultValue,
    setBlogBody,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );
        const quill = new Quill(editorContainer, {
            theme: "snow",
        });

        ref.current = quill;

        if (defaultValue) {
            quill.setContents(defaultValue);
        }

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setBlogBody(ref.current.getContents());
        });

        return () => {
            ref.current = null;
            container.innerHTML = "";
        };
    }, [ref]);

    return <div ref={containerRef}></div>;
}
