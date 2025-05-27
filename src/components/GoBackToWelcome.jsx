import {Link} from "react-router-dom";
import React from "react";

export default function GoBackToMain() {
    return (
        <div className="back-link">
            <Link to="/" className="back-link-a">Go Back to Welcome Page</Link>
        </div>
    );

}