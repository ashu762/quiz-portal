import React from "react";
import QuestionList from "../components/QuestionList";
const QuizPage = ({ match }) => {
  return (
    <div>
      <QuestionList id={match.params.id}></QuestionList>
    </div>
  );
};

export default QuizPage;
