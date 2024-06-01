import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-container">
                    <Link to="/" className='navbar-logo'>Logo</Link>
                </div>
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li lassName="navbar-item">
                        <Link to="/dbm" className="navbar-link">Database</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/userInfo" className="navbar-link">User Info</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/logout" className="navbar-link">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                            <Link to="/register" className="navbar-link">Register</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
