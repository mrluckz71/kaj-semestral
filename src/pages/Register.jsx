import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase.js";
import GoBackToWelcome from "../components/GoBackToWelcome.jsx";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Please make sure your passwords match.");
            return;
        }

        try {
            console.log(email);
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate("/login");
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;
                case "auth/email-already-in-use":
                    setError("This email is already in use. Please try another one.");
                    break;
                case "auth/weak-password":
                    setError("Password should be at least 6 characters long.");
                    break;
                default:
                    setError("An error occurred. Please try again.");
                    break;
            }
        }
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
        <>
            <GoBackToWelcome />
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
                                autoFocus={true}
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
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    // check for match here
                                    handlePasswordMatch(e);
                                }}
                            />
                        </label>

                        <button type="submit" className="login-button">Register</button>

                        <div className="register-link">
                            If you already have an account, please
                            <br />
                            <Link to="/login"> login here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;