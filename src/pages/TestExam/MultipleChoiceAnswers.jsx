import React from "react";

const MultipleChoiceAnswers = ({
  question,
  userAnswers,
  renderLetter,
  handleChangeWrap,
  skill,
  partData,
}) => (
  <div className="flex flex-col gap-2">
    {question.answers.map((answer, index) => (
      <div className="flex gap-2 justify-start items-center" key={answer.id}>
        <p className="font-semibold">{renderLetter(index + 1)}</p>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={answer.answerText}
            checked={
              userAnswers[question.id]?.answers?.some(
                (ans) => ans.answerId === answer.id
              ) || false
            }
            onChange={(e) =>
              handleChangeWrap(e, skill, partData.id, question.id, answer.id)
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-800">{answer.answerText}</span>
        </label>
      </div>
    ))}
  </div>
);

export default MultipleChoiceAnswers;
