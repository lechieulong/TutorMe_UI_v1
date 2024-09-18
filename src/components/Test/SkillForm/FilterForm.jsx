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
    { value: "class10", label: "Class 9" },
  ];

  const skills = [
    { id: 1, name: "Reading" },
    { id: 2, name: "Listening" },
    { id: 3, name: "Writing" },
    { id: 4, name: "Speaking" },
    { id: 5, name: "All" },
  ];

  const handleClassChange = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
    onSelectClass(selectedOptions);
  };

  const handleSkillChange = (id) => {
    let newSkills;

    if (id === 5) {
      // Toggle 'All' checkbox
      if (selectedSkills.includes(5)) {
        // Unchecking 'All', remove 'All' from selected skills
        newSkills = selectedSkills.filter((skill) => skill !== 5);
      } else {
        // Checking 'All', add all individual skills to selected skills
        newSkills = [1, 2, 3, 4, 5];
      }
    } else {
      // Toggle individual skills
      newSkills = selectedSkills.includes(id)
        ? selectedSkills.filter((skill) => skill !== id)
        : [...selectedSkills, id];

      // Manage 'All' checkbox based on individual skills
      const allSkills = [1, 2, 3, 4];
      const allSelected = allSkills.every((skill) => newSkills.includes(skill));

      if (allSelected) {
        // Add 'All' if all individual skills are selected
        if (!newSkills.includes(5)) {
          newSkills.push(5);
        }
      } else {
        // Remove 'All' if not all individual skills are selected
        newSkills = newSkills.filter((skill) => skill !== 5);
      }
    }

    setSelectedSkills(newSkills);
    onSelectSkill(newSkills); // Notify parent component
  };

  return (
    <div className="mt-2 mb-5">
      <div className="flex gap-10 items-center">
        {/* Classes Section */}
        <div className="w-5/12">
          <h2 className="mb-2 font-extrabold">
            <span className="mr-4">
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
          <h2 className="font-extrabold">
            <span className="mr-4">
              <FontAwesomeIcon icon={faThunderstorm} />
            </span>
            Skills
          </h2>
          <div className="flex gap-4 items-center mt-1 border rounded-lg p-3 bg-green-400 text-white">
            {skills.map((skill) => (
              <label
                key={skill.id}
                className={`flex items-center gap-3 rounded-lg transition duration-300 ease-in-out ${
                  skill.id === 5 ? "" : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  id={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSkillChange(skill.id)}
                  className="form-checkbox tex text-blue-500 dark:text-blue-400"
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
