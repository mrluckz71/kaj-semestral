import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import React, {useState} from "react";
import "../css/login.css"
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (!user) {
            setError("Invalid credentials. Please try again.");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/travels");
    };
    return (
        <div className="container">
            <div className="login-container">
                <form className="login" id="login-form" onSubmit={handleLogin}>
                    <h1>
                        Login
                    </h1>
                    <label>
                        <input
                            className="email-address"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">{error}</p>}
                    <label>
                        <input type="checkbox" className="remember-me"/>
                        Remember me
                    </label>

                    <a href="/forget" className="forget-password">Forgot password?</a>

                    <button className="login-button" type="submit">Login</button>

                    If you don't have an account yet, please
                    <Link to="/register"> register here</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;