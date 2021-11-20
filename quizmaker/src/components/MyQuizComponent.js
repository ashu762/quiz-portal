import React, { useRef, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

import "../index.css";

import { deleteMyQuiz, myListQuiz } from "../actions/quizActions";
import { Loader } from "semantic-ui-react";

const MyQuizComponent = ({ quizDetails }) => {
  const colorClass = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const index = Math.floor(Math.random() * colorClass.length);
  const chosen = colorClass[index];
  const d = Date(quizDetails.createdAt).split(" ");
  const D = d[0] + " " + d[1] + " " + d[2] + " " + d[3];
  const dispatch = useDispatch();
  const deleteQuiz = useSelector((state) => state.deleteQuiz);

  const history = useHistory();

  const { loading, success } = deleteQuiz;
  const firstUpadte = useRef(true);

  useLayoutEffect(() => {
    if (firstUpadte.current) {
      firstUpadte.current = false;
      return;
    }
    if (success) {
      dispatch(myListQuiz());
    }
  }, [success]);
  const deleteHandler = () => {
    dispatch(deleteMyQuiz(quizDetails._id));
  };

  const onViewButtonClick = () => {
    history.push({
      pathname: `/quiz/details/${quizDetails._id}`,
      state: quizDetails,
    });
  };

  return (
    <div>
      {loading && <Loader />}
      <div className={chosen}>
        <div className="quiz">
          <div className="quiz-title">{quizDetails.name}</div>
          <div className="quiz-description">{quizDetails.description}</div>
          <div className="quiz-footer">
            <div>{D}</div>
            <div>{quizDetails.author}</div>
          </div>
          <Link to={`quiz/${quizDetails._id}`} className="link quiz-btn">
            Play Now
          </Link>
          <div className="deleteQuiz" onClick={deleteHandler}>
            Delete
          </div>
          <Button onClick={onViewButtonClick}>View</Button>
        </div>
      </div>
    </div>
  );
};

export default MyQuizComponent;
