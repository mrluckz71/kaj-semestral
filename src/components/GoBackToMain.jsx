import {Link} from "react-router-dom";
import React from "react";

export default function GoBackToMain() {
    return (
        <div className="back-link">
            <Link to="/travels" className="back-link-a">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <path d="M18 6L10 14L18 22" stroke="#1976d2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>
        </div>
    );

}