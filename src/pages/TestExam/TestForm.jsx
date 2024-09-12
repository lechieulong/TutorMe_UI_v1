import React, { useState } from "react";
import FormSkill from "../../components/Test/SkillForm/FormSkill";
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
    classIds: [],
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
    setFormData((prevData) => ({
      ...prevData,
      classIds: classes,
    }));
  };

  const handleSelectSkill = (skills) => setSelectedSkills(skills);

  const handleDataChange = (updatedData) =>
    setFormData((prevData) => ({ ...prevData, ...updatedData }));

  const handleSubmit = async () => {
    try {
      console.log("Data: ", formData);
      // Uncomment and replace with your API endpoint
      // const response = await fetch("https://your-api-endpoint.com/submit", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ selectedClasses, formData }),
      // });

      // if (!response.ok) throw new Error("Network response was not ok");

      alert("Submission successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const renderSkillForms = () =>
    selectedSkills.map((skill) => (
      <FormSkill
        skill={skill}
        key={skill}
        formData={formData}
        handleDataChange={handleDataChange}
      />
    ));

  return (
    <div className="container mt-14 p-3 bg-green-50">
      <Header />
      <h3 className="mt-2 mb-4 text-2xl font-semibold text-gray-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faStream} />
        </span>
        Form Create Test
      </h3>

      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="mb-6">
          <label
            htmlFor="testName"
            className="block font-semibold text-gray-800"
          >
            Test Name
          </label>
          <input
            id="testName"
            type="text"
            value={formData.testName}
            onChange={(e) => handleDataChange({ testName: e.target.value })}
            className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter test name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block font-semibold text-gray-800"
          >
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleDataChange({ duration: e.target.value })}
            className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter duration"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="startTime"
            className="block font-semibold text-gray-800"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => handleDataChange({ startTime: e.target.value })}
            className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="endTime"
            className="block font-semibold text-gray-800"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => handleDataChange({ endTime: e.target.value })}
            className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <FilterForm
        onSelectClass={handleSelectClass}
        onSelectSkill={handleSelectSkill}
      />

      <main className="container mx-auto mt-8">
        {renderSkillForms()}

        {selectedSkills.length > 0 && (
          <button
            className="w-28 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
