import React, { useState, useEffect } from 'react';
import Question from './question';
import '../styles/master.css'
import SideNav from '../assets/side-nav';
import Review from './review';
import { useNavigate } from 'react-router-dom/dist';

function Master() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [stats, setStats] = React.useState(null);

    useEffect(() => {
        // Send a POST request with the user ID in the request body
        fetch('/user_score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: 0 }),
        }).then((res) => {
            res.json().then((data) => {
                setStats(data.message);
            });
        });
      }, []);

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/home'); 
    }
      
    
    // Redirect when the condition is met
    const questions = [
        {
            question: "How many girls have you kissed?",
            answerChoices: ["one", "two", "three", "four"],
            explanations: ["explain one", "explain two", "explain three", "explain four"],
            correctAnswer: 'a',
        },
        {
            question: "How many boys have you kissed?",
            answerChoices: ["five", "six", "seven", "eight"],
            explanations: ["explain five", "explain six", "explain seven", "explain eight"],
            correctAnswer: 'b',
        },
        // Add more questions as needed
    ]

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if(currentQuestionIndex === questions.length) {
            goHome()
        }
    }

    console.log(stats)

    return (
        <div className="master-main-div">
            <SideNav name='side-bar'></SideNav>

            {currentQuestionIndex < questions.length && (
                <Question {...questions[currentQuestionIndex]} />
            )}
            {currentQuestionIndex === questions.length && (
                <Review stats={stats} />
            )}

            <div className="next-button" onClick={handleNextQuestion}>
                <span>Next</span>
            </div>
        </div>
    );
}

export default Master;
