import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyQuizComponent from "../components/MyQuizComponent";
import { useDispatch, useSelector } from "react-redux";
import { myListQuiz } from "../actions/quizActions";
import Message from "../components/Message";
import Loaders from "../components/Loaders";
import "../index.css";
import { Alert } from "react-bootstrap";
const MyQuiz = () => {
  const dispatch = useDispatch();
  const myQuizList = useSelector((state) => state.myQuizList);
  const { loading, error, myQuiz } = myQuizList;
  useEffect(() => {
    dispatch(myListQuiz());
  }, [dispatch]);
  // useEffect(() => {
  //   Alert("State Changed");
  // }, [myQuiz]);
  return (
    <div>
      <div>
        <h1 className="quizzes-title">Quizzes</h1>
        {loading ? (
          <Loaders></Loaders>
        ) : error ? (
          <Message variant="danger">
            Server error. Please try again later
          </Message>
        ) : (
          <div className="quiz-container">
            {myQuiz.map((ele) => (
              <MyQuizComponent
                quizDetails={ele}
                key={ele._id}
              ></MyQuizComponent>
            ))}
          </div>
        )}
      </div>
      )
    </div>
  );
};

export default MyQuiz;
