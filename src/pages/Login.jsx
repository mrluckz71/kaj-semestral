import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Login() {
    return (
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
                <a href="Register.jsx">register here</a>
            </form>
        </div>
    );
}

export default Login;