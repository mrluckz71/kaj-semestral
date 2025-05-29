import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../css/layout.css";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import OnlineStatus from "./OnlineStatus.jsx";

function Header({ trips = [] }) {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(open => !open);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        // Check localStorage for logged-in user
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            setLoggedInUser(user.email);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Clear localStorage
            localStorage.removeItem("loggedInUser");
            // localStorage.removeItem("rememberedUser"); // if you're using remember me functionality
            setLoggedInUser(null);
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="header">
            <OnlineStatus />
            <h1><Link to="/travels" className="home-link">Travel Diary</Link></h1>

            {/* Hamburger icon */}
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                {/* Hamburger SVG */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect y="7" width="32" height="3" rx="1.5" fill="#1976d2"/>
                    <rect y="15" width="32" height="3" rx="1.5" fill="#1976d2"/>
                    <rect y="23" width="32" height="3" rx="1.5" fill="#1976d2"/>
                </svg>
            </button>

            <nav className={menuOpen ? "open" : ""}>
                <ul className="header-nav-links" onClick={closeMenu}>
                    <li><Link to="/recommended">Recommended Places</Link></li>
                    <li><Link to="/map" state={{trips}}>Show Map</Link></li>
                    <li><Link to="/add-travel">Add travel</Link></li>
                    {loggedInUser ? (
                        <>
                            <li><p>Signed in as: {loggedInUser}</p></li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="logout-button"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
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