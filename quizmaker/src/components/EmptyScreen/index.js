import React from "react";

import "./emptyScreen.css";

const EmptyScreen = () => {
  return (
    <div className="voidContainer">
      <div className="voidTitle">Please log in to see the content</div>
      <img src="images/empty.svg" alt="void" className="voidImg"></img>
    </div>
  );
};

export default EmptyScreen;
