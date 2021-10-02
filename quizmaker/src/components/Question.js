import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../App.css";

const Question = ({
  question,
  score,
  setScore,
  indexNum,
  checked,
  setChecked,
  setIndex,
  clicked,
  setClicked,
  questionLength,
  history,
  setHaveFinished,
}) => {
  const setClickhandler = (index) => {
    if (clicked[indexNum]) return;
    setClicked(
      clicked.map((item, ind) => {
        return ind == indexNum ? true : item;
      })
    );
    if (index === question.correctOption) {
      setChecked(
        checked.map((item, ind) => {
          return ind === indexNum ? 1 : item;
        })
      );
      setScore(score + 1);
    } else {
      setChecked(
        checked.map((item, index) => {
          return index === indexNum ? 2 : item;
        })
      );
    }
  };
  function setFinished() {
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
                clicked[indexNum] && question.correctOption === index
                  ? "green option"
                  : clicked[indexNum]
                  ? "red option"
                  : "option"
              }
            >
              {option}
            </button>
          );
        })}
        <div class="buttons">
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
