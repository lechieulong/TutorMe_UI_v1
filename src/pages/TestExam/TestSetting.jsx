import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  getParts,
  getSkillById,
  getTest,
} from "../../redux/testExam/TestSlice";
import TestLayout from "./TestLayout";
import SantaClausImage from "../../assets/santa-claus.jpg"; // Include a Santa image asset
// import Tree from "../../assets/treef.jpg"; // Include a Santa image asset

const TestSetting = () => {
  const dispatch = useDispatch();
  const { skillId, testId } = useParams();

  const [parts, setParts] = useState(null);
  const [testTypeForSpeak, setTestTypeForSpeak] = useState(null);

  const [practiceTestData, setPracticeTestData] = useState({});
  const [timeLimit, setTimeLimit] = useState(60);
  const [selectedParts, setSelectedParts] = useState([]);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const [selectedVoice, setSelectedVoice] = useState("");
  const [part1And3Time, setPart1And3Time] = useState(15);
  const [part2Time, setPart2Time] = useState(180);
  const [skillType, setSkillType] = useState(0);
  const voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.startsWith("en"));

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handlePart1And3TimeChange = (e) => {
    setPart1And3Time(Number(e.target.value));
  };

  const handlePart2TimeChange = (e) => {
    setPart2Time(Number(e.target.value));
  };

  const fetchSkillPartsInfo = async () => {
    const result = await dispatch(getParts(skillId));
    if (result.payload) {
      setParts(result.payload);
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

  const getTestAsync = async (testId) => {
    const result = await dispatch(getTest(testId));
    setTestTypeForSpeak(result.payload.testType);
  };

  useEffect(() => {
    fetchSkillPartsInfo();
    getSkillByIdNE(skillId);
    getTestAsync(testId);
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
    setTimeLimit(Number(event.target.value));
  };

  if (!parts) {
    return <div>Loading...</div>;
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
          <div className="flex mt-20 justify-center items-center  p-10">
            <div className="bg-white border shadow-2xl rounded-lg p-6 w-full max-w-4xl relative">
              <img
                src={SantaClausImage} // Replace with the path to your Santa image
                alt="Santa"
                className="absolute top-0 right-0 w-24 h-auto"
              />
              {/* <img
                src={Tree} // Replace with your Christmas tree image
                alt="Christmas Tree"
                className="absolute bottom-0 right-80 w-32 h-auto"
              /> */}
              <div className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h2 className="text-3xl font-semibold text-center text-red-600 mb-4">
                Christmas Test Mode Selection 🎄
              </h2>
              <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-4">
                {/* Practice mode */}
                <div className="bg-gray-50 p-4 rounded-lg flex-1 md:mr-4 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Practice mode 🎅
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Practice mode helps you improve accuracy and time
                    management.
                  </p>
                  <h4 className="text-lg font-medium mb-2">
                    Choose parts to practice:
                  </h4>
                  <div className="space-y-2 mb-4">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={isFullPartsChecked}
                          onChange={() => handlePartSelection("fullParts")}
                          className="form-checkbox text-red-600"
                        />
                        <span className="ml-2">Full parts</span>
                      </label>
                    </div>
                    {parts.map((part) => (
                      <div key={part.id}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedParts.includes(part.partNumber)}
                            onChange={() =>
                              handlePartSelection(part.partNumber)
                            }
                            className="form-checkbox text-red-600"
                          />
                          <span className="ml-2">Part {part.partNumber}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    Choose time limit:
                  </h4>
                  {testTypeForSpeak == 3 && skillType == 3 ? (
                    <p className="text-red-800">You have 5 minutes to try</p>
                  ) : (
                    <select
                      value={timeLimit}
                      onChange={handleTimeLimitChange}
                      className="form-select w-full p-2 border border-gray-300 rounded-md mb-4"
                    >
                      <option value={60}>60 mins</option>
                      <option value={45}>45 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={15}>15 mins</option>
                    </select>
                  )}

                  <button
                    onClick={handleStartTest}
                    disabled={selectedParts.length === 0}
                    className={`mt-6 w-full text-white font-medium py-2 rounded-lg ${
                      selectedParts.length === 0
                        ? "bg-gray-400"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Start Test
                    <FontAwesomeIcon icon={faBolt} className="ml-2" />
                  </button>
                </div>

                {/* Simulation test mode */}
                <div className="bg-gray-50 p-4 rounded-lg flex-1 md:ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Simulation Test Mode 🎄
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Simulation mode mimics the actual IELTS test.
                  </p>

                  {skillType === 3 && (
                    <div className="test-setting-container">
                      <h4 className="text-lg font-medium mb-2">
                        Choose custom voice:
                      </h4>
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

                      <h4 className="text-lg font-medium mb-2">
                        Time for Part 1 & 3:
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

                      <h4 className="text-lg font-medium mb-2">
                        Time for Part 2:
                      </h4>
                      <select
                        onChange={handlePart2TimeChange}
                        value={part2Time}
                        className="form-select w-full p-2 border border-gray-300 rounded-md mb-4"
                      >
                        {[60, 120, 180, 240].map((time) => (
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
