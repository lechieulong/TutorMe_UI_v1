import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SkillForm from "./SkillForm";

const TestFormDetail = ({ onFormSubmit }) => {
  const { control, watch, resetField } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const dispatch = useDispatch();

  const skills = ["Reading", "Listening", "Writing", "Speaking"];

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSelected) => {
      if (prevSelected.includes(skill)) {
        resetField(`skills.${skill}`);
        return prevSelected.filter((s) => s !== skill);
      } else {
        return [...prevSelected, skill];
      }
    });
  };

  // Watch form changes and submit data whenever it changes
  const formData = watch(); // Watch for form changes

  // Update parent component with the current form data
  React.useEffect(() => {
    onFormSubmit(formData);
  }, [formData, onFormSubmit]);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <div className="flex flex-wrap space-x-4 mb-4">
          {skills.map((skill) => (
            <button
              key={skill}
              className={`p-2 border border-blue-300 rounded ${
                selectedSkills.includes(skill)
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <form>
        {selectedSkills.map((skill) => (
          <SkillForm key={skill} skill={skill} control={control} />
        ))}
      </form>
    </div>
  );
};

export default TestFormDetail;
