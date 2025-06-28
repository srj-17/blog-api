import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="login-container">
                <LoginForm />
            </div>
            <div className="signup-container">
                Not logged in? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
}
