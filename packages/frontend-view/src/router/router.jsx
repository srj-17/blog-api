import { createBrowserRouter } from "react-router-dom";
import App from "../pages/home/App";
import ErrorElement from "../components/ErrorElement";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Profile from "../pages/profile/Profile";
import BlogPage from "../pages/blog/BlogPage";
import Users from "../pages/users/Users";

const router = createBrowserRouter([
    { index: true, element: <App />, errorElement: <ErrorElement /> },
    { path: "signup", element: <Signup /> },
    { path: "login", element: <Login /> },
    { path: "users", element: <Users /> },
    { path: "users/:userId", element: <Profile /> },
    { path: "blogs/:blogId", element: <BlogPage /> },
]);

export default router;
