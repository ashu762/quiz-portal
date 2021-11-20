import React from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";
import { ChevronDoubleDown } from "react-bootstrap-icons";
import Popup from "reactjs-popup";

import { postQuizResponse } from "../../actions/quizResponseActions.js";

import "reactjs-popup/dist/index.css";
import "../../App.css";
import "./question.css";

const Question = ({
  question,
  indexNum,
  setIndex,
  clicked,
  setClicked,
  questionLength,
  setHaveFinished,
  answers,
  setAnswers,
  id,
}) => {
  const setClickhandler = (index) => {
    const newAnswers = [...answers];
    newAnswers[indexNum] = { questionId: question._id, index };
    setAnswers(newAnswers);

    const newClicked = [...clicked];
    newClicked[indexNum] = true;
    setClicked(newClicked);
  };

  const dispatch = useDispatch();

  function setFinished() {
    dispatch(postQuizResponse(id, answers));
    setHaveFinished(true);
  }

  const Modal = () => (
    <Popup
      trigger={<div className="prev link result-button">End quiz</div>}
      modal
    >
      {(close) => (
        <div className="asdas">
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>End Quiz</h2>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            Are you sure want to complete the Quiz ?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
              padding: "5px 40px",
            }}
          >
            <div
              onClick={setFinished}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              YES
            </div>
            <div
              onClick={close}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              NO
            </div>
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    <div className="question">
      <div className="question-title">{question.question}</div>
      <div>
        {question.options.map((option, index) => {
          return (
            <button
              onClick={() => setClickhandler(index)}
              className={
                answers[indexNum].index === index ? "clicked option" : "option"
              }
            >
              {option}
            </button>
          );
        })}
        {question?.hint?.length > 0 && (
          <div className="accordion-content">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="accordion-title">
                    Show Hint <ChevronDoubleDown size={15} color="green" />
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accordion-hint">
                  {question.hint}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}

        <div className="buttons">
          {indexNum === 0 ? (
            <div></div>
          ) : (
            <div onClick={() => setIndex(indexNum - 1)} className="prev">
              prev
            </div>
          )}
          {indexNum === questionLength - 1 ? (
            <Modal />
          ) : (
            <div onClick={() => setIndex(indexNum + 1)} className="prev">
              next
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
