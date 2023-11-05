import React from 'react';
import '../styles/question.css';
import AnswerChoice from '../assets/answer-choice';

function Question({ question, answerChoices, explanations, correctAnswer }) {

    // answerChoices = ["one", "two", "three", "four"]
    // explanations = ["explain one", "explain two", "explain three", "explain four"]
    // Convert letter answer to a number
    correctAnswer = correctAnswer - 'a'
    // TESTING VALUE
    // correctAnswer = 3

    return (
        <div className="question-main-div">
            <div className="question-center-box">
                <div className="question-box">
                    <div className="centered-content">
                        <p>{question}</p>
                    </div>
                </div>
                <div className="answer-choices">
                    <AnswerChoice answer={ answerChoices[0] } explanation={ explanations[0] } correct={ correctAnswer === 0 }/>
                    <AnswerChoice answer={ answerChoices[1] } explanation={ explanations[1] } correct={ correctAnswer === 1 }/>
                    <AnswerChoice answer={ answerChoices[2] } explanation={ explanations[2] } correct={ correctAnswer === 2 }/>
                    <AnswerChoice answer={ answerChoices[3] } explanation={ explanations[3] } correct={ correctAnswer === 3 }/>
                </div>
            </div>
            <div className="next-button">
                <span>Next</span>
            </div>
        </div>
    );
}

export default Question;
