import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { useDispatch, useSelector } from "react-redux";
import { listQuiz } from "../actions/quizActions";
import Message from "../components/Message";
import Loaders from "../components/Loaders";

import EmptyScreen from "../components/EmptyScreen";

import "../index.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const quizList = useSelector((state) => state.quizList);
  const { loading, error, quiz } = quizList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listQuiz());
  }, [dispatch]);
  return (
    <div>
      {userInfo ? (
        <div>
          <h1 className="quizzes-title">Quizzes</h1>
          {loading ? (
            <Loaders></Loaders>
          ) : error ? (
            <Message variant="danger">
              Server Error. Please try again later
            </Message>
          ) : (
            <div className="quiz-container">
              {quiz.map((ele) => (
                <QuizComponent quizDetails={ele} key={ele._id}></QuizComponent>
              ))}
            </div>
          )}
        </div>
      ) : (
        <EmptyScreen />
      )}
    </div>
  );
};

export default HomeScreen;
