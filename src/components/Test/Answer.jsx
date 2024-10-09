import React from "react";
import Reading from "../../components/Test/Part/Reading";
import Writing from "../../components/Test/Part/Writing";
import Listening from "../../components/Test/Part/Listening";
import Speaking from "../../components/Test/Part/Speaking";

const Answer = ({ skillPart, part, partData, refs }) => {
  const englishPart = {
    READING: "Reading",
    LISTENING: "Listening",
    WRITING: "Writing",
    SPEAKING: "Speaking",
  };

  return (
    <div>
      {skillPart === englishPart.READING && (
        <Reading partData={partData} part={part} refs={refs} />
      )}
      {skillPart === englishPart.LISTENING && (
        <Listening partData={partData} part={part} refs={refs} />
      )}
      {skillPart === englishPart.WRITING && (
        <Writing partData={partData} part={part} />
      )}
      {skillPart === englishPart.SPEAKING && (
        <Speaking partData={partData} part={part} />
      )}
    </div>
  );
};

export default Answer;
