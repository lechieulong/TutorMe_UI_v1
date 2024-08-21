/* eslint-disable react/prop-types */
import React from "react";
import Reading from "../../components/Test/Part/Reading";

const Answer = ({ part, partData, refs }) => {
  return (
    <div>
      <Reading partData={partData} part={part} ref={refs} />
    </div>
  );
};

export default Answer;
