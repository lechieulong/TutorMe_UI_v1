import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure
import Writing from "../../components/Test/Part/Writing";
import Speaking from "../../components/Test/Part/Speaking";
import MultipleChoiceAnswers from "./MultipleChoiceAnswers";
import ParseHtml from "./ParseHtml";
import SingleChoiceAnswers from "./SingleChoiceAnswers";

const AnswerView = ({
  partData,
  currentSkillKey,
  currentSkillId,
  handleAnswerChange,
  userAnswers,
  selectedVoice,
  part1And3Time,
  part2Time,
  submitting,
  practiceTestData,
  nextPartHandler,
  totalPart,
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

  const handleChangeWrap = (
    e,
    skill,
    partId,
    questionId,
    answerId,
    sectionType
  ) => {
    const { type, checked, value: answerText } = e.target;

    const existingAnswers = userAnswers[questionId]?.answers || [];
    let updatedAnswers;

    if (type === "checkbox") {
      if (checked) {
        updatedAnswers = [...existingAnswers, { answerText, answerId }];
      } else {
        updatedAnswers = existingAnswers.filter(
          (ans) => ans.answerId !== answerId
        );
      }
    } else {
      updatedAnswers = [{ answerText, answerId }];
    }

    const answerData = updatedAnswers
      ? {
          skill,
          questionId,
          sectionType,
          answers: updatedAnswers,
          skillId: currentSkillId,
          partId: partData.id,
        }
      : undefined;

    handleAnswerChange({ questionId, answerData });
  };

  const renderLetter = (index) => {
    const letter = String.fromCharCode(96 + index);
    return letter;
  };

  const renderInputBasedOnSectionType = (
    skill,
    sectionType,
    question,
    questionCounter
  ) => {
    switch (skill) {
      case 0:
        if (sectionType === 1) {
          return (
            <MultipleChoiceAnswers
              question={question}
              userAnswers={userAnswers}
              renderLetter={renderLetter}
              handleChangeWrap={handleChangeWrap}
              skill={skill}
              partData={partData}
              sectionType={sectionType}
            />
          );
        }
        if (sectionType === 2 || sectionType === 3)
          return (
            <>
              <p>{question.answers[0].answerText}</p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={1}
                    checked={
                      userAnswers[question.id]?.answers?.[0]?.answerText === "1"
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={(e) =>
                      handleChangeWrap(
                        e,
                        skill,
                        partData.id,
                        question.id,
                        null,
                        sectionType
                      )
                    }
                  />
                  <span>True</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={0}
                    checked={
                      userAnswers[question.id]?.answers?.[0]?.answerText === "0"
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={(e) =>
                      handleChangeWrap(
                        e,
                        skill,
                        partData.id,
                        question.id,
                        null,
                        sectionType
                      )
                    }
                  />
                  <span>False</span>
                </label>
                {sectionType === 3 && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={3}
                      checked={
                        userAnswers[question.id]?.answers?.[0]?.answerText ===
                        "3"
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) =>
                        handleChangeWrap(
                          e,
                          skill,
                          partData.id,
                          question.id,
                          null,
                          sectionType
                        )
                      }
                    />
                    <span>Not Given</span>
                  </label>
                )}
              </div>
            </>
          );
        if (
          sectionType === 7 ||
          sectionType === 8 ||
          sectionType === 9 ||
          sectionType === 11
        ) {
          const questionParts = question.questionName.split("[]");
          return (
            <div className="font-medium  ">
              {questionParts[0]}
              <input
                type="text"
                placeholder={`enter text here `}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block align-middle"
                style={{ display: "inline-block", width: "auto" }}
                onChange={(e) =>
                  handleChangeWrap(
                    e,
                    skill,
                    partData.id,
                    question.id,
                    null,
                    sectionType
                  )
                }
              />
              <span className="font-bold"> {questionCounter}</span>
              {questionParts[1]} {/* Part after [] */}
            </div>
          );
        }
        if (sectionType === 10) {
          return (
            <>
              <span className="font-bold mr-2"> {questionCounter}</span>
              <input
                type="text"
                placeholder="Your answer"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  handleChangeWrap(
                    e,
                    skill,
                    partData.id,
                    question.id,
                    null,
                    sectionType
                  )
                }
              />
            </>
          );
        }
      case 1:
        if (sectionType === 5) {
          return (
            <SingleChoiceAnswers
              question={question}
              userAnswers={userAnswers}
              renderLetter={renderLetter}
              handleChangeWrap={handleChangeWrap}
              skill={skill}
              partData={partData}
              sectionType={sectionType}
            />
          );
        }
        if (sectionType === 6)
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
                      type="radio"
                      name={`question_${question.id}`} // Ensures all radio buttons in this question belong to the same group
                      value={answer.answerText}
                      onChange={(e) =>
                        handleChangeWrap(
                          e,
                          skill,
                          partData.id,
                          question.id,
                          answer.id // Pass the answer ID to update state
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
        if (sectionType === 8)
          return (
            <MultipleChoiceAnswers
              question={question}
              userAnswers={userAnswers}
              renderLetter={renderLetter}
              handleChangeWrap={handleChangeWrap}
              skill={skill}
              partData={partData}
              sectionType={sectionType}
            />
          );
        if (sectionType === 2 || sectionType === 3 || sectionType === 7) {
          const questionParts = question.questionName.split("[]");
          return (
            <div className="font-medium  ">
              {questionParts[0]}
              <input
                type="text"
                placeholder={`enter text here `}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block align-middle"
                style={{ display: "inline-block", width: "auto" }}
                onChange={(e) =>
                  handleChangeWrap(
                    e,
                    skill,
                    partData.id,
                    question.id,
                    null,
                    sectionType
                  )
                }
              />
              <span className="font-bold"> {questionCounter}</span>
              {questionParts[1]} {/* Part after [] */}
            </div>
          );
        }
        if (sectionType === 4) {
          return (
            <div>
              <span className="font-bold"> {questionCounter}</span>
              <input
                type="text"
                placeholder="Your answer"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  handleChangeWrap(e, skill, partData.id, question.id)
                }
              />
            </div>
          );
        }
      case 2:
        if (skill === 0)
          return (
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={1}
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
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={0}
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
                <span>False</span>
              </label>
              {sectionType === 3 && (
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={2}
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
        if (skill === 1) {
          const questionParts = question.questionName.split("[]");
          return (
            <div className="flex flex-col space-y-2">
              <span className="font-medium">
                {questionParts[0]} {/* Part before [] */}
                <input
                  type="text"
                  placeholder="Enter text here"
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleChangeWrap(
                      e,
                      skill,
                      partData.id,
                      question.id,
                      null,
                      sectionType
                    )
                  }
                />
                {questionParts[1]} {/* Part after [] */}
              </span>
            </div>
          );
        }
      case 3:
        if (skill === 0 || skill === 1) {
          const questionParts = question.questionName.split("[]");
          return (
            <div className="flex flex-col space-y-2">
              <span className="font-medium">
                {questionParts[0]} {/* Part before [] */}
                <input
                  type="text"
                  placeholder="Enter text here"
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleChangeWrap(
                      e,
                      skill,
                      partData.id,
                      question.id,
                      null,
                      sectionType
                    )
                  }
                />
                {questionParts[1]} {/* Part after [] */}
              </span>
            </div>
          );
        }

      default:
        return (
          <div>
            <input
              type="text"
              placeholder="Your answer"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                handleChangeWrap(e, skill, partData.id, question.id)
              }
            />
          </div>
        );
    }
  };

  const renderQuestionName = (
    skill,
    sectionType,
    question,
    questionCounter
  ) => {
    switch (skill) {
      case 0:
        if (sectionType === 1 || sectionType === 2 || sectionType === 3) {
          return (
            <p>
              <span className="font-bold">
                Question {question.questionOrder}{" "}
              </span>
              {question.questionName}
            </p>
          );
        }
        if (sectionType === 8) {
          return <p></p>;
        }
      case 1:
        if (sectionType === 2 || sectionType === 4 || sectionType === 5)
          return <p></p>;
        if (sectionType === 6 || sectionType === 7 || sectionType === 8) {
          return (
            <p>
              <span className="font-bold"> Question {questionCounter} </span>
              {question.questionName}
            </p>
          );
        }
      case 2:
      case 3:
      default:
        return <p></p>;
    }
  };

  const handleInputChange = (
    questionId,
    value,
    sectionType,
    sectionContext
  ) => {
    let updateAnswer = [
      { answerText: value, answerId: "00000000-0000-0000-0000-000000000000" },
    ];
    const answerData = {
      questionId: questionId,
      sectionType: sectionType, // Adjust this if necessary
      sectionContext: sectionContext,
      answers: updateAnswer,
      skill: skill,
      skillId: currentSkillId,
      partId: partData.id,
    };

    // Pass the updated answers to the handler
    handleAnswerChange({
      questionId: answerData.questionId,
      answerData,
    });
  };

  return (
    <form
      className={`p-4 rounded shadow-md text-md ${
        currentSkillKey == "reading"
          ? "bg-green-50"
          : currentSkillKey == "writing"
          ? "bg-pink-50"
          : currentSkillKey == "listening"
          ? "bg-blue-50"
          : ""
      }`}
    >
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer
            src={partData.audio}
            submitting={submitting}
            currentSkillKey={currentSkillKey}
            practiceTestData={practiceTestData}
          />
        </div>
      )}

      {(currentSkillKey === "reading" || currentSkillKey === "listening") && (
        <>
          {(() => {
            let questionCounter = 1;
            return partData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <p className="font-bold text-lg mb-2">{section.sectionGuide}</p>
                {((skill === 0 &&
                  (section.sectionType === 10 || section.sectionType === 6)) ||
                  (skill === 1 && section.sectionType === 4)) && (
                  <img
                    src={section.image}
                    alt=" image"
                    style={{ width: "50%", height: "auto" }}
                  />
                )}

                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  {(skill === 0 &&
                    (section.sectionType === 4 || section.sectionType === 5)) ||
                  (skill === 1 && section.sectionType == 6) ? (
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
                                  {question.questionOrder}
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
                                      answer.id,
                                      section.sectionType
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
                    <>
                      {(skill === 0 &&
                        (section.sectionType === 1 ||
                          section.sectionType === 2 ||
                          section.sectionType === 3)) ||
                      (skill === 1 &&
                        (section.sectionType === 8 ||
                          section.sectionType === 4 ||
                          section.sectionType === 5)) ||
                      skill === 2 ||
                      skill === 3 ? (
                        section.questions.map((question, index) => (
                          <div key={index} className="mb-4">
                            {renderQuestionName(
                              skill,
                              section.sectionType,
                              question,
                              questionCounter++
                            )}
                            {renderInputBasedOnSectionType(
                              skill,
                              section.sectionType,
                              question,
                              questionCounter
                            )}
                          </div>
                        ))
                      ) : (
                        <div>
                          <ParseHtml
                            userAnswers={userAnswers}
                            html={section.sectionContext} // HTML content
                            sectionType={section.sectionType} // sectionType is passed as a prop
                            onInputChange={handleInputChange} // Function to handle input change
                            section={section}
                          />
                        </div>
                      )}
                    </>
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
          handleAnswerChange={handleAnswerChange}
          currentSkillId={currentSkillId}
          skill={skill}
          userAnswers={userAnswers}
        />
      )}

      {currentSkillKey === "speaking" && (
        <Speaking
          partData={partData}
          handleAnswerChange={handleAnswerChange}
          currentSkillId={currentSkillId}
          skill={skill}
          userAnswers={userAnswers}
          part1And3Time={part1And3Time}
          selectedVoice={selectedVoice}
          part2Time={part2Time}
          nextPartHandler={nextPartHandler}
          totalPart={totalPart}
        />
      )}
    </form>
  );
};

export default AnswerView;
