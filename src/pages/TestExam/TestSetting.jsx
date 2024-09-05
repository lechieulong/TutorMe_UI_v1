import React, { useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import MainLayout from "../../layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const TestSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const skillPart = location.state;

  const [timeLimit, setTimeLimit] = useState("60 mins");
  const [selectedParts, setSelectedParts] = useState({
    fullParts: true,
    part1: true,
    part2: true,
    part3: true,
  });

  const handlePartSelection = (part) => {
    setSelectedParts((prev) => {
      const updatedParts = { ...prev };

      if (part === "fullParts") {
        const allPartsSelected = !updatedParts.fullParts;
        updatedParts.fullParts = allPartsSelected;

        updatedParts.part1 = allPartsSelected;
        updatedParts.part2 = allPartsSelected;
        updatedParts.part3 = allPartsSelected;
      } else {
        updatedParts[part] = !prev[part]; 
        if (!updatedParts[part]) {
          updatedParts.fullParts = false; 

        } else {
          const allPartsSelected = Object.keys(updatedParts)
            .filter((key) => key !== "fullParts")
            .every((key) => updatedParts[key]);
          updatedParts.fullParts = allPartsSelected;
        }
      }

      return updatedParts;
    });
  };

  const handleStartTest = () => {
    const parts = Object.keys(selectedParts).filter(
      (part) => selectedParts[part] && part !== "fullParts"
    );
    const duration = timeLimit;
    const testData = {
      duration,
      selectedParts: parts.length ? parts : ["fullParts"],
      skillPart,
    };

    navigate("/test-setting/test-exam", { state: testData });
  };

  return (
    <MainLayout>
      <Breadcrumbs />
      <div className="flex justify-center items-center bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">
            Choose a mode
          </h2>
          <div className="flex flex-col md:flex-row justify-between">
            {/* Practice mode */}
            <div className="bg-gray-50 p-4 rounded-lg flex-1 md:mr-4 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Practice mode</h3>
              <p className="text-gray-500 mb-4">
                Practice mode is suitable for improving accuracy and time spent
                on each part.
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
                      Full parts (3 parts - 40 questions)
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedParts.part1}
                      onChange={() => handlePartSelection("part1")}
                      className="form-checkbox text-green-600"
                    />
                    <span className="ml-2">Part 1 (13 questions)</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedParts.part2}
                      onChange={() => handlePartSelection("part2")}
                      className="form-checkbox text-green-600"
                    />
                    <span className="ml-2">Part 2 (13 questions)</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedParts.part3}
                      onChange={() => handlePartSelection("part3")}
                      className="form-checkbox text-green-600"
                    />
                    <span className="ml-2">Part 3 (14 questions)</span>
                  </label>
                </div>
              </div>
              <h4 className="text-lg font-medium mb-2">
                2. Choose a time limit:
              </h4>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="form-select w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="60 mins">60 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="30 mins">30 mins</option>
              </select>
              <button
                onClick={() => handleStartTest()}
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
                Full parts (60 minutes - 3 parts - 40 questions)
              </p>
              <button
                onClick={() => handleStartTest()}
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
    </MainLayout>
  );
};

export default TestSetting;
