import React from "react";

import "./noQuestion.css";

const NoQuestion = () => {
  return (
    <div className="noQuestionContainer">
      <div className="noQuestionTitle">No questions found for this Quiz</div>
      <img
        src="images/noquestion.svg"
        alt="No Questions found"
        className="noQuestionImg"
      ></img>
    </div>
  );
};

export default NoQuestion;
