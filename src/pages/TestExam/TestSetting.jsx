import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getParts, getSkillById } from "../../redux/testExam/TestSlice";
import TestLayout from "./TestLayout";

const TestSetting = () => {
  const dispatch = useDispatch();
  const { skillId, testId } = useParams(); // Get skillId from params

  const [parts, setParts] = useState(null);
  const [practiceTestData, setPracticeTestData] = useState({});
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedParts, setSelectedParts] = useState([]); // Array to keep track of selected parts
  const [isTestStarted, setIsTestStarted] = useState(false);

  const [selectedVoice, setSelectedVoice] = useState("");
  const [part1And3Time, setPart1And3Time] = useState(15); // Default is 15 seconds
  const [part2Time, setPart2Time] = useState(180); // Default is 180 seconds
  const [skillType, setSkillType] = useState(0);
  const voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.startsWith("en"));

  // Hàm xử lý thay đổi voice
  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    console.log("Selected Voice:", e.target.value);
  };

  // Hàm xử lý thay đổi thời gian cho Part 1 & 3
  const handlePart1And3TimeChange = (e) => {
    setPart1And3Time(Number(e.target.value));
    console.log("Selected Time (Part 1 & 3):", e.target.value);
  };

  const handlePart2TimeChange = (e) => {
    setPart2Time(Number(e.target.value));
    console.log("Selected Time (Part 2):", e.target.value);
  };

  // Fetch skill parts info
  const fetchSkillPartsInfo = async () => {
    const result = await dispatch(getParts(skillId));
    if (result.payload) {
      setParts(result.payload);
      // Set selectedParts to include all partNumbers by default
      const allParts = result.payload.map((p) => p.partNumber);
      setSelectedParts(allParts);
    }
  };

  const getSkillByIdNE = async () => {
    const result = await dispatch(getSkillById(skillId));
    if (result.payload) {
      setSkillType(result.payload.type);
    }
  };

  useEffect(() => {
    fetchSkillPartsInfo();
    getSkillByIdNE(skillId);
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
      selectedParts: selectedParts.length ? selectedParts : [],
      skillId,
      isPractice: true,
      testId,
      testType: 1,
    };
    setPracticeTestData(testData);
    setIsTestStarted(true);
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(Number(event.target.value)); // Convert value to number
  };

  if (!parts) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const isFullPartsChecked = selectedParts.length === parts.length;

  return (
    <>
      {isTestStarted ? (
        <TestLayout
          practiceTestData={practiceTestData}
          selectedVoice={selectedVoice}
          part1And3Time={part1And3Time}
          part2Time={part2Time}
        />
      ) : (
        <MainLayout>
          <div className="flex mt-20 justify-center items-center  ">
            <div className="bg-white border shadow-2xl  rounded-lg p-6 w-full max-w-4xl">
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
                            onChange={() =>
                              handlePartSelection(part.partNumber)
                            }
                            className="form-checkbox text-green-600"
                          />
                          <span className="ml-2">Part {part.partNumber}</span>
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
                    disabled={selectedParts.length === 0} // Disable if no parts are selected
                    className={`mt-6 w-full text-white font-medium py-2 rounded-lg ${
                      selectedParts.length === 0
                        ? "bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
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
                    Simulation test mode is the best option to experience the
                    real IELTS on the computer.
                  </p>

                  {skillType == 3 && (
                    <div className="test-setting-container">
                      <h4 className="text-lg font-medium mb-2">
                        1. Choose a custom voice:
                      </h4>
                      <div className="relative max-h-80 overflow-y-auto">
                        <select
                          onChange={handleVoiceChange}
                          value={selectedVoice}
                          className="form-select w-full p-2 border border-gray-300 rounded-md mb-4"
                        >
                          {voices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Time for Part 1 & 3 */}
                      <h4 className="text-lg font-medium mb-2">
                        2. Choose time for Part 1 & 3:
                      </h4>
                      <select
                        onChange={handlePart1And3TimeChange}
                        value={part1And3Time}
                        className="form-select w-full p-2 border border-gray-300 rounded-md mb-4"
                      >
                        {[15, 20, 25, 30, 60, 90].map((time) => (
                          <option key={time} value={time}>
                            {time} seconds
                          </option>
                        ))}
                      </select>

                      {/* Time for Part 2 */}
                      <h4 className="text-lg font-medium mb-2">
                        3. Choose time for Part 2:
                      </h4>
                      <select
                        onChange={handlePart2TimeChange}
                        value={part2Time}
                        className="form-select w-full p-2 border border-gray-300 rounded-md"
                      >
                        {[180, 240, 300, 500].map((time) => (
                          <option key={time} value={time}>
                            {time} seconds
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default TestSetting;
