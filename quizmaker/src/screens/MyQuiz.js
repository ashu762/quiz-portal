import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { useDispatch, useSelector } from "react-redux";
import { myListQuiz } from "../actions/quizActions";
import Message from "../components/Message";
import Loaders from "../components/Loaders";
import "../index.css";
const MyQuiz = () => {
  const dispatch = useDispatch();
  const myQuizList = useSelector((state) => state.myQuizList);
  const { loading, error, myQuiz } = myQuizList;
  useEffect(() => {
    dispatch(myListQuiz());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h1 className="quizzes-title">Quizzes</h1>
        {loading ? (
          <Loaders></Loaders>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="quiz-container">
            {myQuiz.map((ele) => (
              <QuizComponent quizDetails={ele} key={ele._id}></QuizComponent>
            ))}
          </div>
        )}
      </div>
      )
    </div>
  );
};

export default MyQuiz;
