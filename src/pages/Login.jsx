import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
import "../css/login.css"
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className="container">
            <div className="login-container">
                <form className="login" id="login-form">
                    <h1>
                        Login
                    </h1>
                    <label>
                        <input className="email-address" placeholder="Email Address"/>
                    </label>
                    <label>
                        <input className="password" placeholder="Password"/>
                    </label>
                    <label>
                        <input type="checkbox" className="remember-me"/>
                        Remember me
                    </label>

                    <a href="ForgotPassword.jsx" className="forget-password">Forgot password?</a>

                    <button className="login-button">Login</button>

                    If you don't have an account yet, please
                    <Link to="/register"> register here</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;