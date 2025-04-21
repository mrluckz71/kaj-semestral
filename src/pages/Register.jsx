import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";

function Register() {

    return (
        <div className="container">
            <div className="login-container">
                <form className="login" id="register-form">
                    <h1>
                        Register
                    </h1>
                    <label>
                        <input id="email" type="email" className="email-address" required placeholder="Email Address"/>
                    </label>
                    <label>
                        <input type="password" className="password" id="register-password" required placeholder="Password"/>
                    </label>
                    <p id="password-strength"></p>
                    <label>
                        <input type="password" className="password" id="confirm-register-password" required
                               placeholder="Confirm Password"/>
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