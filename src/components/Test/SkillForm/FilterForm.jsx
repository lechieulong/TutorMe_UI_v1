import React, { useState } from "react";
import CustomSelect from "../../common/CustomSelect"; // Adjust the path as needed

const FilterForm = ({ onSelectClass, onSelectSkill }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const classes = [
    { value: "class1", label: "Class 1" },
    { value: "class2", label: "Class 2" },
    { value: "class3", label: "Class 3" },
    { value: "class4", label: "Class 4" },
  ];

  const skills = [
    { id: "reading", name: "Reading" },
    { id: "listening", name: "Listening" },
    { id: "writing", name: "Writing" },
    { id: "speaking", name: "Speaking" },
  ];

  const handleClassChange = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
    onSelectClass(selectedOptions);
  };

  const handleSkillChange = (id) => {
    const newSelectedSkills = selectedSkills.includes(id)
      ? selectedSkills.filter((skill) => skill !== id)
      : [...selectedSkills, id];
    setSelectedSkills(newSelectedSkills);
    onSelectSkill(newSelectedSkills);
  };

  return (
    <div className="bg-green-500 text-white p-3 shadow-md rounded-b-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Classes Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2"> Classes</h2>
            <CustomSelect
              options={classes}
              placeholder="Select multiple classes..."
              onChange={handleClassChange}
            />
          </div>

          {/* Skills Section */}
          <div className="">
            <h2 className="text-xl font-semibold mb-2"> Skills</h2>
            <div className="flex  gap-4">
              {skills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex items-center gap-3 rounded-lg   transition duration-300 ease-in-out dark:border-neutral-700 dark:hover:border-blue-400"
                >
                  <input
                    type="checkbox"
                    id={skill.id}
                    checked={selectedSkills.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)}
                    className="form-checkbox  text-blue-500 dark:text-blue-400"
                  />
                  <span className="text-sm ">{skill.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
