import React from "react";
import Check from "./Check";
import "../App.css";
const CheckList = ({ checked, setIndex }) => {
  return (
    <div className="checkParent">
      {checked.map((ele, index) => {
        return <Check num={ele} index={index} setIndex={setIndex} />;
      })}
    </div>
  );
};

export default CheckList;
