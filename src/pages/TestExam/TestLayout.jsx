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
import TestExplain from "./TestExplain";

const TestLayout = ({ skillsData, practiceTestData, fullTestId }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [testData, setTestData] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [skillResultIds, setSkillResultIds] = useState([]);
  const [timeTakenData, setTimeTakenData] = useState({
    timeMinutesTaken: 0,
    timeSecondsTaken: 0,
  });
  const [startTime, setStartTime] = useState(null); // Track start time
  const [timerInterval, setTimerInterval] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { testId, skillId } = useParams();

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
      const result = await dispatch(getTesting(fullTestId));
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
      const result = await dispatch(getSkill(practiceTestData.skillId));

      if (result.payload) {
        const skillData = result.payload;
        const skillKey = Object.keys(skillData)[0];
        const skillDetails = skillData[skillKey];

        skillDetails.duration =
          practiceTestData.duration || skillDetails.duration;
        skillDetails.parts = skillDetails.parts.filter((part) =>
          practiceTestData.selectedParts.includes(part.partNumber)
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
    if (fullTestId) {
      fetchTestData();
    } else if (practiceTestData) {
      fetchSkillData();
    } else {
      setTestData(skillsData);
      setLoading(false);
    }
  }, []);

  // Set start time only once
  useEffect(() => {
    if (testData && currentSkillIndex === 0 && startTime === null) {
      setStartTime(Date.now()); // Set start time when the test begins
    }
  }, [testData, currentSkillIndex, startTime]);

  // Timer logic: Update timeTakenData every second
  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Time elapsed in seconds
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        setTimeTakenData({
          timeMinutesTaken: minutes,
          timeSecondsTaken: seconds,
        });
      }, 1000);

      setTimerInterval(interval); // Save the interval ID for clearing it later

      // Cleanup the interval on component unmount or when the timer is no longer needed
      return () => {
        clearInterval(interval);
      };
    }
  }, [startTime]);

  const handleAnswerChange = useCallback(({ questionId, answerData }) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerData === undefined ? undefined : answerData,
    }));
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

  const testId = fullTestId ? fullTestId : practiceTestData.testId;
  const currentSkillKey = Object.keys(testData)[currentSkillIndex];
  const currentSkillId = testData[currentSkillKey]?.id;
  const currentSkillData = testData[currentSkillKey];
  const handleSubmit = () => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      console.log("No answers to submit");
      return;
    }

    const keys = Object.keys(testData);
    const lastSkillKey = keys[keys.length - 1];
    const firstAnswer = Object.values(userAnswers)[0];
    const { skill } = firstAnswer;

    switch (skill) {
      case 0:
        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setSkillResultIds((prev) => [...prev, result.payload.id]);
          } else {
            console.error(
              "Error submitting reading test:",
              result.error.message
            );
          }
          setUserAnswers([]);
          if (lastSkillKey === currentSkillKey) {
            setSubmitted(true);
          }
        });
        break;
      case 1:
        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setSkillResultIds((prev) => [...prev, result.payload.id]);
          } else {
            console.error(
              "Error submitting reading test:",
              result.error.message
            );
          }
          setUserAnswers([]);
          if (lastSkillKey === currentSkillKey) {
            setSubmitted(true);
          }
        });
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
    if (timerInterval) clearInterval(timerInterval);
  };

  console.log(skillResultIds);

  return (
    <>
      {submitted ? (
        <TestExplain skillResultIds={skillResultIds} testId={testId} />
      ) : (
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
                currentSkillId={currentSkillId}
                handleAnswerChange={handleAnswerChange}
                userAnswers={userAnswers}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TestLayout;
