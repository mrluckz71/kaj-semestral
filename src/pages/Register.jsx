import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find((user) => user.email === email)) {
            setError("User already exists.");
            return;
        }

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/login");
    };

    const handlePasswordMatch = (e) => {
        const password = document.getElementById("register-password").value;
        const confirmPassword = e.target.value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError("");
        }
    }

    return (
        <div className="container">
            <div className="login-container">
                <form className="login" id="register-form" onSubmit={handleRegister}>
                    <h1>
                        Register
                    </h1>
                    {error && <p className="error">{error}</p>}
                    <label>
                        <input
                            id="email"
                            type="email"
                            className="email-address"
                            required
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            className="password"
                            id="register-password"
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <p id="password-strength"></p>
                    <label>
                        <input
                            type="password"
                            className="password"
                            id="confirm-register-password"
                            required
                            placeholder="Confirm Password"
                            onChange={handlePasswordMatch}
                        />
                    </label>

                    <button type="submit" className="login-button">Register</button>

                    If you already have an account, please
                    <Link to="/login"> login here</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;