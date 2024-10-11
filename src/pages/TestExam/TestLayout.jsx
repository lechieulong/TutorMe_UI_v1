// TestLayout.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mockTestData from "../../data/mockTestData";
import Header from "../../components/Test/Header";
import TestView from "./TestView";

const TestLayout = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [testData, setTestData] = useState([]);
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
    }
  }, [testId]);

  const handleSubmit = () => {
    console.log("Submit test");
    alert("Test submitted!");
  };

  // Move handleNextSkill here
  const handleNextSkill = () => {
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < testData.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  };

  if (loading) {
    return <div>Loading test data...</div>;
  }

  return (
    <div className="flex flex-col">
      <Header
        testData={testData}
        currentSkillIndex={currentSkillIndex}
        handleNextSkill={handleNextSkill} // Pass handleNextSkill to Header
        handleSubmit={handleSubmit}
      />

      <TestView skillData={testData[currentSkillIndex]} />
    </div>
  );
};

export default TestLayout;
