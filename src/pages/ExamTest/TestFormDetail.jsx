import React from "react";
import SkillForm from "./SkillForm";

const TestFormDetail = ({
  control,
  resetField,
  selectedSkills,
  setSelectedSkills,
  skillsCourse,
}) => {
  let skills = ["Reading", "Listening", "Writing", "Speaking"];
  skills = skillsCourse ? skillsCourse : skills;

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

  return (
    <div className="p-10">
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

      {selectedSkills.map((skill) => (
        <SkillForm key={skill} skill={skill} control={control} />
      ))}
    </div>
  );
};

export default TestFormDetail;
