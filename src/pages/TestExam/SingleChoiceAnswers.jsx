import React from "react";

const SingleChoiceAnswers = ({
  question,
  userAnswers,
  renderLetter,
  handleChangeWrap,
  skill,
  partData,
  sectionType,
}) => (
  <div className="flex flex-col gap-2">
    <p className="text-green-900 font-medium">
      {question.questionOrder} {question.questionName}
    </p>
    {question.answers.map((answer, index) => (
      <div className="flex gap-2 justify-start" key={answer.id}>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`question-${question.id}`} // ensures only one option is selected per question
            value={answer.answerText}
            checked={
              userAnswers[question.id]?.answers?.some(
                (ans) => ans.answerId === answer.id
              ) || false
            }
            onChange={(e) =>
              handleChangeWrap(
                e,
                skill,
                partData.id,
                question.id,
                answer.id,
                sectionType
              )
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <p className="text-gray-800 text-[15px]">{answer.answerText}</p>
        </label>
      </div>
    ))}
  </div>
);

export default SingleChoiceAnswers;
