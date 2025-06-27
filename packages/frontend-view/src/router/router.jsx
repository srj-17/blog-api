import { createBrowserRouter } from "react-router-dom";
import App from "../components/pages/home/App";
import ErrorElement from "../components/ErrorElement";
import Login from "../components/pages/login/Login";
import Signup from "../components/pages/signup/Signup";
import Profile from "../components/pages/profile/Profile";

const router = createBrowserRouter([
    { index: true, element: <App />, errorElement: <ErrorElement /> },
    { path: "signup", element: <Signup /> },
    { path: "login", element: <Login /> },
    { path: "users/:userId", element: <Profile /> },
]);

export default router;
