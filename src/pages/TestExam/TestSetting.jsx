import React, { useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import MainLayout from "../../layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const TestSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const skillPart = location.state; // skillPart is the ID of the skill
  const skillPartsInfo = [
    { id: 0, name: "Reading", parts: [1, 2, 3] }, // 3 parts
    { id: 1, name: "Listening", parts: [1, 2, 3, 4] }, // 4 parts
    { id: 2, name: "Writing", parts: [1, 2] }, // 2 parts
    { id: 3, name: "Speaking", parts: [1, 2, 3] }, // 3 parts
  ];

  // Find the selected skill information based on the skillPart ID
  const selectedSkill = skillPartsInfo.find((skill) => skill.id === skillPart);

  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedParts, setSelectedParts] = useState(
    selectedSkill.parts.reduce(
      (acc, part) => {
        acc[part] = true; // Initialize selected parts as true
        return acc;
      },
      { fullParts: true }
    )
  );

  const handlePartSelection = (part) => {
    setSelectedParts((prev) => {
      const updatedParts = { ...prev };

      if (part === "fullParts") {
        const allPartsSelected = !updatedParts.fullParts;
        updatedParts.fullParts = allPartsSelected;

        // Toggle all parts
        selectedSkill.parts.forEach((p) => {
          updatedParts[p] = allPartsSelected;
        });
      } else {
        updatedParts[part] = !prev[part];
        if (!updatedParts[part]) {
          updatedParts.fullParts = false; // Uncheck full parts if any part is unchecked
        } else {
          const allPartsSelected = selectedSkill.parts.every(
            (p) => updatedParts[p]
          );
          updatedParts.fullParts = allPartsSelected;
        }
      }

      return updatedParts;
    });
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const handleStartTest = () => {
    // Create an array of selected part numbers
    const parts = Object.keys(selectedParts)
      .filter((part) => selectedParts[part] && part !== "fullParts")
      .map(Number); // Convert string to number here

    const duration = timeLimit;
    const testData = {
      duration,
      selectedParts: parts.length ? parts : selectedSkill.parts, // Use the actual skill parts if none selected
      skillPart,
    };

    // enterFullScreen();
    navigate("/test-setting/test-exam", { state: testData });
  };

  // Function to handle time limit selection
  const handleTimeLimitChange = (event) => {
    setTimeLimit(Number(event.target.value)); // Convert value to number
  };

  return (
    <MainLayout>
      <div className="mt-8">
        <Breadcrumbs />
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
                        checked={selectedParts.fullParts}
                        onChange={() => handlePartSelection("fullParts")}
                        className="form-checkbox text-green-600"
                      />
                      <span className="ml-2">
                        Full parts ({selectedSkill.parts.length} parts -{" "}
                        {selectedSkill.parts.length * 13} questions)
                      </span>
                    </label>
                  </div>
                  {selectedSkill.parts.map((part) => (
                    <div key={part}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedParts[part]}
                          onChange={() => handlePartSelection(part)}
                          className="form-checkbox text-green-600"
                        />
                        <span className="ml-2">Part {part} (13 questions)</span>
                      </label>
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-medium mb-2">
                  2. Choose a time limit:
                </h4>
                <select
                  value={timeLimit}
                  onChange={handleTimeLimitChange} // Updated here
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
                  Full parts (60 minutes - {selectedSkill.parts.length} parts -{" "}
                  {selectedSkill.parts.length * 13} questions)
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
      </div>
    </MainLayout>
  );
};

export default TestSetting;
