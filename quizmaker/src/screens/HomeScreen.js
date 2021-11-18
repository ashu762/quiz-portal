import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { useDispatch, useSelector } from "react-redux";
import { listQuiz } from "../actions/quizActions";
import Message from "../components/Message";
import Loaders from "../components/Loaders";

import EmptyScreen from "../components/EmptyScreen";

import "../index.css";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/layout";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const quizList = useSelector((state) => state.quizList);
  const { loading, error, quiz } = quizList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ref = useRef(null);

  const toast = useToast();

  useEffect(() => {
    dispatch(listQuiz());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.deleted && !ref.current) {
      ref.current = true;
      toast({
        status: "success",
        position: "top-right",
        duration: 1000,
        render: () => (
          <Box p={3} bg="blue.500" className="toastBox">
            Quiz Deleted Successful
          </Box>
        ),
      });
    }
  }, [location.state]);
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
