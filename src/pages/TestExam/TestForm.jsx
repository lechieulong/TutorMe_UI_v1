import React, { useState } from "react";
import ReadingForm from "../../components/Test/SkillForm/ReadingForm";
import ListeningForm from "../../components/Test/SkillForm/ListeningForm";
import WritingForm from "../../components/Test/SkillForm/WrittingForm";
import SpeakingForm from "../../components/Test/SkillForm/SpeakingForm";
import FilterForm from "../../components/Test/SkillForm/FilterForm";
import Header from "../../components/common/Header";

const TestForm = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSelectClass = (classes) => {
    setSelectedClasses(classes);
  };

  const handleSelectSkill = (skills) => {
    setSelectedSkills(skills);
  };

  const renderSkillForms = () => {
    return selectedSkills.map((skill) => {
      switch (skill) {
        case "reading":
          return <ReadingForm key={skill} />;
        case "listening":
          return <ListeningForm key={skill} />;
        case "writing":
          return <WritingForm key={skill} />;
        case "speaking":
          return <SpeakingForm key={skill} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen container mt-20 bg-gray-100">
      <Header />
      <h3 className="mt-2 mb-8 text-2xl font-semibold">Form Create Test</h3>
      <FilterForm
        onSelectClass={handleSelectClass}
        onSelectSkill={handleSelectSkill}
      />
      <main className="p-6  mx-auto">
        {renderSkillForms()}
        {selectedSkills.length > 0 && (
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => alert("Submit functionality not yet implemented")}
          >
            Submit
          </button>
        )}
      </main>
    </div>
  );
};

export default TestForm;
