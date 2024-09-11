import React, { useState } from "react";
import ReadingForm from "../../components/Test/SkillForm/ReadingForm";
import ListeningForm from "../../components/Test/SkillForm/ListeningForm";
import WritingForm from "../../components/Test/SkillForm/WrittingForm"; // Fixed typo
import SpeakingForm from "../../components/Test/SkillForm/SpeakingForm";
import FilterForm from "../../components/Test/SkillForm/FilterForm";
import Header from "../../components/common/Header";
import { faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestForm = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    Id: "",
    testName: "",
    classId: "",
    duration: 40,
    startTime: "",
    createDate: "",
    endTime: "",
    parts: [
      {
        partId: "",
        testId: "",
        partNumber: 1,
        skillTest: 1,
        contentText: "",
        imgUrl: "",
        audioUrl: "",
      },
    ],
  });

  const handleSelectClass = (classes) => {
    setSelectedClasses(classes);
  };

  const handleSelectSkill = (skills) => {
    setSelectedSkills(skills);
  };

  const handleDataChange = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleWritingDataChange = (index, newData) => {
    setFormData((prevData) => {
      let updatedWriting = [...prevData.writing];
      updatedWriting[index] = { ...updatedWriting[index], ...newData };
      return {
        ...prevData,
        writing: updatedWriting,
      };
    });
  };

  const handleAddPart = () => {
    if (formData.writing.length < 2) {
      setFormData((prevData) => {
        const newPart = {
          img: null,
          content: "",
          part: prevData.writing.length
            ? prevData.writing[prevData.writing.length - 1].part + 1
            : 1,
        };
        return {
          ...prevData,
          writing: [...prevData.writing, newPart],
        };
      });
    } else {
      alert("You can only add up to 2 parts.");
    }
  };

  const handleRemovePart = (index) => {
    if (formData.writing.length > 1) {
      setFormData((prevData) => {
        const updatedWriting = prevData.writing.filter((_, i) => i !== index);
        return {
          ...prevData,
          writing: updatedWriting,
        };
      });
    } else {
      alert("You must have at least 1 part.");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Data ne ", formData);
      // Uncomment and replace with your API endpoint
      // const response = await fetch("https://your-api-endpoint.com/submit", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     selectedClasses,
      //     formData,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      alert("Submission successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const renderSkillForms = () => {
    return selectedSkills.map((skill) => {
      switch (skill) {
        case "reading":
          return (
            <ReadingForm
              key={skill}
              formData={formData}
              handleDataChange={handleDataChange}
            />
          );
        case "listening":
          return <ListeningForm key={skill} />;
        case "writing":
          return (
            <WritingForm
              key={skill}
              formData={formData}
              handleWritingDataChange={handleWritingDataChange}
              handleAddPart={handleAddPart}
              handleRemovePart={handleRemovePart}
            />
          );
        case "speaking":
          return <SpeakingForm key={skill} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="container mt-14 p-3">
      <Header />
      <h3 className="mt-2 mb-4 text-2xl font-semibold text-gray-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faStream} />
        </span>
        Form Create Test
      </h3>
      <FilterForm
        onSelectClass={handleSelectClass}
        onSelectSkill={handleSelectSkill}
      />
      <main className="container mx-auto">
        {renderSkillForms()}

        {selectedSkills.length > 0 && (
          <button
            className="mt-4 w-28 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </main>
    </div>
  );
};

export default TestForm;
