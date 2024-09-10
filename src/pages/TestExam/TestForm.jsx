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
    reading: "",
    listening: [
      {
        audio: "url",
        part: 1,
        question: [
          {
            name: "",
            type: "",
          },
        ],
      },
    ],
    writing: [
      {
        img: null,
        content: "",
        part: 1,
      },
    ],
    speaking: "",
  });

  const handleSelectClass = (classes) => {
    setSelectedClasses(classes);
  };

  const handleSelectSkill = (skills) => {
    setSelectedSkills(skills);
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
          return <ReadingForm key={skill} />;
        case "listening":
          return <ListeningForm key={skill} />;
        case "writing":
          return (
            <div key={skill} className="flex flex-row gap-8 mt-8">
              {/* Writing Form */}
              <div className="w-1/2">
                <WritingForm
                  skillData={formData.writing}
                  onDataChange={(index, newData) =>
                    handleWritingDataChange(index, newData)
                  }
                  onAddPart={handleAddPart}
                  onRemovePart={handleRemovePart}
                />
              </div>
              {/* Preview Section */}
              <div className="w-1/2 border-l-2 border-gray-200 pl-4 max-h-[600px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                {formData.writing.map((part, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-semibold">Part {part.part}</h4>
                    {part.img && (
                      <img
                        src={part.img}
                        alt={`Preview of Part ${part.part}`}
                        className="w-full max-w-sm mt-2"
                      />
                    )}
                    <p>{part.content || "No content yet"}</p>
                  </div>
                ))}
              </div>
            </div>
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
