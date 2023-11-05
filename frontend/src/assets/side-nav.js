import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";

import '../styles/side-nav.css'; // Update the path to your CSS file for styling

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
                    <a href="#profile">Profile</a>
                    <a href="#leaderboard">Leaderboard</a>
                    <a href="#contact">Contact</a>
                </div>
            )}
        </div>
    );
}

export default SideNav;
