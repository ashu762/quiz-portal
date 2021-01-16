import React, { useState } from "react";
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
}) => {
  console.log(question);
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
      </div>
      <button onClick={() => setIndex(indexNum - 1)}>prev</button>
      <button onClick={() => setIndex(indexNum + 1)}>next</button>
    </div>
  );
};

export default Question;
