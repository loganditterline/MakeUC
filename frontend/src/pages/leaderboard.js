import React from 'react';
import '../styles/leaderboard.css';
import SideNav from '../assets/side-nav';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
    const example_data = [
        { name: "Logan", score: 23 },
        { name: "Jason", score: 21 },
        { name: "Shreyes", score: 19 }
    ];

    return (
        <div className="home-main-div">
            <SideNav name='this-one'></SideNav>
            <div className="home-center-box">
                <div className="welcome-banner">🐒OUR TOP MONKEYS🐒</div>
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Number of Lessons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {example_data.map((val, key) => {
                            return (
                                <tr key={key} className={key % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{val.name}</td>
                                    <td>{val.score}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
