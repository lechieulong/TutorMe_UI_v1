import { useState, useEffect, useCallback } from "react";
import HeaderExplain from "../../components/Test/HeaderExplain";
import TestViewExplain from "./TestViewExplain";
import mockTestData from "../../data/mockTestExplain";
import { getSkill } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const TestExplain = ({ skillId, testId }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Track the current skill index
  const [testData, setTestData] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const testIdDemo = "1";
  const fetchTestData = async () => {
    try {
      setLoading(true);
      const fetchedTestData = await new Promise((resolve) => {
        setTimeout(() => resolve(mockTestData), 1000);
      });
      setTestData(fetchedTestData);
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkillData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getSkill(skillId));

      if (result.payload) {
        const skillData = result.payload;
        const skillKey = Object.keys(skillData)[0]; // Get the main skill key (e.g., "writing")
        const skillDetails = skillData[skillKey];

        skillDetails.duration = duration || skillDetails.duration;
        skillDetails.parts = skillDetails.parts.filter((part) =>
          selectedParts.includes(part.partNumber)
        );

        console.log("skillData", skillData);

        setTestData(skillData);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testIdDemo) {
      fetchTestData();
    } else fetchSkillData();
  }, [testId]);

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

  const currentSkillKey = Object.keys(testData)[currentSkillIndex];
  const currentSkillData = testData[currentSkillKey];

  return (
    <div className="w-screen">
      <div>
        <div className="flex flex-col">
          <HeaderExplain
            testData={testData}
            currentSkillIndex={currentSkillIndex}
            handleNextSkill={handleNextSkill}
          />
          <TestViewExplain
            skillData={currentSkillData}
            currentSkillKey={currentSkillKey}
          />
        </div>
      </div>
    </div>
  );
};

export default TestExplain;
