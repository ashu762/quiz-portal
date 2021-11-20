import React, { useState, useEffect } from "react";
import CheckList from "./CheckList";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import Question from "./Question";
import Message from "../components/Message";
import Loaders from "./Loaders";
import NoQuestion from "../components/NoQuestion";

import { listQuestions } from "../actions/quizActions";
import { Box } from "@chakra-ui/layout";
const QuestionList = ({ id, history }) => {
  const [questionLength, setQuestionLength] = useState(-1);
  const [index, setIndex] = useState(0);
  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;
  const [clicked, setClicked] = useState([]);
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [haveFinished, setHaveFinished] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listQuestions(id));
  }, []);

  useEffect(() => {
    if (questions) {
      setQuestionLength(questions.length);
      setClicked(new Array(questions.length).fill(0));
      setAnswers(new Array(questions.length).fill({}));
    }
  }, [questions]);

  return (
    <div>
      {loading ? (
        <Loaders></Loaders>
      ) : error ? (
        <Message variant="danger">Please try again later</Message>
      ) : haveFinished ? (
        <div className="score">
          <Box>Your response has been successfully submitted</Box>
          <a href="/" className="link2Home">
            Play Another Quiz
          </a>
        </div>
      ) : questionLength > 0 ? (
        <div className="quizList">
          <div className="question-number">Question No. {index + 1}</div>
          <div className="quiz-content">
            <Question
              question={questions[index]}
              indexNum={index}
              setIndex={setIndex}
              clicked={clicked}
              setClicked={setClicked}
              questionLength={questionLength}
              setAnswers={setAnswers}
              answers={answers}
              id={id}
              setHaveFinished={setHaveFinished}
            />
          </div>

          <div className="quiz-details">
            <div style={{ height: "calc(100vh - 120px)" }}>
              <CheckList clicked={clicked} setIndex={setIndex} />
            </div>
          </div>
        </div>
      ) : (
        <NoQuestion />
      )}
    </div>
  );
};

export default QuestionList;
