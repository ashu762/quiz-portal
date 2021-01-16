import React from "react";
import Check from "./Check";
const CheckList = ({ checked, setIndex }) => {
  return (
    <div>
      {checked.map((ele, index) => {
        return <Check num={ele} index={index} setIndex={setIndex} />;
      })}
    </div>
  );
};

export default CheckList;
