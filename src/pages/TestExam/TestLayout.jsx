// TestLayout.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import mockTestData from "../../data/mockTestData";
import Header from "../../components/Test/Header";
import TestView from "./TestView";
const TestLayout = ({ skillsData }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Track the current skill index
  const [testData, setTestData] = useState({}); // Initialize as an empty object
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { testId } = useParams();

  const fetchTestData = async () => {
    try {
      setLoading(true);
      const fetchedTestData = await new Promise((resolve) => {
        setTimeout(() => resolve(mockTestData), 1000); // Simulate network delay
      });

      setTestData(fetchedTestData);
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchTestData();
    } else {
      setTestData(skillsData);
      setLoading(false);
    }
  }, [testId]);

  const handleAnswerChange = useCallback(({ questionId, answerData }) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerData,
    }));
  }, []);

  const handleSubmit = () => {
    console.log("haha");

    console.log("userAnswers", userAnswers);
  };

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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Header
            testData={testData}
            currentSkillIndex={currentSkillIndex}
            handleNextSkill={handleNextSkill}
            handleSubmit={handleSubmit}
          />
          <TestView
            skillData={currentSkillData}
            currentSkillKey={currentSkillKey}
            handleAnswerChange={handleAnswerChange}
          />
        </div>
      </form>
    </div>
  );
};

export default TestLayout;
