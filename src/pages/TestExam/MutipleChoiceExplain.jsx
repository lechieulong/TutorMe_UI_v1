import React from "react";

const MutipleChoiceExplain = ({ question, renderLetter }) => {
  return (
    <div className="flex flex-col gap-2">
      {question.answers.map((answer, index) => {
        const userAnswer = question.userAnswer.find(
          (userAns) => userAns.answerId === answer.id
        );

        const borderStyle = userAnswer
          ? userAnswer.isCorrect === 1
            ? answer.isCorrect === 1
              ? "border-green-500"
              : "border-red-500"
            : answer.isCorrect === 1
            ? "border-red-500"
            : "border-gray-300"
          : answer.isCorrect === 1
          ? "border-red-500"
          : "border-gray-300";

        return (
          <div
            key={answer.id}
            className={`flex gap-2 justify-start border-2 rounded p-2 ${borderStyle}`}
          >
            <p className="font-semibold">{renderLetter(index + 1)}</p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={userAnswer?.isCorrect === 1} // User chọn hay không
                disabled
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-800">{answer.answerText}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default MutipleChoiceExplain;
