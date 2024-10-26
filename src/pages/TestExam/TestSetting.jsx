import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getParts } from "../../redux/testExam/TestSlice";
import TestLayout from "./TestLayout";

const TestSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skillId } = useParams(); // Get skillId from params

  const [parts, setParts] = useState(null);
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedParts, setSelectedParts] = useState([]); // Array to keep track of selected parts
  const [isTestStarted, setIsTestStarted] = useState(false); // State to control test start

  // Fetch skill parts info
  const fetchSkillPartsInfo = async () => {
    const result = await dispatch(getParts(skillId));
    if (result.payload) {
      setParts(result.payload);
    }
  };

  useEffect(() => {
    fetchSkillPartsInfo();
  }, [dispatch, skillId]);

  const handlePartSelection = (part) => {
    setSelectedParts((prev) => {
      const updatedParts = [...prev];

      if (part === "fullParts") {
        const allPartsSelected = updatedParts.length === parts.length;

        if (allPartsSelected) {
          return [];
        } else {
          return parts.map((p) => p.partNumber);
        }
      } else {
        const partNumber = Number(part);
        if (updatedParts.includes(partNumber)) {
          return updatedParts.filter((p) => p !== partNumber);
        } else {
          return [...updatedParts, partNumber];
        }
      }
    });
  };

  const handleStartTest = () => {
    const duration = timeLimit;
    const testData = {
      duration,
      selectedParts: selectedParts.length ? selectedParts : [], // Use the selected parts
      skillPart: skillId,
    };

    setIsTestStarted(true); // Set test started to true
    navigate("/testing/1", { state: testData });
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(Number(event.target.value)); // Convert value to number
  };

  if (!parts) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  console.log(selectedParts);

  // Check if all parts are selected
  const isFullPartsChecked = selectedParts.length === parts.length;

  return (
    <MainLayout>
      {isTestStarted ? (
        <TestLayout />
      ) : (
        <div className="flex mt-5 justify-center items-center ">
          <div className="bg-white border shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
              Choose a mode
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
              {/* Practice mode */}
              <div className="bg-gray-50 p-4 rounded-lg flex-1 md:mr-4 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Practice mode</h3>
                <p className="text-gray-500 mb-4">
                  Practice mode is suitable for improving accuracy and time
                  spent on each part.
                </p>
                <h4 className="text-lg font-medium mb-2">
                  1. Choose part/task(s) you want to practice:
                </h4>
                <div className="space-y-2 mb-4">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={isFullPartsChecked}
                        onChange={() => handlePartSelection("fullParts")}
                        className="form-checkbox text-green-600"
                      />
                      <span className="ml-2">Full parts</span>
                    </label>
                  </div>
                  {parts.map((part) => (
                    <div key={part.id}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedParts.includes(part.partNumber)} // Check if part is selected
                          onChange={() => handlePartSelection(part.partNumber)}
                          className="form-checkbox text-green-600"
                        />
                        <span className="ml-2">
                          Part {part.partNumber} (13 questions)
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-medium mb-2">
                  2. Choose a time limit:
                </h4>
                <select
                  value={timeLimit}
                  onChange={handleTimeLimitChange}
                  className="form-select w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={60}>60 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={30}>30 mins</option>
                  <option value={15}>15 mins</option>
                </select>
                <button
                  onClick={handleStartTest}
                  className="mt-6 w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700"
                >
                  Start Now
                  <span>
                    <FontAwesomeIcon icon={faBolt} className="ml-2 " />
                  </span>
                </button>
              </div>

              {/* Simulation test mode */}
              <div className="bg-gray-50 p-4 rounded-lg flex-1 md:ml-4">
                <h3 className="text-xl font-semibold mb-2">
                  Simulation test mode
                </h3>
                <p className="text-gray-500 mb-4">
                  Simulation test mode is the best option to experience the real
                  IELTS on the computer.
                </p>
                <h4 className="text-lg font-medium mb-2">Test information</h4>
                <p className="text-gray-500 mb-4">
                  Full parts (60 minutes - {parts.length} parts -{" "}
                  {parts.length * 13} questions)
                </p>
                <button
                  onClick={handleStartTest}
                  className="mt-6 w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700"
                >
                  Start Now
                  <span>
                    <FontAwesomeIcon icon={faBolt} className="ml-2 " />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TestSetting;
