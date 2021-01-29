import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
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
        <div class="buttons">
          {indexNum === 0 ? (
            <div></div>
          ) : (
            <div onClick={() => setIndex(indexNum - 1)} className="prev">
              prev
            </div>
          )}
          {indexNum === questionLength - 1 ? (
            <div>
              <Link to={`/quiz/result`} className="prev link">
                See results
              </Link>
            </div>
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
