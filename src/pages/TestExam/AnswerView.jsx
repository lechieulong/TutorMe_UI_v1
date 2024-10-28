import React from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure
import Writing from "../../components/Test/Part/Writing";
import Speaking from "../../components/Test/Part/Speaking";

const AnswerView = ({
  partData,
  currentSkillKey,
  handleAnswerChange,
  userAnswers,
}) => {
  let skill;
  switch (currentSkillKey) {
    case "reading":
      skill = 0;
      break;
    case "listening":
      skill = 1;
      break;
    case "writing":
      skill = 2;
      break;
    case "speaking":
      skill = 3;
      break;
    default:
      skill = undefined;
      break;
  }

  const handleChangeWrap = (e, skill, partId, questionId, answerId) => {
    const { type, checked, value: answerText } = e.target;

    const existingAnswers = userAnswers[questionId]?.answers || [];
    let updatedAnswers;

    if (type === "checkbox") {
      if (checked) {
        updatedAnswers = [...existingAnswers, { answerText, answerId }];
      } else {
        updatedAnswers = undefined;
      }
    } else {
      updatedAnswers = [{ answerText, answerId }];
    }

    const answerData = updatedAnswers
      ? {
          skill,
          part: partId,
          questionId,
          answers: updatedAnswers,
        }
      : undefined;

    handleAnswerChange({ questionId, answerData });
  };

  const renderLetter = (index) => {
    const letter = String.fromCharCode(96 + index);
    return letter;
  };

  const renderInputBasedOnSectionType = (sectionType, question) => {
    switch (sectionType) {
      case 1: // Multiple Choice Questions
        return (
          <div className="flex flex-col gap-2">
            {question.answers.map((answer, index) => (
              <div
                className="flex gap-2 justify-start items-center"
                key={answer.id}
              >
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
                      handleChangeWrap(
                        e,
                        skill,
                        partData.id,
                        question.id,
                        answer.id
                      )
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800">{answer.answerText}</span>
                </label>
              </div>
            ))}
          </div>
        );
      case 2: // Sentence Completion
      case 8: // Short-answer Questions
        return (
          <input
            type="text"
            placeholder="Your answer"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              handleChangeWrap(e, skill, partData.id, question.id)
            }
          />
        );
      case 9: // True/False/Not Given
        return (
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question_${question.id}`}
                value="True"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={(e) =>
                  handleChangeWrap(e, currentSkillKey, partData.id, question.id)
                }
              />
              <span>True</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question_${question.id}`}
                value="False"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={(e) =>
                  handleChangeWrap(e, currentSkillKey, partData.id, question.id)
                }
              />
              <span>False</span>
            </label>
            {sectionType === 3 && (
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value="Not Given"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  onChange={(e) =>
                    handleChangeWrap(
                      e,
                      currentSkillKey,
                      partData.id,
                      question.id
                    )
                  }
                />
                <span>Not Given</span>
              </label>
            )}
          </div>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Your answer"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              handleChangeWrap(e, skill, partData.id, question.id)
            }
          />
        );
    }
  };

  return (
    <form className="p-4 bg-white rounded shadow-md">
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
        </div>
      )}

      {(currentSkillKey === "reading" || currentSkillKey === "listening") && (
        <>
          {(() => {
            let questionCounter = 1;
            return partData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <p className="font-bold text-lg mb-2">{section.sectionGuide}</p>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  {section.sectionType === 4 ? (
                    <>
                      <table className="min-w-full border border-gray-300">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                              Heading
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.questions.map((question, index) => (
                            <tr
                              key={question.id}
                              className={
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                              }
                            >
                              <td className="border border-gray-300 px-4 py-2 text-gray-800">
                                <span className="p-2 border rounded-full mr-2">
                                  {renderLetter(index + 1)}
                                </span>
                                {question.questionName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-4">
                        {section.questions.map((question) => (
                          <div key={question.id} className="mb-4">
                            {question.answers.map((answer) => (
                              <div
                                key={answer.id}
                                className="flex items-center mb-2"
                              >
                                <span className="mr-5">
                                  {questionCounter++}
                                </span>
                                <p className="mr-2">{answer.answerText}</p>
                                <select
                                  className="border border-gray-300 rounded px-2 py-1"
                                  onChange={(e) =>
                                    handleChangeWrap(
                                      e,
                                      skill, // skill should be defined as before
                                      partData.id,
                                      question.id,
                                      answer.id // This identifies the answer that is being changed
                                    )
                                  }
                                >
                                  <option value="">Select Question ID</option>
                                  {section.questions.map((q) => (
                                    <option key={q.id} value={q.id}>
                                      {renderLetter(
                                        section.questions.indexOf(q) + 1
                                      )}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    section.questions.map((question, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-medium">
                          Question {questionCounter++}. {question.questionName}
                        </p>
                        {renderInputBasedOnSectionType(
                          section.sectionType,
                          question
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ));
          })()}
        </>
      )}

      {currentSkillKey === "writing" && (
        <Writing
          partData={partData}
          currentSkillKey={currentSkillKey}
          handleAnswerChange={handleAnswerChange}
        />
      )}
    </form>
  );
};

export default AnswerView;
