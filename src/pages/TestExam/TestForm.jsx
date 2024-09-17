import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormSkill from "../../components/Test/SkillForm/FormSkill";
import FilterForm from "../../components/Test/SkillForm/FilterForm";
import Header from "../../components/common/Header";
import { faPlane, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faFly } from "@fortawesome/free-brands-svg-icons";

import { createTest } from "../../redux/testExam/TestSlice";

const TestForm = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    testName: "",
    classIds: [],
    duration: 40,
    startTime: new Date(),
    endTime: new Date(),
    parts: [
      {
        partNumber: 1,
        skillTest: 1,
        contentText: "",
        audioUrl: "",
        questionTypePart: [
          {
            questionGuide: "",
            questionType: "",
            questions: [
              {
                questionName: "",
                answer: "",
                maxMarks: 1,
              },
            ],
          },
        ],
      },
    ],
  });
  const dispatch = useDispatch();

  const handleSelectClass = (classes) => {
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
      dispatch(createTest(formData));
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
    <div className="w-full p-3 mt-16">
      <Header />
      <h3 className="mb-4 text-2xl font-semibold text-gray-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faStream} />
        </span>
        Form Create Test
      </h3>

      <div className="p-6 bg-green-50 shadow-lg rounded-lg border border-gray-200">
        <div className="flex  gap-3 mb-6 ">
          <div className="w-6/12">
            <label
              htmlFor="testName"
              className="block font-semibold  text-gray-800"
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

          <div className="w-5/12">
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
        </div>
        <FilterForm
          onSelectClass={handleSelectClass}
          onSelectSkill={handleSelectSkill}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex gap-6">
            <div className="mb-6">
              <label
                htmlFor="startTime"
                className="block font-semibold text-gray-800"
              >
                Start Time
              </label>
              <DateTimePicker
                id="startTime"
                value={formData.startTime}
                onChange={(newValue) =>
                  handleDataChange({ startTime: newValue })
                }
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    className="mt-2  block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="endTime"
                className="block font-semibold text-gray-800"
              >
                End Time
              </label>
              <DateTimePicker
                id="endTime"
                value={formData.endTime}
                onChange={(newValue) => handleDataChange({ endTime: newValue })}
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
            </div>
          </div>
        </LocalizationProvider>
      </div>

      <main className="mx-auto mt-8 rounded  border-2 ">
        {renderSkillForms()}

        {selectedSkills.length > 0 && (
          <div className="p-2">
            <button
              className="w-28 ml-10  bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={handleSubmit}
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faPlane} />
              </span>
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestForm;
