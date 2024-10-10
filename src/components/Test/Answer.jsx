import React from "react";
import Reading from "../../components/Test/Part/Reading";
import Writing from "../../components/Test/Part/Writing";
import Listening from "../../components/Test/Part/Listening";
import Speaking from "../../components/Test/Part/Speaking";

const Answer = ({ skillPart, partData, refs }) => {
  const englishPart = {
    READING: "Reading",
    LISTENING: "Listening",
    WRITING: "Writing",
    SPEAKING: "Speaking",
  };
  console.log(partData);

  return (
    <div>
      {skillPart === englishPart.READING && (
        <Reading partData={partData} refs={refs} />
      )}
      {skillPart === englishPart.LISTENING && (
        <Listening partData={partData} refs={refs} />
      )}
      {skillPart === englishPart.WRITING && <Writing partData={partData} />}
      {skillPart === englishPart.SPEAKING && <Speaking partData={partData} />}
    </div>
  );
};

export default Answer;
