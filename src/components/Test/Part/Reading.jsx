import React, { useState } from "react";
import FillInTheBlankQuestion from "../FillInTheBlankQuestion"; // Import your component
import MultipleChoiceQuestion from "../MutipleChoice"; // Import your component
import SelectOptions from "../SelectOptions";

const Reading = ({ partData, part, refs }) => {
  const reading = partData[part];
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  if (!reading) {
    return <p>Reading part not found.</p>;
  }

  const [answers, setAnswers] = useState({});

  const selectAnswerQuestions = reading.questions.filter(
    (question) => question.type === "matching-heading"
  );

  const otherQuestions = reading.questions.filter(
    (question) => question.type !== "matching-heading"
  );

  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  return (
    <div className="bg-green-100 h-screen p-3">
      {/* Render select-answer questions */}
      {selectAnswerQuestions.length > 0 && (
        <>
          <ul>
            {selectAnswerQuestions.map((q, index) => (
              <li key={q.id}>
                {optionLabels[index]} {q.question}
              </li>
            ))}
          </ul>
          {selectAnswerQuestions.map((q) => (
            <SelectOptions
              key={q.id}
              question={q}
              order={q.order}
              ref={(el) => (refs.current[q.id] = el)}
            />
          ))}
        </>
      )}

      {/* Render other questions */}
      {otherQuestions.map((question) => {
        if (question.type === "enter-answer") {
          return (
            <FillInTheBlankQuestion
              key={question.id}
              order={question.order}
              ref={(el) => (refs.current[question.id] = el)}
              text={question.question}
              blanks={question.blanks}
              onAnswerChange={handleAnswerChange}
            />
          );
        } else if (question.type === "multiple-choice") {
          return (
            <MultipleChoiceQuestion
              key={question.id}
              order={question.order}
              ref={(el) => (refs.current[question.id] = el)}
              question={question}
              onAnswerChange={(id) => handleAnswerChange(question.id, id)}
            />
          );
        } else {
          return <SelectOptions />;
        }
        return null;
      })}
    </div>
  );
};

export default Reading;
