import React, { useState, useEffect } from "react";

// Initialize GoogleGenerativeAI
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WritingForm = ({ skillData, onDataChange, onAddPart, onRemovePart }) => {
  const [writingData, setWritingData] = useState(skillData);

  useEffect(() => {
    setWritingData(skillData); // Update local state when prop changes
  }, [skillData]);

  const handlePartChange = (index, field, value) => {
    const updatedWritingData = [...writingData];
    updatedWritingData[index] = {
      ...updatedWritingData[index],
      [field]: value,
    };
    setWritingData(updatedWritingData);
    onDataChange(index, updatedWritingData[index]); // Notify parent about data change
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedWritingData = [...writingData];
      updatedWritingData[index] = {
        ...updatedWritingData[index],
        img: URL.createObjectURL(file),
      };
      setWritingData(updatedWritingData);
      onDataChange(index, updatedWritingData[index]); // Notify parent about data change
    }
  };

  return (
    <div className="">
      {writingData.map((part, index) => (
        <div
          key={part.part}
          className="mb-4 flex flex-col gap-4 border shadow-lg p-3"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Part {part.part}</h4>
            {writingData.length > 1 && (
              <button
                type="button"
                onClick={() => onRemovePart(index)}
                className="mt-2 bg-red-500 text-white  text-[12px] rounded-lg hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e)}
            className="mb-2"
          />
          <textarea
            value={part.content || ""}
            onChange={(e) => handlePartChange(index, "content", e.target.value)}
            rows="10"
            placeholder="Enter contents"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      ))}
      {writingData.length < 2 && (
        <button
          type="button"
          onClick={onAddPart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Part
        </button>
      )}
    </div>
  );
};

export default WritingForm;
