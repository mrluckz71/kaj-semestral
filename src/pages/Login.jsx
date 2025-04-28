import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            // Store user data in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify({ email }));
            // Redirect to the travel list page
            navigate("/travels");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("User not found. Please register.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
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