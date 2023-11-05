import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/home.css';
import SideNav from '../assets/side-nav';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom'; // Import useHistory instead of useNavigate

function Home() {
    const navigate = useNavigate();
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // const history = useHistory(); // Use useHistory hook for navigation

    const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });

    if(isAuthenticated) {
        console.log(user)
        fetch('/create_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.sub }),
        });
    }

    const goMaster = () => {
        navigate('/master'); 
      };

    return (
        <div className="home-main-div">
            <SideNav name='this-one'></SideNav>
            <div className="home-center-box">
                {isAuthenticated ? (
                    <>
                    <div className="welcome-banner">🍌WELCOME TO BANANA CENTRAL🍌</div>
                    <button id="daily-lesson" onClick={() => {goMaster()}}>Complete Your Lesson</button>
                    <button className="btn-margin" onClick={logoutWithRedirect}>Logout</button>
                    </>
                ) : (
                    <>
                    <div className="welcome-banner">🍌WELCOME TO BANANA CENTRAL🍌</div>
                    <div className="loginInstructions">Please log in</div>
                    <button className="btn-margin" onClick={loginWithRedirect}>Log in</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
