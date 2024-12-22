import React from "react";

const SingleChoiceExplain = ({ question, renderLetter }) => (
  <div className="flex flex-col gap-2">
    {question.answers.map((answer, index) => (
      <div className="flex gap-2 justify-start" key={answer.id}>
        <p className="font-semibold">{renderLetter(index + 1)}</p>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`question-${question.id}`} // ensures only one option is selected per question
            value={answer.answerText}
            checked={
              question.userAnswers &&
              question.userAnswers[0] &&
              question.userAnswers[0].answerText === answer.answerText
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-800">{answer.answerText}</span>
        </label>
      </div>
    ))}
  </div>
);

export default SingleChoiceExplain;
