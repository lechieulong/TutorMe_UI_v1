import React, { useState } from "react";

const SelectOptions = ({ order, question }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-5">
      <div className="mt-2 flex  gap-3">
        <p>{order}</p>
        <select
          id="select-input"
          value={selectedOption}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.answers.map((ans, index) => (
            <option key={index} value={ans.name}>
              {ans.name}
            </option>
          ))}
        </select>
        <p>Content answers</p>
      </div>
    </div>
  );
};

export default SelectOptions;
