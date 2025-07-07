import { createBrowserRouter } from "react-router-dom";
import App from "../pages/home/App.jsx";
import EditBlogPage from "../pages/editBlog/EditBlogPage";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup.jsx";
import CreateBlogPage from "../pages/createBlog/CreateBlogPage";

const router = createBrowserRouter([
    {
        index: true,
        element: <App />,
        errorElement: (
            <ErrorPage statusCode={404} message="Requested page not found" />
        ),
    },
    { path: "edit/:blogId", element: <EditBlogPage /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "create", element: <CreateBlogPage /> },
]);

export default router;
