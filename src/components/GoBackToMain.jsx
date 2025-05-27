import {Link} from "react-router-dom";
import React from "react";

export default function GoBackToMain() {
    return (
        <div className="back-link">
            <Link to="/travels" className="back-link-a">Go Back to Travel List</Link>
        </div>
    );

}