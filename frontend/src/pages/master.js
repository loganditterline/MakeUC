import React, { useState } from 'react';
import Question from './question';
import '../styles/master.css'
import SideNav from '../assets/side-nav';
import Review from './review';
import { useNavigate } from 'react-router-dom/dist';

function Master() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/home'); 
    }

    const stats = {
        "Reading and Writing": {
            "Reading": 0,
            "Writing": 1
        },
        "Math": {
            "Algebra": 2,
            "Advanced Math": -1,
            "Problem-Solving and Data Analysis": 2,
            "Geometry and Trigonometry": 5
        }
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
