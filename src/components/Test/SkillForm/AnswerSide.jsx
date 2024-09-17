import React, { useState } from "react";
import FillInTheBlankQuestion from "../AnswerType/FillInTheBlankQuestion";
import RadioOption from "../AnswerType/RadioOption";

const AnswerSide = ({ parts }) => {
  console.log(parts);

  return (
    <div className="bg-green-50 h-screen p-3">
      {parts.map((part, partIndex) => (
        <div key={partIndex}>
          {part.questionTypePart.map((qType, qTypeIndex) => (
            <div key={qTypeIndex}>
              <p>Question Guide: {qType.questionGuide}</p>
              <div>
                {qType.questions.map((q, qIndex) => {
                  switch (qType.questionType) {
                    case "multiple-choice":
                      return (
                        <RadioOption
                          key={qIndex}
                          question={q}
                          onAnswerChange={(id) => console.log(id)}
                        />
                      );
                    case "enter-answer":
                      return (
                        <FillInTheBlankQuestion
                          key={qIndex}
                          text={q.questionName}
                          blanks={q.answer}
                          onAnswerChange={(id, value) => console.log(id, value)}
                        />
                      );
                    default:
                      return <p key={qIndex}>Unsupported question type</p>;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnswerSide;
