import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faMultiply,
  faPlus,
  faQuestionCircle,
  faHeadphones,
  faPen,
  faMicrophone,
  faBook,
  faTrash,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import AnswerSide from "./AnswerSide";

const FormSkill = ({ skill, formData, handleDataChange }) => {
  const { parts } = formData.skills[skill];

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

  const handleDurationChange = (duration) => {
    const updatedFormData = { ...formData };

    updatedFormData.skills[skill] = {
      ...updatedFormData.skills[skill],
      type: skill,
      duration,
    };

    handleDataChange(updatedFormData);
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
    const updatedSkills = [...formData.skills];
    const parts = updatedSkills[skill].parts;

    const newPart = {
      partNumber: parts.length + 1,
      skillType: 0,
      contentText: "",
      audioUrl: "",
      imageUrl: "",
      questionTypePart: [
        {
          questionGuide: "",
          questionType: 1,
          questions: [
            {
              questionName: "",
              maxMarks: 1,
              answersOptions: [
                {
                  answerText: "",
                  isCorrect: false,
                },
              ],
              answerFilling: "",
              answerTrueFalse: 0,
              answerMatching: [{ heading: "", matching: "" }],
            },
          ],
        },
      ],
    };
    updatedSkills[skill] = {
      ...updatedSkills[skill],
      parts: [...parts, newPart],
    };
    handleDataChange({ skills: updatedSkills });
  };

  const removePart = (partIndex) => {
    const updatedSkills = [...formData.skills];

    if (parts.length > 1) {
      const updatedParts = parts.filter((_, i) => i !== partIndex);

      updatedSkills[skill] = {
        ...updatedSkills[skill],
        parts: updatedParts,
      };
      handleDataChange({ skills: updatedSkills });
    } else {
      alert("You must have at least 1 part.");
    }
  };

  const addQuestionTypePart = (partIndex) => {
    const newQuestionTypePart = {
      questionGuide: "",
      questionType: 1,
      questions: [
        {
          questionName: "",
          maxMarks: 1,
          answersOptions: [
            {
              answerText: "",
              isCorrect: false,
            },
          ],
          answerFilling: "",
          answerTrueFalse: 0,
          answerMatching: [{ heading: "", matching: "" }],
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
      maxMarks: 1,
      answersOptions: [
        {
          answerText: "",
          isCorrect: false,
        },
      ],
      answerFilling: "",
      answerTrueFalse: 0,
      answerMatching: [{ heading: "", matching: "" }],
    };
    const updatedParts = [...parts];
    updatedParts[partIndex].questionTypePart[qTypeIndex].questions = [
      ...updatedParts[partIndex].questionTypePart[qTypeIndex].questions,
      newQuestion,
    ];
    handleDataChange({ parts: updatedParts });
  };

  const removeQuestion = (partIndex, qIndex, qtnIndex) => {
    const newParts = [...parts];
    newParts[partIndex].questionTypePart[qIndex].questions.splice(qtnIndex, 1);
    handleDataChange({ parts: newParts });
  };

  return (
    <div className="p-4 border  border-gray-400">
      <h2 className="text-2xl p-2 font-extrabold text-green-500">
        <span className="mr-2">
          <FontAwesomeIcon
            icon={
              skill === 0
                ? faBookOpen // Reading
                : skill === 1
                ? faHeadphones // Listening (Ví dụ icon khác)
                : skill === 2
                ? faPen
                : skill === 3
                ? faMicrophone
                : faBook
            }
          />
        </span>
        {skill === 0
          ? "Reading"
          : skill === 1
          ? "Listening"
          : skill === 2
          ? "Writing"
          : skill === 3
          ? "Speaking"
          : "All"}
      </h2>
      <label className=" w-3/12  p-2 flex items-center gap-3 justify-center  text-base font-medium text-gray-700">
        <span className="w-1/2">Duration (minutes)</span>
        <input
          type="number"
          value={formData.skills[skill].duration}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          placeholder="Enter duration"
          className="block w-6/12 border p-2 border-gray-400 rounded-md shadow-sm"
        />
      </label>
      <div className="flex">
        <div
          className="overflow-auto flex flex-col gap-6  h-[630px] border border-gray-300 shadow-lg bg-yellow-50 rounded-lg"
          style={{ width: `${leftWidth}%` }}
        >
          {parts.map((part, partIndex) => (
            <div key={partIndex} className="w-full flex flex-col p-6 ">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold text-gray-700">
                  Part {part.partNumber}
                </h4>
                <button
                  type="button"
                  onClick={() => removePart(partIndex)}
                  className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Part
                  <span className="ml-3">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </span>
                </button>
              </div>

              {skill === 0 && (
                <div className="mt-4">
                  <div className="text-lg font-medium text-gray-600">
                    Content Topic
                  </div>
                  <div className="mt-2 relative w-full  overflow-auto bg-white rounded-md shadow-inner">
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

                        const newSkills = [...formData.skills];
                        const newParts = [...newSkills[skill].parts];

                        newParts[partIndex].contentText = data;

                        newSkills[skill] = {
                          ...newSkills[skill],
                          parts: newParts,
                        };

                        handleDataChange({
                          ...formData,
                          skills: newSkills,
                        });
                      }}
                    />
                  </div>
                </div>
              )}

              {skill === 1 && (
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

              {skill == 2 && partIndex === 0 && (
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Image Upload:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(partIndex, e)}
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
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                    <p className="italic">
                      Please choose type before add question!!!
                    </p>
                  </div>
                  <div className="flex gap-4 mb-4">
                    {(skill === 0 || skill === 1) && (
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
                              newParts[partIndex] = {
                                ...newParts[partIndex],
                                questionTypePart: newParts[
                                  partIndex
                                ].questionTypePart.map((qtp, idx) =>
                                  idx === qIndex
                                    ? { ...qtp, questionGuide: e.target.value }
                                    : qtp
                                ),
                              };

                              handleDataChange({
                                ...formData,
                                skills: [
                                  ...formData.skills.slice(0, skill),
                                  {
                                    ...formData.skills[skill],
                                    parts: newParts,
                                  },
                                  ...formData.skills.slice(skill + 1),
                                ],
                              });
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
                              const newSkills = [...formData.skills];
                              const newParts = [...newSkills[skill].parts];
                              newParts[partIndex].questionTypePart[
                                qIndex
                              ].questionType = Number(e.target.value);
                              newSkills[skill] = {
                                ...newSkills[skill],
                                parts: newParts,
                              };
                              handleDataChange({
                                ...formData,
                                skills: newSkills,
                              });
                            }}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          >
                            <option value="" disabled>
                              Select Question Type
                            </option>
                            <option value={1}>Matching</option>
                            <option value={2}>Fill in the Blank</option>
                            <option value={3}>Multiple Choice</option>
                            <option value={4}>Radio Choice</option>
                            <option value={5}>true-false</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {qTypePart.questions.map((question, qtnIndex) => (
                    <div key={qtnIndex} className="mb-4   p-2">
                      <div className="flex items-center justify-between">
                        <h4>
                          Question {qtnIndex + 1}
                          <span className="ml-4">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                          </span>
                        </h4>

                        <span
                          type="button"
                          onClick={() => removeQuestion(partIndex, qIndex)}
                          className=" px-4 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                        >
                          <FontAwesomeIcon icon={faMultiply} />
                        </span>
                      </div>
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
                          handleDataChange({
                            ...formData,
                            skills: [
                              ...formData.skills.slice(0, skill),
                              { ...formData.skills[skill], parts: newParts },
                              ...formData.skills.slice(skill + 1),
                            ],
                          });
                        }}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      {(skill === 0 || skill === 1) && (
                        <>
                          {qTypePart.questionType === 1 && (
                            <div>
                              <label className="text-gray-700 font-medium mt-2">
                                Heading Matching:
                              </label>
                              {question.answerMatching.map(
                                (matchItem, matchIndex) => (
                                  <div
                                    key={matchIndex}
                                    className="flex space-x-4 mt-2"
                                  >
                                    {/* Input cho Heading */}
                                    <div className="w-1/2">
                                      <label className="text-gray-700">
                                        Heading:
                                      </label>
                                      <input
                                        type="text"
                                        name={`heading-${partIndex}-${qIndex}-${qtnIndex}-${matchIndex}`}
                                        value={matchItem.heading}
                                        onChange={(e) => {
                                          const newSkills = [
                                            ...formData.skills,
                                          ];
                                          const newParts = [
                                            ...newSkills[skill].parts,
                                          ];

                                          // Cập nhật giá trị heading tại phần tử matchIndex
                                          newParts[partIndex].questionTypePart[
                                            qIndex
                                          ].questions[qtnIndex].answerMatching[
                                            matchIndex
                                          ].heading = e.target.value;

                                          // Cập nhật phần mới trong kỹ năng
                                          newSkills[skill] = {
                                            ...newSkills[skill],
                                            parts: newParts,
                                          };

                                          // Cập nhật formData với kỹ năng mới
                                          handleDataChange({
                                            ...formData,
                                            skills: newSkills,
                                          });
                                        }}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                      />
                                    </div>

                                    {/* Input cho Matching */}
                                    <div className="w-1/2">
                                      <label className="text-gray-700">
                                        Matching:
                                      </label>
                                      <input
                                        type="text"
                                        name={`matching-${partIndex}-${qIndex}-${qtnIndex}-${matchIndex}`}
                                        value={matchItem.matching}
                                        onChange={(e) => {
                                          const newSkills = [
                                            ...formData.skills,
                                          ];
                                          const newParts = [
                                            ...newSkills[skill].parts,
                                          ];

                                          // Cập nhật giá trị matching tại phần tử matchIndex
                                          newParts[partIndex].questionTypePart[
                                            qIndex
                                          ].questions[qtnIndex].answerMatching[
                                            matchIndex
                                          ].matching = e.target.value;

                                          // Cập nhật phần mới trong kỹ năng
                                          newSkills[skill] = {
                                            ...newSkills[skill],
                                            parts: newParts,
                                          };

                                          // Cập nhật formData với kỹ năng mới
                                          handleDataChange({
                                            ...formData,
                                            skills: newSkills,
                                          });
                                        }}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                              {/* Nút thêm câu trả lời */}
                              <button
                                type="button"
                                onClick={() => {
                                  const newSkills = [...formData.skills];
                                  const newParts = [...newSkills[skill].parts];

                                  // Thêm phần heading matching mới vào câu hỏi
                                  newParts[partIndex].questionTypePart[
                                    qIndex
                                  ].questions[qtnIndex].answerMatching.push({
                                    heading: "",
                                    matching: "",
                                  });

                                  // Cập nhật kỹ năng mới
                                  newSkills[skill] = {
                                    ...newSkills[skill],
                                    parts: newParts,
                                  };

                                  // Cập nhật formData với kỹ năng mới
                                  handleDataChange({
                                    ...formData,
                                    skills: newSkills,
                                  });
                                }}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                              >
                                Add Heading Matching
                              </button>
                            </div>
                          )}

                          {qTypePart.questionType === 2 && (
                            <div>
                              <label className="text-gray-700 font-medium mt-2">
                                Answer Filling:
                              </label>
                              <input
                                type="text"
                                name="answerFilling"
                                value={question.answerFilling}
                                onChange={(e) => {
                                  const newSkills = [...formData.skills];
                                  const newParts = [...newSkills[skill].parts];

                                  // Cập nhật answerFilling tại vị trí question tương ứng
                                  newParts[partIndex].questionTypePart[
                                    qIndex
                                  ].questions[qtnIndex].answerFilling =
                                    e.target.value;

                                  // Cập nhật phần mới trong kỹ năng
                                  newSkills[skill] = {
                                    ...newSkills[skill],
                                    parts: newParts,
                                  };

                                  // Cập nhật formData với kỹ năng mới
                                  handleDataChange({
                                    ...formData,
                                    skills: newSkills,
                                  });
                                }}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                              />
                            </div>
                          )}
                          {qTypePart.questionType === 3 && (
                            <div className="w-5/12 flex flex-col">
                              <label className="text-gray-700 font-medium">
                                Answer Selection (Multiple Choice)
                              </label>
                              <div className="mt-1">
                                {question.answersOptions.map((option, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center mb-2"
                                  >
                                    <input
                                      type="text"
                                      value={option.answerText}
                                      onChange={(e) => {
                                        const newSkills = [...formData.skills];
                                        const newParts = [
                                          ...newSkills[skill].parts,
                                        ];
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[qtnIndex].answersOptions[
                                          idx
                                        ].answerText = e.target.value;

                                        newSkills[skill] = {
                                          ...newSkills[skill],
                                          parts: newParts,
                                        };
                                        handleDataChange({
                                          ...formData,
                                          skills: newSkills,
                                        });
                                      }}
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />

                                    <input
                                      type="checkbox"
                                      checked={option.isCorrect}
                                      onChange={() => {
                                        const newSkills = [...formData.skills];
                                        const newParts = [
                                          ...newSkills[skill].parts,
                                        ];

                                        // Đổi trạng thái isCorrect tại qIndex và qtnIndex
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[qtnIndex].answersOptions[
                                          idx
                                        ].isCorrect = !option.isCorrect;

                                        // Cập nhật lại phần mới trong kỹ năng
                                        newSkills[skill] = {
                                          ...newSkills[skill],
                                          parts: newParts,
                                        };

                                        // Cập nhật formData với kỹ năng mới
                                        handleDataChange({
                                          ...formData,
                                          skills: newSkills,
                                        });
                                      }}
                                      className="ml-2"
                                    />

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newParts = [...parts];
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[
                                          qtnIndex
                                        ].answersOptions.splice(idx, 1);
                                        handleDataChange({ parts: newParts });
                                      }}
                                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...formData.skills];
                                    const newParts = [
                                      ...newSkills[skill].parts,
                                    ];

                                    // Thêm tùy chọn câu trả lời mới vào câu hỏi
                                    newParts[partIndex].questionTypePart[
                                      qIndex
                                    ].questions[qtnIndex].answersOptions.push({
                                      answerText: "",
                                      isCorrect: false,
                                    });

                                    // Cập nhật kỹ năng mới
                                    newSkills[skill] = {
                                      ...newSkills[skill],
                                      parts: newParts,
                                    };

                                    // Cập nhật formData với kỹ năng mới
                                    handleDataChange({
                                      ...formData,
                                      skills: newSkills,
                                    });
                                  }}
                                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                                >
                                  Add Answer Option
                                </button>
                              </div>
                            </div>
                          )}

                          {qTypePart.questionType === 4 && (
                            <div className=" flex flex-col">
                              <label className="text-gray-700 font-medium">
                                Answer Selection (Single Choice)
                              </label>
                              <div className="mt-1 border p-2">
                                {question.answersOptions.map((option, idx) => (
                                  <div
                                    key={idx}
                                    className="flex gap-3 items-center mb-2"
                                  >
                                    <div className="border rounded-full p-2">
                                      {idx === 0
                                        ? "A"
                                        : idx === 1
                                        ? "B"
                                        : idx === 2
                                        ? "C"
                                        : idx === 3
                                        ? "D"
                                        : idx === 4
                                        ? "E"
                                        : idx === 5
                                        ? "F"
                                        : idx === 6
                                        ? "G"
                                        : "None"}{" "}
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="enter answer"
                                      value={option.answerText}
                                      onChange={(e) => {
                                        const newSkills = [...formData.skills];
                                        const newParts = [
                                          ...newSkills[skill].parts,
                                        ];

                                        // Cập nhật answerText tại vị trí answersOptions tương ứng
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[qtnIndex].answersOptions[
                                          idx
                                        ].answerText = e.target.value;

                                        // Cập nhật phần mới trong kỹ năng
                                        newSkills[skill] = {
                                          ...newSkills[skill],
                                          parts: newParts,
                                        };

                                        // Cập nhật formData với kỹ năng mới
                                        handleDataChange({
                                          ...formData,
                                          skills: newSkills,
                                        });
                                      }}
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />

                                    <label className=" ">Is Correct</label>
                                    <input
                                      type="radio"
                                      checked={option.isCorrect}
                                      onChange={() => {
                                        const newSkills = [...formData.skills];
                                        const newParts = [
                                          ...newSkills[skill].parts,
                                        ];

                                        // Đặt isCorrect cho tất cả options trong question thành false,
                                        // chỉ đặt true cho option được chọn
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[
                                          qtnIndex
                                        ].answersOptions.forEach(
                                          (opt, i) =>
                                            (opt.isCorrect = i === idx)
                                        );

                                        // Cập nhật phần mới trong kỹ năng
                                        newSkills[skill] = {
                                          ...newSkills[skill],
                                          parts: newParts,
                                        };

                                        // Cập nhật formData với kỹ năng mới
                                        handleDataChange({
                                          ...formData,
                                          skills: newSkills,
                                        });
                                      }}
                                      className="ml-2"
                                    />

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newParts = [...parts];
                                        newParts[partIndex].questionTypePart[
                                          qIndex
                                        ].questions[
                                          qtnIndex
                                        ].answersOptions.splice(idx, 1);
                                        handleDataChange({ parts: newParts });
                                      }}
                                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...formData.skills];
                                    const newParts = [
                                      ...newSkills[skill].parts,
                                    ];

                                    // Thêm tùy chọn câu trả lời mới vào câu hỏi
                                    newParts[partIndex].questionTypePart[
                                      qIndex
                                    ].questions[qtnIndex].answersOptions.push({
                                      answerText: "",
                                      isCorrect: false,
                                    });

                                    // Cập nhật kỹ năng mới
                                    newSkills[skill] = {
                                      ...newSkills[skill],
                                      parts: newParts,
                                    };

                                    // Cập nhật formData với kỹ năng mới
                                    handleDataChange({
                                      ...formData,
                                      skills: newSkills,
                                    });
                                  }}
                                  className="mt-2 w-32 text-[12px] px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                                >
                                  Add Answer
                                </button>
                              </div>
                            </div>
                          )}

                          {qTypePart.questionType === 5 && (
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
                                      formData.skills[skill].parts[partIndex]
                                        .questionTypePart[qIndex].questions[
                                        qtnIndex
                                      ].answerTrueFalse === 0
                                    }
                                    onChange={() => {
                                      const newSkills = [...formData.skills];
                                      const newParts = [
                                        ...newSkills[skill].parts,
                                      ];

                                      // Đặt answerTrueFalse thành 0 (true)
                                      newParts[partIndex].questionTypePart[
                                        qIndex
                                      ].questions[qtnIndex].answerTrueFalse = 0;

                                      // Cập nhật kỹ năng mới
                                      newSkills[skill] = {
                                        ...newSkills[skill],
                                        parts: newParts,
                                      };

                                      // Cập nhật formData với kỹ năng mới
                                      handleDataChange({
                                        ...formData,
                                        skills: newSkills,
                                      });
                                    }}
                                    className="form-radio"
                                  />
                                  <span className="ml-2">true</span>
                                </label>

                                <label className="inline-flex items-center mr-4">
                                  <input
                                    type="radio"
                                    name={`questionType-${partIndex}-${qIndex}`}
                                    value="false"
                                    checked={
                                      formData.skills[skill].parts[partIndex]
                                        .questionTypePart[qIndex].questions[
                                        qtnIndex
                                      ].answerTrueFalse === 1
                                    }
                                    onChange={() => {
                                      const newSkills = [...formData.skills];
                                      const newParts = [
                                        ...newSkills[skill].parts,
                                      ];

                                      // Đặt answerTrueFalse thành 1 (false)
                                      newParts[partIndex].questionTypePart[
                                        qIndex
                                      ].questions[qtnIndex].answerTrueFalse = 1;

                                      // Cập nhật kỹ năng mới
                                      newSkills[skill] = {
                                        ...newSkills[skill],
                                        parts: newParts,
                                      };

                                      // Cập nhật formData với kỹ năng mới
                                      handleDataChange({
                                        ...formData,
                                        skills: newSkills,
                                      });
                                    }}
                                    className="form-radio"
                                  />
                                  <span className="ml-2">false</span>
                                </label>
                              </div>
                            </div>
                          )}
                        </>
                      )}
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

              {(skill === 0 || skill === 1) && (
                <button
                  type="button"
                  onClick={() => addQuestionTypePart(partIndex)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Add Question Type
                </button>
              )}

              <div className="flex gap-5">
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
              width: "3px",
              height: "100%",
            }}
            onMouseDown={() => startResizing("main")}
          />
        </div>

        {/* Preview  */}
        <div className="p-2 w-1/2 h-[630px]">
          <h4>Preview </h4>
          <AnswerSide parts={parts} />
        </div>
      </div>
    </div>
  );
};

export default FormSkill;
