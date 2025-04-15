import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="header">
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li><Link to="/add-travel">Add travel</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    );
}
export default Header;