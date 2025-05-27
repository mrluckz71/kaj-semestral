import React from "react";
import {Link} from "react-router-dom";
import RotatingGlobe from "../components/RotatingGlobe.jsx";

function Welcome() {
    return(
        <div className="welcome">
            <RotatingGlobe/>
            <div className="welcome-header">
                <h1>Welcome to Travel Buddy!</h1>
                <p>Join our community and start your adventure today!</p>
            </div>
            <div className="welcome-buttons">
                <p>Already have an account?</p>
                <Link className="link" to="/login">Login here</Link>
                <span>or</span>
                <Link className="link" to="/register">Register here</Link>
            </div>
        </div>
    );
}

export default Welcome;