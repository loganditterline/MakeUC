import React from 'react';
import '../styles/question.css';
import AnswerChoice from '../assets/answer-choice';

function Question({ question, answerChoices, explanations, correctAnswer }) {
    // Convert letter answer to a number
    if(correctAnswer === 'a' || correctAnswer === 'A') {
        correctAnswer = 0
    } else if(correctAnswer === 'b' || correctAnswer === 'B') {
        correctAnswer = 1
    } else if(correctAnswer === 'c' || correctAnswer === 'C') {
        correctAnswer = 2
    } else {
        correctAnswer = 3
    }

    return (
        <div className="question-main-div">
            <div className="question-center-box">
                <div className="question-box">
                    <div className="centered-content" dangerouslySetInnerHTML={{ __html: question}}>
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
