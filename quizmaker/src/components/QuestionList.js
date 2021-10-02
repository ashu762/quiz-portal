import React, { useState, useEffect } from "react";
import CheckList from "./CheckList";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import Question from "./Question";
import Message from "../components/Message";
import Loaders from "./Loaders";
import NoQuestion from "../components/NoQuestion";

import { listQuestions } from "../actions/quizActions";
const QuestionList = ({ id, history }) => {
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState([]);
  const [questionLength, setQuestionLength] = useState(-1);
  const [index, setIndex] = useState(0);
  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;
  const [clicked, setClicked] = useState([]);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [haveFinished, setHaveFinished] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    console.log(id);
    dispatch(listQuestions(id));
  }, []);
  useEffect(() => {
    if (questions) {
      setQuestionLength(questions.length);
      setChecked(new Array(questions.length).fill(0));
      setClicked(new Array(questions.length).fill(0));
    }
  }, [questions]);

  return (
    <div>
      {loading ? (
        <Loaders></Loaders>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : haveFinished ? (
        <div className="score">
          <div className="scorecard">{`You have scored ${score} points out of ${questions.length}`}</div>
          <a href="/" className="link2Home">
            Play Another Quiz
          </a>
        </div>
      ) : questionLength > 0 ? (
        <div className="quizList">
          <div className="quiz-content">
            <Question
              question={questions[index]}
              score={score}
              setScore={setScore}
              indexNum={index}
              setIndex={setIndex}
              checked={checked}
              setChecked={setChecked}
              clicked={clicked}
              setClicked={setClicked}
              questionLength={questionLength}
              history={history}
              setHaveFinished={setHaveFinished}
            />
          </div>

          <div className="line"></div>
          <div className="quiz-details">
            <div className="quizScore">Total Score: {score}</div>
            <CheckList checked={checked} setIndex={setIndex} />
          </div>
        </div>
      ) : (
        <NoQuestion />
      )}
    </div>
  );
};

export default QuestionList;
