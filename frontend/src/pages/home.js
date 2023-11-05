import React from 'react';
import '../styles/home.css';
import SideNav from '../assets/side-nav';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goMaster = () => {
        navigate('/master'); 
      };

    return (
        <div className="home-main-div">
            <SideNav name='this-one'></SideNav>
            <div className="home-center-box">
                <div className="welcome-banner">🍌WELCOME TO BANANA CENTRAL🍌</div>
                <button id="daily-lesson" onClick={goMaster}>Complete Your Lesson</button>
            </div>
        </div>
    );
}

export default Home;
