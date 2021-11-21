import React, { useEffect } from "react";
import QuestionList from "../components/QuestionList";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import Loaders from "../components/Loaders";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Countdown from "react-countdown";

const QuizPage = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [loading, setLoading] = useState(true);

  const [quizDetails, setQuizDetails] = useState();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json",
        },
      };

      const data = await axios.get(`/api/quiz/data/${match.params.id}`, config);
      setLoading(false);
      setQuizDetails(data.data);
    };

    fetchData();
  }, [userInfo]);

  const onButtonClick = () => {
    history.replace("/");
  };

  const renderer = (values) => {
    const { hours, minutes, seconds, completed, days } = values;
    if (completed) {
      return (
        <QuestionList id={match.params.id} history={history}></QuestionList>
      );
    } else {
      return (
        <span>
          {days} days {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  if (loading) {
    return <Loaders />;
  }

  const currentTime = Date.now();

  if (
    currentTime > Date.parse(quizDetails?.endTime) &&
    quizDetails?.isTimedQuiz
  ) {
    return (
      <Flex
        marginTop={"20vh"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text align="center" fontSize="2xl" mb={4}>
          The quiz has already been passed
        </Text>
        <Button width="200px" onClick={onButtonClick}>
          Play Different Quiz
        </Button>
      </Flex>
    );
  }

  if (
    currentTime < Date.parse(quizDetails?.startTime) &&
    quizDetails?.isTimedQuiz
  ) {
    return (
      <Flex
        marginTop={"20vh"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text align="center" fontSize="2xl" mb={4}>
          {"The quiz starts in  "}
          <Countdown
            date={Date.now() + Date.parse(quizDetails?.startTime) - currentTime}
            renderer={renderer}
          />
        </Text>
        <Button width="300px" onClick={onButtonClick}>
          Play Different Quiz in the meanTime
        </Button>
      </Flex>
    );
  }

  return (
    <div>
      <QuestionList id={match.params.id} history={history}></QuestionList>
    </div>
  );
};

export default QuizPage;
