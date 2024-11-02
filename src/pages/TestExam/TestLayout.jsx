// TestLayout.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Test/Header";
import TestView from "./TestView";
import mockTestData from "../../data/mockTestData";
import { getSkill, getTesting } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const TestLayout = ({ skillsData }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Track the current skill index
  const [testData, setTestData] = useState({}); // Initialize as an empty object
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();
  const { duration, selectedParts } = location.state || {};

  const { testId, skillId } = useParams();

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
    if (testId) {
      fetchTestData();
    } else if (skillId) {
      fetchSkillData();
    } else {
      setTestData(skillsData);
      setLoading(false);
    }
  }, [testId]);

  const handleAnswerChange = useCallback(({ questionId, answerData }) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerData === undefined ? undefined : answerData, // Set to undefined if cleared
    }));
  }, []);

  const handleSubmit = () => {
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
    <div className="">
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
            userAnswers={userAnswers}
          />
        </div>
      </form>
    </div>
  );
};

export default TestLayout;
