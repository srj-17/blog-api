import "./App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <>
            This is the homepage. <Link to="login"> Log In </Link>
        </>
    );
}

export default App;
