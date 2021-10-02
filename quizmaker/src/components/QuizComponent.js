import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
const QuizComponent = ({ quizDetails }) => {
  const colorClass = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const index = Math.floor(Math.random() * colorClass.length);
  const chosen = colorClass[index];
  const d = Date(quizDetails.createdAt).split(" ");
  const D = d[0] + " " + d[1] + " " + d[2] + " " + d[3];
  console.log(d);
  return (
    <div>
      <div className={chosen}>
        <div className="quiz">
          <div className="quiz-title">{quizDetails.name}</div>
          <div className="quiz-description" title={quizDetails.description}>
            {quizDetails.description}
          </div>
          <div class="quiz-footer">
            <div>{D}</div>
            <div>{quizDetails.author}</div>
          </div>
          <Link to={`quiz/${quizDetails._id}`} className="link quiz-btn">
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
