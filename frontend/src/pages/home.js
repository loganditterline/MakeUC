import React from 'react';
import '../styles/home.css';
import SideNav from '../assets/side-nav';

function Home() {
    return (
        <div className="home-main-div">
            <SideNav name='this-one'></SideNav>
            <div className="home-center-box">
                <div className="welcome-banner">🍌WELCOME TO BANANA CENTRAL🍌</div>
                <button id="daily-lesson" href="#master">Complete Your Daily Lesson</button>
            </div>
        </div>
    );
}

export default Home;
