import React from "react";
import {Link} from "react-router-dom";
import RotatingGlobe from "../components/RotatingGlobe.jsx";

function Welcome() {
    return(
        <div className="welcome">
            <RotatingGlobe/>
            <h1>Welcome to Travel Buddy!</h1>
            <p>Your ultimate travel companion.</p>
            <p>Explore, plan, and share your travel experiences with us.</p>
            <p>Join our community and start your adventure today!</p>
            <p>Already have an account?</p>

            <Link className="link" to="/login">Login here</Link>
            <Link className="link" to="/register">Register here</Link>
        </div>
    );
}

export default Welcome;