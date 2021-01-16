import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
const QuizComponent = ({ quizDetails }) => {
  const colorClass = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const index = Math.floor(Math.random() * colorClass.length);
  const chosen = colorClass[index];
  return (
    <div>
      <div className={chosen}>
        <div className="quiz">
          <div className="quiz-title">{quizDetails.name}</div>
          <div className="quiz-description">{quizDetails.description}</div>

          <Link to={`quiz/${quizDetails._id}`} className="link">
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
