// TestLayout.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Test/Header";
import TestView from "./TestView";
import mockTestData from "../../data/mockTestData";
import {
  getSkill,
  getTesting,
  submitAnswerTest,
} from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const TestLayout = ({ practiceTestData, skillsData }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [testData, setTestData] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { duration, selectedParts, isPractice, skillId, testId } =
    practiceTestData;

  // const { testId, skillId } = useParams();
  const finalTest = true;

  // const fetchTestData = async () => {
  //   try {
  //     setLoading(true);
  //     const fetchedTestData = await new Promise((resolve) => {
  //       setTimeout(() => resolve(mockTestData), 1000);
  //     });
  //     setTestData(fetchedTestData);
  //   } catch (error) {
  //     console.error("Error fetching test data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchTestData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getTesting(testId));
      setTestData(result.payload);
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
        const skillKey = Object.keys(skillData)[0];
        const skillDetails = skillData[skillKey];

        skillDetails.duration = duration || skillDetails.duration;
        skillDetails.parts = skillDetails.parts.filter((part) =>
          selectedParts.includes(part.partNumber)
        );

        setTestData(skillData);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (finalTest) {
      fetchTestData(testId);
    } else if (isPractice) {
      fetchSkillData();
    } else {
      setTestData(skillsData);
      setLoading(false);
    }
  }, []);

  const handleAnswerChange = useCallback(({ questionId, answerData }) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerData === undefined ? undefined : answerData,
    }));
  }, []);

  const handleSubmit = () => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      console.log("No answers to submit");
      return;
    }
    if (skillId) {
      Object.values(userAnswers).forEach((entry) => {
        entry.skillId = skillId;
      });
    }
    const keys = Object.keys(testData);
    const lastSkillKey = keys[keys.length - 1];
    const firstAnswer = Object.values(userAnswers)[0];
    const { skill } = firstAnswer;

    switch (skill) {
      case 0:
        const result = dispatch(submitAnswerTest({ userAnswers, testId }));
        setUserAnswers([]);
        if (lastSkillKey) {
          console.log("last ne");

          navigate(`/testExplain/${testId}`);
        }
      case 1:
        console.log("Calling Listening API");
        setUserAnswers([]);
        break;
      case 2:
        console.log("Calling Writing API");
        setUserAnswers([]);

        break;
      case 3:
        console.log("Calling Speaking API");
        setUserAnswers([]);

        break;
      default:
        console.log("Unknown skill type");
    }
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
            userAnswers={userAnswers}
          />
        </div>
      </form>
    </div>
  );
};

export default TestLayout;
