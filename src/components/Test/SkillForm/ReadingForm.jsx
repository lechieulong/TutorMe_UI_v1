import React, { useState } from "react";

const ReadingForm = ({ formData, handleDataChange }) => {
  const { parts } = formData;

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

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

        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedParts = [...parts];
        updatedParts[index].videoUrl = reader.result;
        handleDataChange({ parts: updatedParts });

        const newPreviews = [...videoPreviews];
        newPreviews[index] = reader.result;
        setVideoPreviews(newPreviews);
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
      questions: [], // Initialize questions array
    };
    handleDataChange({ parts: [...parts, newPart] });
    setImagePreviews([...imagePreviews, ""]);
    setVideoPreviews([...videoPreviews, ""]);
  };

  const removePart = (index) => {
    if (parts.length > 1) {
      const updatedParts = parts.filter((_, i) => i !== index);
      handleDataChange({ parts: updatedParts });

      const updatedImagePreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedImagePreviews);

      const updatedVideoPreviews = videoPreviews.filter((_, i) => i !== index);
      setVideoPreviews(updatedVideoPreviews);
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
      questionType: 1, // Default type
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

  return (
    <div>
      <h2 className="text-xl font-semibold">Reading Form</h2>
      {parts.map((part, partIndex) => (
        <div key={partIndex} className="flex gap-2 mb-4">
          <div className="w-1/2 p-4 border rounded-lg shadow">
            <h3 className="text-lg font-medium">Part {part.partNumber}</h3>
            <label className="block mt-2">
              Content Text:
              <input
                type="text"
                name="contentText"
                value={part.contentText}
                onChange={(e) => handleInputChange(partIndex, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block mt-2">
              Image Upload:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(partIndex, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {imagePreviews[partIndex] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[partIndex]}
                    alt={`Image Preview ${part.partNumber}`}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </label>
            <label className="block mt-2">
              Video Upload:
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoChange(partIndex, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {videoPreviews[partIndex] && (
                <div className="mt-2">
                  <video
                    controls
                    src={videoPreviews[partIndex]}
                    alt={`Video Preview ${part.partNumber}`}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </label>
            <label className="block mt-2">
              Audio URL:
              <input
                type="text"
                name="audioUrl"
                value={part.audioUrl}
                onChange={(e) => handleInputChange(partIndex, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Questions</h4>
              {(part.questions || []).map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="border p-4 mb-2 rounded-md shadow-sm"
                >
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
                  <label className="block mt-2">
                    Question Type:
                    <input
                      type="number"
                      name="questionType"
                      value={question.questionType}
                      onChange={(e) =>
                        handleQuestionChange(partIndex, questionIndex, e)
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                  </label>
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

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => removePart(partIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove Part
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Part
      </button>
    </div>
  );
};

export default ReadingForm;
