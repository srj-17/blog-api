import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

createRoot(document.getElementById("root") as Container).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
