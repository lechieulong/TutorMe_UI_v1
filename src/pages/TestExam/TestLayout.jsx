// TestLayout.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mockTestData from "../../data/mockTestData";
import Header from "../../components/Test/Header";
import TestView from "./TestView";

const TestLayout = ({ skillsData }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0); // Track the current skill index
  const [testData, setTestData] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);

  const { testId } = useParams();
  console.log(skillsData);

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
  console.log("testData", testData);

  const handleSubmit = () => {
    console.log("Submit test");
    alert("Test submitted!");
  };

  // Handle next skill navigation
  const handleNextSkill = () => {
    const skillKeys = Object.keys(testData); // Get the skill names from the object
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < skillKeys.length) {
        return nextIndex; // Increment index if within bounds
      }
      return prevIndex; // Stay on the last skill if at the end
    });
  };

  if (loading) {
    return <div>Loading test data...</div>;
  }

  // Retrieve current skill based on index
  const currentSkillKey = Object.keys(testData)[currentSkillIndex];
  const currentSkillData = testData[currentSkillKey];

  return (
    <div className="flex flex-col">
      <Header
        testData={testData}
        currentSkillIndex={currentSkillIndex} // Pass current skill index
        handleNextSkill={handleNextSkill} // Pass handleNextSkill to Header
        handleSubmit={handleSubmit}
      />
      <TestView skillData={currentSkillData} />
    </div>
  );
};

export default TestLayout;
