import React from "react";

const RadioOption = ({ question, order, onAnswerChange }) => {
  const handleOptionChange = (id) => {
    onAnswerChange(id);
  };

  const optionLabels = ["A", "B", "C", "D", "E"];

  return (
    <div className="p-5">
      <p className="font-extrabold text-lg">
        {order}. {question.question}
      </p>
      <div className="mt-2 flex flex-col gap-3">
        {question.answers.map((answer, index) => (
          <div key={answer.id} className="flex items-center">
            <span className="mr-2 p-[5px] rounded-full bg-gray-100">
              {optionLabels[index]}
            </span>
            <input
              type="radio"
              id={`option-${answer.id}`}
              name={`question-${question.id}`}
              value={answer.id}
              onChange={() => handleOptionChange(answer.id)}
            />
            <label htmlFor={`option-${answer.id}`} className="ml-2">
              {answer.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioOption;
