import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <nav>
                <ul>
                    <li>&copy; 2025 Travel Diary</li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                    <li><Link to="/terms">Terms and Conditions</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Footer