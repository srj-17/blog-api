import { StrictMode } from "react";
import { createRoot, type Container } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

createRoot(document.getElementById("root") as Container).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
