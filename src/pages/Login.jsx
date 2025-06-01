import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoBackToWelcome from "../components/GoBackToWelcome.jsx";

// Login Page
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
        }
        // Error handling not working well
        catch (error) {
            console.error("Login error:", error.code);
            switch (error.code) {
                case "auth/invalid-credential":
                    setError("Incorrect email or password. Please try again.");
                    break;
                case "auth/missing-password":
                    setError("Please enter your password.");
                    break;
                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;
                default:
                    setError("An error occurred. Please try again.");
                    break;
            }
        }
    };
    return (
        <>
            <GoBackToWelcome />
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
                            required
                            autoFocus={true}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="password"
                            placeholder="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">{error}</p>}


                    {/*<label className="remember-me-label">*/}
                    {/*    <input type="checkbox" className="remember-me-checkbox" />*/}
                    {/*        Remember me*/}
                    {/*</label>*/}


                    <button className="login-button" type="submit">Login</button>

                    {/*<div className="forgot-password">*/}
                    {/*    <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>*/}
                    {/*</div>*/}

                    <div className="register-link">
                        <p>If you don't have an account yet, please
                            <br />
                            <Link to="/register">register here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;