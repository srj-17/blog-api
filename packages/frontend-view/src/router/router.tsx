import { createBrowserRouter } from "react-router-dom";
import App from "../pages/home/App";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Profile from "../pages/profile/Profile";
import BlogPage from "../pages/blog/BlogPage";
import Users from "../pages/users/Users";
import BlogsPage from "../pages/blogs/BlogsPage";
import ErrorPage from "../pages/error/ErrorPage";

const router = createBrowserRouter([
    {
        index: true,
        element: <App />,
        errorElement: (
            <ErrorPage
                statusCode={404}
                message="Requested Page is Not Found."
            />
        ),
    },
    { path: "signup", element: <Signup /> },
    { path: "login", element: <Login /> },
    { path: "users", element: <Users /> },
    { path: "users/:userId", element: <Profile /> },
    { path: "blogs", element: <BlogsPage /> },
    { path: "blogs/:blogId", element: <BlogPage /> },
]);

export default router;
