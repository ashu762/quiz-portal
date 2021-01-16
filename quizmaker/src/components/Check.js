import React from "react";
import "../App.css";
const Check = ({ num, index, setIndex }) => {
  const setClickHandler = (e) => {
    console.log(index);
    setIndex(index);
  };
  return (
    <div class="check-container">
      <button onClick={() => setClickHandler()} className="checked">
        {num === 1 ? "Correct" : num === 2 ? "Incorrect" : "Unanswered"}
      </button>
    </div>
  );
};

export default Check;
