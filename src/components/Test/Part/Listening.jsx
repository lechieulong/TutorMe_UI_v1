import React, { useState } from "react";
import FillInTheBlankQuestion from "../FillInTheBlankQuestion";
import RadioOption from "../AnswerType/RadioOption";

const Listening = ({ partData, part, refs }) => {
  const reading = partData.find((_, index) => index === part);

  if (!reading) {
    return <p>Reading part not found.</p>;
  }
  const [answers, setAnswers] = useState({});
  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  return (
    <div className="bg-red-100 h-screen">
      <h2 className="text-xl font-bold mb-4">{reading.name}</h2>
      {reading.questions.map((question) => {
        if (question.type === "enter-answer") {
          return (
            <FillInTheBlankQuestion
              ref={(el) => (refs.current[question.id] = el)}
              key={question.id}
              text={question.question}
              blanks={question.blanks}
              onAnswerChange={handleAnswerChange}
            />
          );
        } else if (question.type === "multiple-choice") {
          return (
            <RadioOption
              ref={(el) => (refs.current[question.id] = el)}
              key={question.id}
              question={question}
              onAnswerChange={(id) => handleAnswerChange(question.id, id)}
            />
          );
        } else {
          return <p key={question.id}>Unknown question type.</p>;
        }
      })}
    </div>
  );
};

export default Listening;
