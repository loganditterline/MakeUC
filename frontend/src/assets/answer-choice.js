import React, { useState, useRef, useEffect } from 'react';
import '../styles/answer-choice.css';

const AnswerChoice = ({ answer, explanation, correct }) => {
    const [isActive, setIsActive] = useState(false);
    const choiceRef = useRef(null);

    const color = correct ? 'green' : 'red';

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (choiceRef.current && !choiceRef.current.contains(e.target)) {
                setIsActive(false);
            }
        };

        if (isActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive]);

    return (
        <div
            ref={choiceRef}
            className={`answer-choice ${isActive ? 'active' : ''} ${color}`}
            onClick={toggleActive}
        >
            {!isActive && (
                <div className="answer">
                    {answer}
                </div>
            )}
            {isActive && explanation && (
                <div className="explanation">
                    {explanation}
                </div>
            )}
        </div>
    );
}

export default AnswerChoice;
