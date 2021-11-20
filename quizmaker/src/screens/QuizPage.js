import React, { useEffect } from "react";
import QuestionList from "../components/QuestionList";
import { useSelector } from "react-redux";
const QuizPage = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  return (
    <div>
      <QuestionList id={match.params.id} history={history}></QuestionList>
    </div>
  );
};

export default QuizPage;
