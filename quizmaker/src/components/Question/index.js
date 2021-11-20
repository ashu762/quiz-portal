import React from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";

import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";

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
          <Box>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" ml={8}>
                      Show More
                    </Box>
                    <AccordionIcon mr={8} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} ml={8}>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {question.hint}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
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
