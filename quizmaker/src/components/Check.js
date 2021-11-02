import React from "react";
import "../App.css";
const Check = ({ num, index, setIndex }) => {
  const setClickHandler = (e) => {
    setIndex(index);
  };
  return (
    <div
      className={
        num ? "checkedQuestion check-container" : "unchecked check-container"
      }
    >
      <div onClick={() => setClickHandler()} className="checked">
        {/* {num === 1 ? "Correct" : num === 2 ? "Incorrect" : "Unanswered"} */}
        {index + 1}
      </div>
    </div>
  );
};

export default Check;
