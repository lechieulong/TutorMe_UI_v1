import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faMultiply,
  faPlus,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AnswerSide from "./AnswerSide";

const FormSkill = ({ skill, formData, handleDataChange }) => {
  const { parts } = formData;
  const [leftWidth, setLeftWidth] = useState(50);
  const [previewWith, setPreviewWith] = useState(50);

  const startResizing = (part) => {
    if (part === "main") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopResizing);
    }
    if (part === "preview") {
      document.addEventListener("mousemove", handleMouseMovePreview);
      document.addEventListener("mouseup", stopResizingPreview);
    }
  };

  const handleMouseMovePreview = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setPreviewWith(newWidth);
  };

  const stopResizingPreview = () => {
    document.removeEventListener("mousemove", handleMouseMovePreview);
    document.removeEventListener("mouseup", stopResizingPreview);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setLeftWidth(newWidth);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParts = [...parts];
    updatedParts[index] = { ...updatedParts[index], [name]: value };
    handleDataChange({ parts: updatedParts });
  };

  const handleAudioChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedParts = [...parts];
        updatedParts[index].audioUrl = reader.result;
        handleDataChange({ parts: updatedParts });
      };
      reader.readAsDataURL(file);
    }
  };

  const addPart = () => {
    const newPart = {
      partNumber: parts.length + 1,
      skillTest: 1,
      contentText: "",
      audioUrl: "",
      questionTypePart: [
        {
          questionGuide: "",
          questionType: "",
          questions: [
            {
              questionName: "",
              answer: "",
              maxMarks: 1,
            },
          ],
        },
      ],
    };
    handleDataChange({ parts: [...parts, newPart] });
  };

  const removePart = (index) => {
    if (parts.length > 1) {
      const updatedParts = parts.filter((_, i) => i !== index);
      handleDataChange({ parts: updatedParts });
    } else {
      alert("You must have at least 1 part.");
    }
  };

  const addQuestionTypePart = (partIndex) => {
    const newQuestionTypePart = {
      questionGuide: "",
      questionType: "",
      questions: [
        {
          questionName: "",
          answer: "",
          maxMarks: 1,
        },
      ],
    };
    const newParts = [...parts];
    newParts[partIndex].questionTypePart = [
      ...newParts[partIndex].questionTypePart,
      newQuestionTypePart,
    ];
    handleDataChange({ parts: newParts });
  };

  const addQuestion = (partIndex, qTypeIndex) => {
    const newQuestion = {
      questionName: "",
      answer: "",
      options: [
        {
          answerText: "",
          isCorrect: false,
        },
      ],
      maxMarks: 1,
      answerFilling: "",
      answerTrueFalse: false,
    };
    const updatedParts = [...parts];
    updatedParts[partIndex].questionTypePart[qTypeIndex].questions = [
      ...updatedParts[partIndex].questionTypePart[qTypeIndex].questions,
      newQuestion,
    ];
    handleDataChange({ parts: updatedParts });
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl p-2 font-extrabold text-green-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faBookOpen} />
        </span>
        {skill}
      </h2>
      <div className="flex">
        <div
          className="overflow-auto flex flex-col gap-6 h-[640px]  border border-gray-300 shadow-lg bg-yellow-50 rounded-lg"
          style={{ width: `${leftWidth}%` }}
        >
          {parts.map((part, partIndex) => (
            <div key={partIndex} className="w-full flex flex-col p-6 ">
              <h4 className="text-xl font-semibold text-gray-700">
                Part {part.partNumber}
              </h4>

              {skill === "reading" && (
                <div className="mt-4">
                  <div className="text-lg font-medium text-gray-600">
                    Content Topic
                  </div>
                  <div className="mt-2 relative w-full h-[300px] overflow-auto bg-white rounded-md shadow-inner">
                    <CKEditor
                      editor={ClassicEditor}
                      data={part.contentText}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "|",
                          "blockQuote",
                          "|",
                          "undo",
                          "redo",
                        ],
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleInputChange(partIndex, {
                          target: { name: "contentText", value: data },
                        });
                      }}
                    />
                  </div>
                </div>
              )}

              {skill === "listening" && (
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Audio Upload:
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleAudioChange(partIndex, e)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </label>
                </div>
              )}

              {part.questionTypePart.map((qTypePart, qIndex) => (
                <div
                  key={qIndex}
                  className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <div className="flex gap-4 mb-4">
                    {skill === "reading" ||
                      (skill === "listening" && (
                        <>
                          <div className="w-7/12 flex flex-col">
                            <label className="text-gray-700 font-medium">
                              Question Guide:
                            </label>
                            <input
                              name="questionGuide"
                              value={qTypePart.questionGuide}
                              onChange={(e) => {
                                const newParts = [...parts];
                                newParts[partIndex].questionTypePart[
                                  qIndex
                                ].questionGuide = e.target.value;
                                handleDataChange({ parts: newParts });
                              }}
                              className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="w-5/12 flex flex-col">
                            <label className="text-gray-700 font-medium">
                              Question Type:
                            </label>
                            <select
                              name="questionType"
                              value={qTypePart.questionType}
                              onChange={(e) => {
                                const newParts = [...parts];
                                newParts[partIndex].questionTypePart[
                                  qIndex
                                ].questionType = e.target.value;
                                handleDataChange({ parts: newParts });
                              }}
                              className="mt-1 p-2 border border-gray-300 rounded-md"
                            >
                              <option value="" disabled>
                                Select Question Type
                              </option>
                              <option value="multiple-choice">
                                Multiple Choice
                              </option>
                              <option value="fill-in-the-blank">
                                Fill in the Blank
                              </option>
                              <option value="matching">Matching</option>
                              <option value="true-false">true-false</option>

                              {/* Add more options as needed */}
                            </select>
                          </div>
                        </>
                      ))}
                  </div>

                  {qTypePart.questions.map((question, qtnIndex) => (
                    <div key={qtnIndex} className="mb-4">
                      <h4>
                        Question {qtnIndex + 1}
                        <span className="ml-4">
                          <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                      </h4>
                      <label className="text-gray-700 font-medium">
                        Question Name:
                      </label>
                      <input
                        type="text"
                        name="questionName"
                        value={question.questionName}
                        onChange={(e) => {
                          const newParts = [...parts];
                          newParts[partIndex].questionTypePart[
                            qIndex
                          ].questions[qtnIndex].questionName = e.target.value;
                          handleDataChange({ parts: newParts });
                        }}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      {skill === "reading" ||
                        (skill === "listening" && (
                          <>
                            {(qTypePart.questionType === "fill-in-the-blank" ||
                              qTypePart.questionType === "matching") && (
                              <div>
                                <label className="text-gray-700 font-medium mt-2">
                                  Answer:
                                </label>
                                <input
                                  type="text"
                                  name="answer"
                                  value={question.answer}
                                  onChange={(e) => {
                                    const newParts = [...parts];
                                    newParts[partIndex].questionTypePart[
                                      qIndex
                                    ].questions[qtnIndex].answer =
                                      e.target.value;
                                    handleDataChange({ parts: newParts });
                                  }}
                                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                              </div>
                            )}

                            {qTypePart.questionType === "true-false" && (
                              <div className="w-5/12 flex flex-col">
                                <label className="text-gray-700 font-medium">
                                  Answer
                                </label>
                                <div className="mt-1">
                                  <label className="inline-flex items-center mr-4">
                                    <input
                                      type="radio"
                                      name={`questionType-${partIndex}-${qIndex}`}
                                      value="true"
                                      checked={
                                        qTypePart.questionType ===
                                        "fill-in-the-blank"
                                      }
                                      onChange={(e) => {
                                        const newParts = [...parts];
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questionType = e.target.value;
                                        handleDataChange({ parts: newParts });
                                      }}
                                      className="form-radio"
                                    />
                                    <span className="ml-2">
                                      Fill in the Blank
                                    </span>
                                  </label>
                                  <label className="inline-flex items-center mr-4">
                                    <input
                                      type="radio"
                                      name={`questionType-${partIndex}-${qIndex}`}
                                      value="false"
                                      checked={
                                        qTypePart.questionType === "matching"
                                      }
                                      onChange={(e) => {
                                        const newParts = [...parts];
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questionType = e.target.value;
                                        handleDataChange({ parts: newParts });
                                      }}
                                      className="form-radio"
                                    />
                                    <span className="ml-2">Matching</span>
                                  </label>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addQuestion(partIndex, qIndex)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                  >
                    Add Question
                  </button>
                </div>
              ))}

              {skill === "reading" ||
                (skill === "listening " && (
                  <button
                    type="button"
                    onClick={() => addQuestionTypePart(partIndex)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                  >
                    Add Question Type
                  </button>
                ))}

              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => removePart(partIndex)}
                  className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faMultiply} />
                  </span>
                  Remove Part
                </button>
                <button
                  type="button"
                  onClick={addPart}
                  className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Add Part
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            className="cursor-ew-resize  bg-gray-300 rounded-full "
            style={{
              width: "1px",
              height: "100%",
            }}
            onMouseDown={() => startResizing("main")}
          />
        </div>

        {/* Preview  */}
        <div className="p-2 w-1/2">
          <h4>Preview </h4>
          <AnswerSide parts={parts} />
        </div>
      </div>
    </div>
  );
};

export default FormSkill;
