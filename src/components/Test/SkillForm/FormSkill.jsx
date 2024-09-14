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

const FormSkill = ({ skill, formData, handleDataChange }) => {
  const { parts } = formData;
  const [selectedPartIndex, setSelectedPartIndex] = useState(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [previewWith, setPreviewWith] = useState(50);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  const [subPartType, setSubPartType] = useState({
    matching: 1,
    multiple: 1,
    "true-false": 1,
    filling: 1,
  });

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

  const handleSelectTypeQuestion = (item) => {
    console.log(item);

    setSelectedQuestionType(item);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedParts = [...parts];
    updatedParts[index] = { ...updatedParts[index], [name]: value };
    handleDataChange({ parts: updatedParts });
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedParts = [...parts];
        updatedParts[index].imgUrl = reader.result;
        handleDataChange({ parts: updatedParts });
      };
      reader.readAsDataURL(file);
    }
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
      partId: "",
      testId: "",
      partNumber: parts.length + 1,
      skillTest: 1,
      contentText: "",
      imgUrl: "",
      videoUrl: "",
      audioUrl: "",
      questions: [],
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

  const handleQuestionChange = (partIndex, questionIndex, event) => {
    const { name, value } = event.target;
    const updatedParts = [...parts];
    const updatedQuestions = [...(updatedParts[partIndex].questions || [])];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [name]: value,
    };
    updatedParts[partIndex] = {
      ...updatedParts[partIndex],
      questions: updatedQuestions,
    };
    handleDataChange({ parts: updatedParts });
  };

  const addQuestion = (partIndex) => {
    const newQuestion = {
      Id: "",
      partId: parts[partIndex].partId,
      subPartId: "",
      questionName: "",
      questionType: 1,
      answer: "",
      order: (parts[partIndex].questions?.length || 0) + 1,
      maxMarks: 1,
    };
    const updatedParts = [...parts];
    updatedParts[partIndex].questions = [
      ...(updatedParts[partIndex].questions || []),
      newQuestion,
    ];
    handleDataChange({ parts: updatedParts });
  };

  const removeQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions = (
      updatedParts[partIndex].questions || []
    ).filter((_, i) => i !== questionIndex);
    handleDataChange({ parts: updatedParts });
  };

  const handlePartClick = (index) => {
    setSelectedPartIndex(index);
  };

  const selectedPart = parts[selectedPartIndex] || {};

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
          className="overflow-auto  h-[640px] hide-scrollbar"
          style={{ width: `${leftWidth}%` }}
        >
          {parts.map((part, partIndex) => (
            <div
              key={partIndex}
              className="flex gap-2  cursor-pointer"
              onClick={() => handlePartClick(partIndex)}
            >
              <div className="w-full flex flex-col gap-3 p-4 border  shadow-xl bg-yellow-50  rounded-lg">
                <h3 className="text-lg font-medium">Part {part.partNumber}</h3>
                {skill !== "speaking" && (
                  <label className="block mt-2">
                    <span className="text-lg"> Image topic content:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(partIndex, e)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </label>
                )}
                {skill === "reading" && (
                  <div className="  mt-2">
                    content topic
                    <div className="mt-2 relative w-full h-[300px] overflow-auto">
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
                  <label className="block text-base mt-2">
                    Audio Upload:
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleAudioChange(partIndex, e)}
                      className="mt-1  block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </label>
                )}

                {/* Question Form  */}
                <div className="mt-4 border p-4 mb-2 rounded-md shadow-sm">
                  <div className="flex justify-between items-center border-b-2 p-2 border-gray-200">
                    <h4 className="text-lg font-semibold">
                      Questions
                      <span>
                        {"   "}
                        <FontAwesomeIcon icon={faQuestionCircle} />
                      </span>
                    </h4>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Multiple", "Matching", "True-False", "Filling"].map(
                      (item, index) => (
                        <div key={index}>
                          {" "}
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectTypeQuestion(item)}
                            className={`bg-yellow-300 text-gray-700 px-4 py-2 rounded-lg  ${
                              selectedQuestionType === item ? "bg-blue-400" : ""
                            }`}
                          >
                            {item}
                          </button>
                          {selectedQuestionType === item && (
                            <>
                              {(part.questions || []).map(
                                (question, questionIndex) => (
                                  <div
                                    key={questionIndex}
                                    className="flex flex-col gap-3"
                                  >
                                    <h3 className="mt-4 font-extrabold">
                                      Question {questionIndex + 1}
                                    </h3>

                                    {(skill === "reading" ||
                                      skill === "listening") && (
                                      <label className="block text-base">
                                        Question Type:
                                        <input
                                          type="text"
                                          value={selectedQuestionType}
                                          readOnly
                                          className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                                        />
                                      </label>
                                    )}

                                    <label className="block mt-2 text-sm">
                                      Question Name:
                                      <input
                                        type="text"
                                        name="questionName"
                                        value={question.questionName}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            partIndex,
                                            questionIndex,
                                            e
                                          )
                                        }
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                      />
                                    </label>

                                    {(skill === "reading" ||
                                      skill === "listening") && (
                                      <label className="block mt-2">
                                        Answer:
                                        <input
                                          type="text"
                                          name="answer"
                                          value={question.answer}
                                          onChange={(e) =>
                                            handleQuestionChange(
                                              partIndex,
                                              questionIndex,
                                              e
                                            )
                                          }
                                          className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                        />
                                      </label>
                                    )}

                                    <label className="block mt-2">
                                      Max Marks:
                                      <input
                                        type="number"
                                        name="maxMarks"
                                        value={question.maxMarks}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            partIndex,
                                            questionIndex,
                                            e
                                          )
                                        }
                                        className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                      />
                                    </label>
                                  </div>
                                )
                              )}

                              {/*Button  Question Form  */}
                              <div className="flex gap-2 justify-center items-center mt-2">
                                <button
                                  type="button"
                                  onClick={() => addQuestion(partIndex)}
                                  className=" bg-yellow-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-yellow-400"
                                >
                                  <span className="mr-2">
                                    <FontAwesomeIcon icon={faPlus} />
                                  </span>
                                  Add Question
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeQuestion(partIndex, questionIndex)
                                  }
                                  className="h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/*End  Question Form  */}

                {/* Remove part || Add part */}
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
            </div>
          ))}
        </div>

        <div>
          <div
            className="cursor-ew-resize  bg-gray-400 "
            style={{
              width: "5px",
              height: "calc(100% )",
            }}
            onMouseDown={() => startResizing("main")}
          />
        </div>

        <div
          className="  p-4 border rounded-lg overflow-auto h-[650px]"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <h2 className="text-2xl font-semibold">Preview </h2>
          {selectedPartIndex !== null ? (
            <div className="flex ">
              <div
                className="overflow-auto flex flex-col  gap-3 leading-relaxed"
                style={{ width: `${previewWith}%` }}
              >
                {selectedPart.audioUrl && (
                  <div className="">
                    <audio
                      controls
                      src={selectedPart.audioUrl}
                      className="max-w-full"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium ">
                  Part {parts[selectedPartIndex]?.partNumber}
                </h3>
                {selectedPart.imgUrl && (
                  <div className="mt-2">
                    <img
                      src={selectedPart.imgUrl}
                      alt={`Part ${parts[selectedPartIndex]?.partNumber} Image`}
                      className="max-w-full h-auto"
                    />
                  </div>
                )}

                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedPart.contentText,
                  }}
                />
              </div>

              <div>
                <div
                  className="cursor-ew-resize  bg-gray-400 "
                  style={{
                    width: "5px",
                    height: "calc(100% )",
                  }}
                  onMouseDown={() => startResizing("preview")}
                />
              </div>

              <div
                className="overflow-auto bg-green-200 flex flex-col gap-4"
                style={{ width: `${100 - previewWith}%` }}
              >
                <p>Hello</p>
                {selectedPart.questions?.map((question, index) => (
                  <div key={index} className="mt-2">
                    <h4 className="font-semibold">Question {index + 1}</h4>
                    <p>{question.questionName}</p>
                    <p>{question.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Please select a part to review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSkill;
