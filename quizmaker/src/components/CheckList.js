import React from "react";
import Check from "./Check";
import "../App.css";
const CheckList = ({ clicked, setIndex }) => {
  return (
    <div className="checkParent">
      {clicked.map((ele, index) => {
        return <Check num={ele} index={index} setIndex={setIndex} />;
      })}
    </div>
  );
};

export default CheckList;
