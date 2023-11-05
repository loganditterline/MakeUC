import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../styles/side-nav.css';

const SideNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
            <button className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={toggleNav}>
                <div className="hamburger-icon">
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                </div>
            </button>
            {isOpen && (
                <div className="nav-options">
                    <Link to="/home">Home</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <a href="#contact">Contact</a>
                </div>
            )}
        </div>
    );
}

export default SideNav;
