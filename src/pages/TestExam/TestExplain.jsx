import { useState, useEffect, useCallback } from "react";
import HeaderExplain from "../../components/Test/HeaderExplain";
import TestViewExplain from "./TestViewExplain";

import {
  getSkill,
  getResultTest,
  getExplainTest,
} from "../../redux/testExam/TestSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faBookOpen,
  faPen,
  faClock,
  faCheck,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

const TestExplain = ({ totalPartsSubmit, skillResultIds, testId, skillId }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Track the current skill index
  const [testData, setTestData] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const skillTypeMap = {
    0: { name: "Reading", icon: faBookOpen },
    1: { name: "Listening", icon: faHeadphones },
    2: { name: "Writing", icon: faPen },
    3: { name: "Speaking", icon: faMicrophone },
  };

  const customRound = (value) => {
    const integralPart = Math.floor(value); // Get the integer part
    const decimalPart = value - integralPart;

    if (decimalPart < 0.25) {
      return integralPart;
    } else if (decimalPart >= 0.25 && decimalPart < 0.5) {
      return integralPart + 0.5;
    } else if (decimalPart >= 0.5 && decimalPart < 0.75) {
      return integralPart + 0.5;
    } else if (decimalPart >= 0.75) {
      return integralPart + 1;
    }

    return value;
  };
  const handlePreviousSkill = useCallback(() => {
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex >= 0) {
        return nextIndex;
      }
      return prevIndex;
    });
  }, []);

  const getTestResult = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getResultTest(skillResultIds));
      setTestResult(result.payload);

      const totalScore = result.payload.reduce(
        (sum, testResult) => sum + testResult.score,
        0
      );
      const averageScore = totalScore / result.payload.length;
      const overallScore = averageScore;
      setOverallScore(overallScore);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTestExplain = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getExplainTest({
          testId,
          userId: user.id,
          skillId: skillId || null, // Ensure null is passed if skillId is undefined
          totalPartsSubmit,
        })
      );

      if (result.payload) {
        const skillData = result.payload;
        setTestData(skillData);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestResult();
    getTestExplain();
  }, []);

  const handleNextSkill = useCallback(() => {
    const skillKeys = Object.keys(testData);
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < skillKeys.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  }, [testData]);

  if (loading) {
    return <div>Loading test data...</div>;
  }
  const getIeltsLevel = (score) => {
    if (score >= 8.5) return "C2";
    if (score >= 7.0) return "C1";
    if (score >= 6.0) return "B2";
    if (score >= 5.0) return "B1";
    if (score >= 4.0) return "A2";
    return "A1"; // For scores below 4.0
  };

  const currentSkillKey = Object.keys(testData)[currentSkillIndex];
  const currentSkillData = testData[currentSkillKey];

  const formattedDate =
    testResult.length > 0 && testResult[0].testDate
      ? new Date(testResult[0].testDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  return (
    <MainLayout>
      <div className="p-4">
        <h3 className="text-2xl mb-5">Test Report Form </h3>
        <p>
          NOTE:{" "}
          <span className="italic opacity-80">
            Your performance is assessed across four key skills, each
            contributing equally to your overall band score. Below is a
            breakdown of your results:
          </span>
        </p>
        <div className="flex justify-between p-4">
          <div className="flex justify-center items-center gap-6 w-5/12">
            <p>Candidate ID: </p>
            <p className=" border-t border-b font-bold border-gray-400 p-2 flex-1 text-center">
              {user.id}
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 w-3/12">
            <p>Candidate Name: </p>
            <p className=" border-t font-bold border-b border-gray-400 p-2 flex-1 text-center">
              {user.name}
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 w-3/12">
            <p>Test Date</p>
            <p className=" border-t border-b font-bold border-gray-400 p-2 flex-1 text-center">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between ">
            <h3 className="mb-5 font-bold text-2xl">TEST RESULT</h3>
            <h3 className="mb-5 font-bold text-2xl">
              Overall score: {overallScore}
            </h3>
          </div>

          {testResult.length > 0 &&
            testResult.map((test) => (
              <div
                className="flex justify-between border  p-4 rounded"
                key={test.id}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-green-800">
                      <FontAwesomeIcon
                        icon={skillTypeMap[test.skillType]?.icon}
                      />
                    </span>
                    <p>Skill name: </p>

                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {skillTypeMap[test.skillType]?.name}
                    </h3>
                  </div>
                  {(test.skillType == 0 || test.skillType == 1) && (
                    <p>
                      <span className="text-2xl text-green-800 mr-3">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Total correct answer:{" "}
                      <span className="font-bold">{test.numberOfCorrect}</span>{" "}
                      /<span className="font-bold">{test.totalQuestion}</span>{" "}
                    </p>
                  )}

                  <p>
                    <span className="text-2xl mr-4 text-green-800">
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    Time to taken: {test.timeMinutesTaken} minutes{" "}
                    {test.secondMinutesTaken} seconds
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex justify-center  items-center gap-2">
                    <p>CERT level</p>
                    <p className="p-4 bg-green-600 text-customText font-semibold text-2xl">
                      {getIeltsLevel(test.score)}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <p>Band Score </p>
                    <p className="p-4 bg-green-600 text-customText font-semibold text-2xl">
                      {test.score}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {currentSkillKey != "speaking" && (
        <div>
          {testData != undefined && (
            <div className="flex flex-col">
              <HeaderExplain
                testData={testData}
                currentSkillIndex={currentSkillIndex}
                handleNextSkill={handleNextSkill}
                handlePreviousSkill={handlePreviousSkill}
              />
              <TestViewExplain
                skillData={currentSkillData}
                currentSkillKey={currentSkillKey}
              />
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default TestExplain;
