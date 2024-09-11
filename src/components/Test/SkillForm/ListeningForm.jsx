import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";

const ListeningForm = () => {
  const [parts, setParts] = useState([
    { title: "Part 1", audio: null, questions: [] },
  ]);

  const handleAddPart = () => {
    setParts([
      ...parts,
      {
        title: `Part ${parts.length + 1}`,
        audio: null,
        questions: [],
      },
    ]);
  };

  const handleAddQuestionType = (partIndex, questionType) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions.push({
      titleTopic: "",
      type: questionType,
      content: [],
    });
    setParts(updatedParts);
  };

  const handleAddQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...parts];
    const question = updatedParts[partIndex].questions[questionIndex];
    switch (question.type) {
      case "Matching":
        question.content.push({ heading: "", question: "" });
        break;
      case "Filling":
        question.content.push({ question: "", answer: "" });
        break;
      case "True-False":
        question.content.push({ question: "", answer: "true" });
        break;
      case "Radio":
        question.content.push({ question: "", options: [] });
        break;
      default:
        break;
    }
    setParts(updatedParts);
  };

  const handleContentChange = (
    partIndex,
    questionIndex,
    contentIndex,
    field,
    value
  ) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions[questionIndex].content[contentIndex][
      field
    ] = value;
    setParts(updatedParts);
  };

  const handleQuestionChange = (partIndex, questionIndex, field, value) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions[questionIndex][field] = value;
    setParts(updatedParts);
  };

  const handleAudioChange = (partIndex, file) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].audio = file;
    setParts(updatedParts);
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        <span className="mr-2">
          <FontAwesomeIcon icon={faHeadphones} />
        </span>
        Listening
      </h2>
      {parts.map((part, partIndex) => (
        <div
          key={partIndex}
          className="flex mb-6 p-4 border border-gray-300 rounded-lg"
        >
          {/* Left side: Audio Upload */}
          <div
            style={{ height: "calc(100% - 200px)" }}
            className="w-1/2 pr-4 border-r border-gray-300 overflow-auto"
          >
            <h3 className="text-xl font-semibold mb-4">{part.title}</h3>

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleAudioChange(partIndex, e.target.files[0])}
              className="w-full mb-4 text-gray-500"
            />
            {part.audio && (
              <p className="text-gray-700">Selected Audio: {part.audio.name}</p>
            )}
          </div>

          {/* Right side: Questions */}
          <div
            className="w-1/2 pl-4 overflow-auto flex-grow"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {part.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <h5 className="text-2xl font-semibold mb-2">
                  <span className="">
                    <FontAwesomeIcon icon={faPhoenixFramework} />
                  </span>
                  <span className="mr-4">{question.type}</span>
                </h5>
                <label className="block mb-2">
                  <span className="text-gray-700 mb-1">Title Topic</span>
                  <input
                    type="text"
                    value={question.titleTopic}
                    onChange={(e) =>
                      handleQuestionChange(
                        partIndex,
                        questionIndex,
                        "titleTopic",
                        e.target.value
                      )
                    }
                    placeholder="Enter heading topic"
                    className="w-full p-1 border border-gray-300 rounded-lg mb-2"
                  />
                </label>
                <div>
                  {question.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="">
                      {question.type === "Matching" && (
                        <div>
                          <p className="text-lg font-semibold">
                            Question {contentIndex + 1}
                          </p>
                          <div className="flex justify-between gap-4">
                            <label className="block mb-2">
                              <span className="text-gray-700">
                                Heading title
                              </span>
                              <input
                                type="text"
                                value={content.heading}
                                onChange={(e) =>
                                  handleContentChange(
                                    partIndex,
                                    questionIndex,
                                    contentIndex,
                                    "heading",
                                    e.target.value
                                  )
                                }
                                placeholder="Heading Title"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                              />
                            </label>
                            <label className="block mb-2">
                              <span className="font-semibold text-gray-700">
                                Matched heading
                              </span>
                              <input
                                type="text"
                                value={content.question}
                                onChange={(e) =>
                                  handleContentChange(
                                    partIndex,
                                    questionIndex,
                                    contentIndex,
                                    "question",
                                    e.target.value
                                  )
                                }
                                placeholder="Matched Heading"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {question.type === "Filling" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Answer
                            </span>
                            <input
                              type="text"
                              value={content.answer}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "answer",
                                  e.target.value
                                )
                              }
                              placeholder="Answer"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </label>
                        </div>
                      )}

                      {question.type === "True-False" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <div className="flex items-center mb-2">
                            <input
                              type="radio"
                              id={`true-${contentIndex}`}
                              name={`true-false-${contentIndex}`}
                              value="true"
                              checked={content.answer === "true"}
                              onChange={() =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "answer",
                                  "true"
                                )
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`true-${contentIndex}`}
                              className="mr-4 text-gray-700"
                            >
                              True
                            </label>
                            <input
                              type="radio"
                              id={`false-${contentIndex}`}
                              name={`true-false-${contentIndex}`}
                              value="false"
                              checked={content.answer === "false"}
                              onChange={() =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "answer",
                                  "false"
                                )
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`false-${contentIndex}`}
                              className="text-gray-700"
                            >
                              False
                            </label>
                          </div>
                        </div>
                      )}

                      {question.type === "Radio" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Options (separated by commas)
                            </span>
                            <input
                              type="text"
                              value={content.options.join(", ")}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "options",
                                  e.target.value
                                    .split(",")
                                    .map((opt) => opt.trim())
                                )
                              }
                              placeholder="Options"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddQuestion(partIndex, questionIndex)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Add {question.type} Question
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddQuestionType(partIndex, "Matching")}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Add Matching Question
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestionType(partIndex, "Filling")}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
            >
              Add Filling Question
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestionType(partIndex, "True-False")}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Add True-False Question
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestionType(partIndex, "Radio")}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
            >
              Add Radio Question
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddPart}
        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded"
      >
        Add Listening Part
      </button>
    </section>
  );
};

export default ListeningForm;
