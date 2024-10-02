import React, { useState, useEffect } from "react";
import CustomSelect from "../../common/CustomSelect";
import { faThunderstorm, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterForm = ({ onSelectClass, formData, handleDataChange }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const classes = [
    { value: "class1", label: "Class 1" },
    { value: "class2", label: "Class 2" },
    { value: "class3", label: "Class 3" },
    { value: "class4", label: "Class 4" },
    { value: "class5", label: "Class 5" },
    { value: "class6", label: "Class 6" },
    { value: "class7", label: "Class 7" },
    { value: "class8", label: "Class 8" },
    { value: "class9", label: "Class 9" },
  ];

  const skills = [
    { id: 0, name: "Reading" },
    { id: 1, name: "Listening" },
    { id: 2, name: "Writing" },
    { id: 3, name: "Speaking" },
  ];

  useEffect(() => {
    if (formData.skills) {
      setSelectedSkills(formData.skills);
    }
  }, [formData]);

  const handleClassChange = (selectedOptions) => {
    setSelectedClasses(selectedOptions);
    onSelectClass(selectedOptions);
  };

  const handleSkillChange = (id) => {
    let newSkills = [...selectedSkills];

    if (newSkills.some((skill) => skill.type === id)) {
      newSkills = newSkills.filter((skill) => skill.type !== id);
    } else {
      newSkills.push({
        type: id,
        duration: 30,
        parts: [
          {
            partNumber: 1,
            contentText: "",
            audioUrl: "",
            imageUrl: "",
            questionTypeParts: [
              {
                questionGuide: "",
                questionType: 1,
                questions: [],
              },
            ],
          },
        ],
      });
    }

    setSelectedSkills(newSkills);
    handleDataChange({ skills: newSkills });
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
                className="flex items-center gap-3 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={skill.id}
                  checked={selectedSkills.some((s) => s.type === skill.id)}
                  onChange={() => handleSkillChange(skill.id)}
                  className="form-checkbox text-blue-500 dark:text-blue-400"
                />
                <span>{skill.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
