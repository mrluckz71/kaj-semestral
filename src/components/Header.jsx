import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../css/layout.css";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

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
            <h1>Travel Diary</h1>
            <nav>
                <ul className="header-nav-links">
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