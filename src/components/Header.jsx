import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../css/layout.css";

function Header() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Získání přihlášeného uživatele z localStorage
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            setLoggedInUser(user.email);
        }
    }, []);

    return (
        <div className="header">
            <h1>Travel Diary</h1>
            <nav>
                <ul className="header-nav-links">
                    <li><Link to="/add-travel">Add travel</Link></li>
                    {loggedInUser ? (
                        <li>Signed in as: {loggedInUser}</li>
                    ) : (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
export default Header;