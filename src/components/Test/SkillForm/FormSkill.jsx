import React, { useState } from "react";

const FormSkill = ({ skill, formData, handleDataChange }) => {
  const { parts } = formData;
  const [selectedPartIndex, setSelectedPartIndex] = useState(null);

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
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">{skill}</h2>
      <div className="flex">
        <div className="w-1/2">
          {parts.map((part, partIndex) => (
            <div
              key={partIndex}
              className="flex gap-2 mb-4 cursor-pointer"
              onClick={() => handlePartClick(partIndex)}
            >
              <div className="w-full shadow p-4 border rounded-lg">
                <h3 className="text-lg font-medium">Part {part.partNumber}</h3>
                {skill === "reading" && (
                  <label className="block mt-2">
                    Content
                    <textarea
                      name="contentText"
                      value={part.contentText}
                      onChange={(e) => handleInputChange(partIndex, e)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      rows="6"
                      placeholder="Enter content text"
                    />
                  </label>
                )}

                {skill !== "speaking" && (
                  <label className="block mt-2">
                    Image Upload:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(partIndex, e)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </label>
                )}

                {skill === "listening" && (
                  <label className="block mt-2">
                    Audio Upload:
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleAudioChange(partIndex, e)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </label>
                )}

                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Questions</h4>
                  {(part.questions || []).map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="border p-4 mb-2 rounded-md shadow-sm"
                    >
                      {(skill === "reading" || skill === "listening") && (
                        <label className="block mt-2">
                          Question Type:
                          <select
                            name="questionType"
                            value={question.questionType}
                            onChange={(e) =>
                              handleQuestionChange(partIndex, questionIndex, e)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                          >
                            <option value="1">Multiple Choice</option>
                            <option value="2">Fill-in-the-Blank</option>
                            <option value="3">Select Answer</option>
                            <option value="4">Matching Heading</option>
                          </select>
                        </label>
                      )}

                      <label className="block mt-2">
                        Question Name:
                        <input
                          type="text"
                          name="questionName"
                          value={question.questionName}
                          onChange={(e) =>
                            handleQuestionChange(partIndex, questionIndex, e)
                          }
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                      </label>

                      {(skill === "reading" || skill === "listening") && (
                        <label className="block mt-2">
                          Answer:
                          <input
                            type="text"
                            name="answer"
                            value={question.answer}
                            onChange={(e) =>
                              handleQuestionChange(partIndex, questionIndex, e)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
                            handleQuestionChange(partIndex, questionIndex, e)
                          }
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeQuestion(partIndex, questionIndex)}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addQuestion(partIndex)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Question
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removePart(partIndex)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Part
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPart}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Part
          </button>
        </div>

        <div className="w-1/2 ml-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Review Content</h2>
          {selectedPartIndex !== null ? (
            <>
              <h3 className="text-lg font-medium">
                Part {parts[selectedPartIndex]?.partNumber}
              </h3>
              <p>
                <strong>Content:</strong> {selectedPart.contentText}
              </p>
              {selectedPart.imgUrl && (
                <div className="mt-2">
                  <img
                    src={selectedPart.imgUrl}
                    alt={`Part ${parts[selectedPartIndex]?.partNumber} Image`}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
              {selectedPart.videoUrl && (
                <div className="mt-2">
                  <video
                    controls
                    src={selectedPart.videoUrl}
                    className="max-w-full"
                  />
                </div>
              )}
              {selectedPart.audioUrl && (
                <div className="mt-2">
                  <audio
                    controls
                    src={selectedPart.audioUrl}
                    className="max-w-full"
                  />
                </div>
              )}
              {selectedPart.questions?.map((question, index) => (
                <div key={index} className="mt-2">
                  <h4 className="font-semibold">Question {index + 1}</h4>
                  <p>
                    <strong>Name:</strong> {question.questionName}
                  </p>
                  <p>
                    <strong>Type:</strong> {question.questionType}
                  </p>
                  <p>
                    <strong>Max Marks:</strong> {question.maxMarks}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p>Please select a part to review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSkill;
