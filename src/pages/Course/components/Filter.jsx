import React from "react";
import { FaSearch } from "react-icons/fa";

// Ánh xạ các kỹ năng thành số theo yêu cầu backend
const skillMapping = {
  All: "All",
  Reading: "0",
  Listening: "1",
  Writing: "2",
  Speaking: "3",
};

const Filter = ({
  categories,
  selectedSkill,
  onSkillSelect,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center md:flex-row md:justify-between">
      <div className="flex flex-wrap justify-center md:ml-4 mb-4 md:mb-0">
        {categories.map((skill) => (
          <button
            key={skill}
            onClick={() => onSkillSelect(skillMapping[skill])}
            className={`px-3 py-1.5 mx-1 text-sm font-medium rounded-lg ${
              selectedSkill === skillMapping[skill]
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800"
            } hover:bg-blue-700`}
          >
            {skill}
          </button>
        ))}
      </div>
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-3 py-1.5 pl-10 border border-gray-300 rounded-lg w-full text-sm"
        />
      </div>
    </div>
  );
};

export default Filter;
