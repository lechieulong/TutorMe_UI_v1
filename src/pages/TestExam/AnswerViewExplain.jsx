import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure
import Writing from "../../components/Test/Part/Writing";
import Speaking from "../../components/Test/Part/Speaking";
import MutipleChoiceExplain from "./MutipleChoiceExplain";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ParseHtmlExplain from "./ParseHtmlExplain";
import WritingExplain from "../ExamTest/general/WritingExplain";
import SpeakingExplain from "../ExamTest/general/SpeakingExplain";
import { useDispatch } from "react-redux";
import { getScriptAudio } from "../../redux/testExam/TestSlice";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const AnswerViewExplain = ({ partData, currentSkillKey }) => {
  const [script, setScript] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchScript = async () => {
      const result = await dispatch(getScriptAudio(partData.audio));
      if (result.payload) {
        setScript(result.payload.transcription); // Update state with transcription
      }
    };

    fetchScript();
  }, []); // Ensure `partData.audio` is updated or partData is correct

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
            <MutipleChoiceExplain
              question={question}
              renderLetter={renderLetter}
            />
          );
        }
        if (sectionType === 2 || sectionType === 3)
          return (
            <>
              <p>{question.answers[0].answerText}</p>
              <div className="flex flex-col space-y-2">
                <label
                  className={`flex items-center space-x-2 border-2 rounded p-2 ${
                    question.answers[0].isCorrect === 1
                      ? "border-green-500" // Correct answer
                      : question.userAnswers[0]?.answerText != 1
                      ? "border-red-500" // Incorrect user selection
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={1} // The value for "True"
                    checked={question.userAnswers[0]?.answerText == 1} // Check if isCorrect is 1
                    disabled
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>True</span>
                </label>
                <label
                  className={`flex items-center space-x-2 border-2 rounded p-2 ${
                    question.answers[0].isCorrect === 0
                      ? "border-green-500" // Correct answer
                      : question.userAnswers[0]?.answerText == 0
                      ? "border-red-500" // Incorrect user selection
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    checked={question.userAnswers[0]?.answerText == 0} // Check if isCorrect is 0
                    value={0}
                    disabled
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>False</span>
                </label>

                {sectionType === 3 && (
                  <label
                    className={`flex items-center space-x-2 border-2 rounded p-2 ${
                      question.answers[0].isCorrect === 2
                        ? "border-green-500" // Correct answer
                        : question.userAnswers[0]?.answerText == 2
                        ? "border-red-500" // Incorrect user selection
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      checked={question.answers[0].isCorrect === 2} // Check if isCorrect is 2
                      value={2}
                      disabled
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>Not Given</span>
                  </label>
                )}

                <div dangerouslySetInnerHTML={{ __html: question.explain }} />
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
            <div className="font-medium flex gap-6 items-center">
              {questionParts[0]}
              <input
                disabled
                defaultValue={question.userAnswers[0].answerText}
                type="text"
                placeholder={`enter text here `}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block align-middle"
                style={{ display: "inline-block", width: "auto" }}
              />
              <span className="font-bold"> {questionCounter}</span>
              {questionParts[1]} {/* Part after [] */}
              <p className="p-2 border rounded-lg border-green-500">
                <span className="font-bold">Correct Answer</span>:{" "}
                {question.answers[0].answerText}
              </p>
            </div>
          );
        }
        if (sectionType === 10) {
          return (
            <div className="flex items-center gap-6">
              <span className="font-bold mr-2"> {questionCounter}</span>
              <input
                disabled
                defaultValue={question.userAnswers[0].answerText}
                type="text"
                placeholder="Your answer"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="p-2 border rounded-lg border-green-500">
                <span className="font-bold">Correct Answer</span>:{" "}
                {question.answers[0].answerText}
              </p>
            </div>
          );
        }
      case 1:
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
            <MutipleChoiceExplain
              question={question}
              renderLetter={renderLetter}
            />
          );
        if (sectionType === 2 || sectionType === 3 || sectionType === 7) {
          const questionParts = question.questionName.split("[]");
          return (
            <div className="font-medium  flex items-center gap-6 ">
              {questionParts[0]}
              <input
                type="text"
                disabled
                defaultValue={question.userAnswers[0].answerText}
                placeholder={`enter text here `}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block align-middle"
                style={{ display: "inline-block", width: "auto" }}
              />
              <span className="font-bold"> {questionCounter}</span>
              {questionParts[1]} {/* Part after [] */}
              <p className="p-2 border rounded-lg border-green-500">
                <span className="font-bold">Correct Answer</span>:{" "}
                {question.answers[0].answerText}
              </p>
            </div>
          );
        }
        if (sectionType === 4) {
          return (
            <div>
              <span className="font-bold"> {questionCounter}</span>
              <div className="flex items-center gap-6">
                <input
                  disabled
                  defaultValue={question.userAnswers[0].answerText}
                  type="text"
                  placeholder="Your answer"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="p-2 border rounded-lg border-green-500">
                  <span className="font-bold">Correct Answer</span>:{" "}
                  {question.answers[0].answerText}
                </p>
              </div>
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
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={0}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>False</span>
              </label>
              {sectionType === 3 && (
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={2}
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
              <span className="font-bold">Question {questionCounter + 1} </span>
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
              <span className="font-bold">
                {" "}
                Question {questionCounter + 1}{" "}
              </span>
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

  return (
    <form className="p-4 bg-white rounded shadow-md">
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
          <h3 className="text-2xl font-bold">Script audio</h3>
          <p>{script}</p>
        </div>
      )}

      {(currentSkillKey === "reading" || currentSkillKey === "listening") && (
        <>
          {(() => {
            let questionCounter = 0;
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
                  {(skill === 0 && section.sectionType === 4) ||
                  section.sectionType === 5 ||
                  section.sectionType === 6 ? (
                    <>
                      <span className="invisible">{questionCounter++}</span>
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
                                  disabled
                                  className="border border-gray-300 rounded px-2 py-1"
                                >
                                  <option value="">
                                    {/* Find and display the answerText where answer.id matches userAnswer */}
                                    {question.answers.find(
                                      (a) =>
                                        a.id ===
                                        question.userAnswers[0]?.answerText
                                    )?.answerText || ""}
                                  </option>
                                </select>
                              </div>
                            ))}
                            <p className="font-bold">
                              Correct Answers: {question.questionName}
                            </p>
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
                          section.sectionType === 4)) ||
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
                          <ParseHtmlExplain
                            questionCounter={questionCounter}
                            html={section.sectionContext} //
                            sectionType={section.sectionType}
                            sectionExplain={section.explain}
                            questions={section.questions}
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
        <>
          <WritingExplain
            partData={partData}
            currentSkillKey={currentSkillKey}
          />
        </>
      )}

      {currentSkillKey === "speaking" && (
        <SpeakingExplain partData={partData} />
      )}
    </form>
  );
};

export default AnswerViewExplain;
