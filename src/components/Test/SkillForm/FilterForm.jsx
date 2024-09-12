import React, { useState, useEffect } from "react";
import CustomSelect from "../../common/CustomSelect"; // Adjust the path as needed
import { faThunderstorm, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterForm = ({ onSelectClass, onSelectSkill }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const classes = [
    { value: "class1", label: "Class 1" },
    { value: "class2", label: "Class 2" },
    { value: "class3", label: "Class 3" },
    { value: "class5", label: "Class 4" },
    { value: "class6", label: "Class 5" },
    { value: "class7", label: "Class 6" },
    { value: "class8", label: "Class 7" },
    { value: "class9", label: "Class 8" },
    { value: "class10", label: "Class9" },
  ];

  const skills = [
    { id: "reading", name: "Reading" },
    { id: "listening", name: "Listening" },
    { id: "writing", name: "Writing" },
    { id: "speaking", name: "Speaking" },
    { id: "all", name: "All" },
  ];

  const handleClassChange = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
    onSelectClass(selectedOptions);
  };

  const handleSkillChange = (id) => {
    let newSkills;

    if (id === "all") {
      // Toggle 'All' checkbox
      if (selectedSkills.includes("all")) {
        // Unchecking 'All', remove 'All' from selected skills
        newSkills = selectedSkills.filter((skill) => skill !== "all");
      } else {
        // Checking 'All', add all individual skills to selected skills
        newSkills = ["reading", "listening", "writing", "speaking", "all"];
      }
    } else {
      // Toggle individual skills
      newSkills = selectedSkills.includes(id)
        ? selectedSkills.filter((skill) => skill !== id)
        : [...selectedSkills, id];

      // Manage 'All' checkbox based on individual skills
      const allSkills = ["reading", "listening", "writing", "speaking"];
      const allSelected = allSkills.every((skill) => newSkills.includes(skill));

      if (allSelected) {
        // Add 'All' if all individual skills are selected
        if (!newSkills.includes("all")) {
          newSkills.push("all");
        }
      } else {
        // Remove 'All' if not all individual skills are selected
        newSkills = newSkills.filter((skill) => skill !== "all");
      }
    }

    setSelectedSkills(newSkills);
    onSelectSkill(newSkills); // Notify parent component
  };

  return (
    <div className="bg-green-500 h-40 container  text-gray-100 p-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center gap-11">
        {/* Classes Section */}
        <div className="flex-1">
          <h2 className="text-xl  mb-2 font-thin">
            {" "}
            <span className="mr-4 ">
              <FontAwesomeIcon icon={faLandmark} />
            </span>
            Classes
          </h2>
          <CustomSelect
            options={classes}
            placeholder="Select multiple classes..."
            onChange={handleClassChange}
          />
        </div>

        {/* Skills Section */}
        <div className="">
          <h2 className="text-xl font-thin mb-2">
            {" "}
            <span className="mr-4">
              <FontAwesomeIcon icon={faThunderstorm} />
            </span>
            Skills
          </h2>
          <div className="flex gap-4 items-center mt-4">
            {skills.map((skill) => (
              <label
                key={skill.id}
                className={`flex items-center gap-3 rounded-lg transition duration-300 ease-in-out ${
                  skill.id === "all" ? "" : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  id={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSkillChange(skill.id)}
                  className="form-checkbox text-blue-500 dark:text-blue-400"
                />
                <span className="">{skill.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
