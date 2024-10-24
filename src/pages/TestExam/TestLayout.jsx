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
  console.log("🚀 ~ TestLayout ~ userAnswers:", userAnswers);
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

  const handleAnswerChange = ({ index, answerData }) => {
    setUserAnswers((prevAnswers) => {
      // Tìm xem đã có câu trả lời cho index này hay chưa
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans && ans.index === index
      );

      if (existingAnswerIndex !== -1) {
        // Nếu đã có, cập nhật câu trả lời
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { index, answerData };
        return updatedAnswers;
      } else {
        // Nếu chưa có, thêm câu trả lời mới
        return [...prevAnswers, { index, answerData }];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    console.log("userAnswers", userAnswers);
  };

  const handleNextSkill = () => {
    const skillKeys = Object.keys(testData);
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < skillKeys.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  };

  if (loading) {
    return <div>Loading test data...</div>;
  }

  // Retrieve current skill based on index
  const currentSkillKey = Object.keys(testData)[currentSkillIndex];
  const currentSkillData = testData[currentSkillKey];

  return (
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
  );
};

export default TestLayout;
