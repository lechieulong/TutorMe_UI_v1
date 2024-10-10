import { useState, useEffect } from "react";
import TestView from "./TestView";
import Header from "../../components/Test/Header";
import { useNavigate, useParams } from "react-router-dom";
const testData = [
  { name: "Listening", duration: 1 }, // thời gian theo phút
  { name: "Reading", duration: 1 },
  { name: "Writing", duration: 1 },
  { name: "Speaking", duration: 1 },
];

const TestLayout = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData[0].duration * 30);
  const [testData, setTestData] = useState([]);
  const { testId } = useParams();

  // if (dataPreview) {
  //   setData = dataPreview;
  // } else {
  //   if (location) {
  //     fetchData(testId, partIds);
  //     setData;
  //   } else {
  //     fetchData(testId);
  //   }
  // }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (currentSkillIndex === testData.length - 1) {
            handleSubmit();
            clearInterval(timer);
          } else {
            handleNextSkill();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSkillIndex]);

  const handleNextSkill = () => {
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < testData.length) {
        setTimeLeft(testData[nextIndex].duration * 4);
      }
      return nextIndex;
    });
  };

  const handleSubmit = () => {
    console.log("Submit test");
    alert("Test submitted!");
  };

  return (
    <div>
      <h1>IELTS Exam</h1>
      <h2>Current Skill: {testData[currentSkillIndex].name}</h2>
      <h3>
        Time Left: {Math.floor(timeLeft / 60)}:
        {("0" + (timeLeft % 60)).slice(-2)}
      </h3>

      {currentSkillIndex < testData.length - 1 ? (
        <button onClick={handleNextSkill}>Next Skill</button>
      ) : (
        <button onClick={handleSubmit}>Submit Test</button>
      )}
    </div>
  );
};

export default TestLayout;
