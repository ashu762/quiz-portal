import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import "../index.css";
import { deleteMyQuiz } from "../actions/quizActions";
const MyQuizComponent = ({ quizDetails }) => {
  const colorClass = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const index = Math.floor(Math.random() * colorClass.length);
  const chosen = colorClass[index];
  const d = Date(quizDetails.createdAt).split(" ");
  const D = d[0] + " " + d[1] + " " + d[2] + " " + d[3];
  const dispatch = useDispatch();
  const deleteQuiz = useSelector((state) => state.deleteQuiz);

  const { error, loading, success } = deleteQuiz;
  //   useEffect(() => {
  //     if (success) {
  //       Alert("Quiz Deletion Successful");
  //     }
  //   }, [success]);
  const deleteHandler = () => {
    dispatch(deleteMyQuiz(quizDetails._id));
  };
  return (
    <div>
      <div className={chosen}>
        <div className="quiz">
          <div className="quiz-title">{quizDetails.name}</div>
          <div className="quiz-description">{quizDetails.description}</div>
          <div class="quiz-footer">
            <div>{D}</div>
            <div>{quizDetails.author}</div>
          </div>
          <Link to={`quiz/${quizDetails._id}`} className="link quiz-btn">
            Play Now
          </Link>
          <div className="deleteQuiz" onClick={deleteHandler}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizComponent;
