// TestLayout.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

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

  const startTimeRef = useRef(null); // Ref to store the start time
  const elapsedTimeRef = useRef(0); // Ref to store elapsed time in seconds
  const timerRef = useRef(null); // Ref to store the interval ID

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const evaluateAnswer = async (userAnswers) => {
    try {
      console.log("Evaluating user answers...");
      console.log(`${Object.values(userAnswers)[0].questionName}`);
      console.log(`${Object.values(userAnswers)[0].answers[0].answerText}`);
      console.log(`${Object.values(userAnswers)[0].part}`);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      This is a question: ${Object.values(userAnswers)[0].questionName}
      User Answer: ${Object.values(userAnswers)[0].answers[0].answerText}

      Evaluate the following response based on IELTS Writing Task 2 
      criteria:
      - Task Achievement (Score: 0-9)
      - Coherence and Cohesion (Score: 0-9)
      - Lexical Resource (Score: 0-9)
      - Grammatical Range and Accuracy (Score: 0-9)
      - Highlight any grammar or syntax issues in the text, and suggest corrections.
      - Provide an overall score as the average of the four criteria.
    `;

      // Retry mechanism
      const retryFetchAIResponse = async (retries = 3, delay = 2000) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
          try {
            console.log(`Attempt ${attempt} to fetch AI response...`);
            const result = await model.generateContent(prompt);
            const aiResponse =
              result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiResponse) {
              console.log("AI Response received successfully.");
              return aiResponse;
            }
          } catch (error) {
            console.error(`Attempt ${attempt} failed. Error:`, error);
          }
          // Wait for a specified delay before the next attempt
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        throw new Error("Failed to fetch AI response after multiple attempts.");
      };

      const aiResponse = await retryFetchAIResponse();

      // Parse AI Response
      const parsedResponse = aiResponse.split("\n").reduce(
        (acc, line) => {
          const trimmedLine = line.trim();
          if (trimmedLine.includes("Task Achievement")) {
            acc.scores.task =
              parseFloat(trimmedLine.split(":")[1]?.trim()) || null;
          } else if (trimmedLine.includes("Coherence and Cohesion")) {
            acc.scores.coherence =
              parseFloat(trimmedLine.split(":")[1]?.trim()) || null;
          } else if (trimmedLine.includes("Lexical Resource")) {
            acc.scores.lexical =
              parseFloat(trimmedLine.split(":")[1]?.trim()) || null;
          } else if (trimmedLine.includes("Grammatical Range")) {
            acc.scores.grammar =
              parseFloat(trimmedLine.split(":")[1]?.trim()) || null;
          } else if (trimmedLine && !trimmedLine.includes(":")) {
            acc.feedback += trimmedLine + " ";
          }
          return acc;
        },
        {
          feedback: "",
          scores: { task: null, coherence: null, lexical: null, grammar: null },
        }
      );

      // Calculate overall score
      const totalScores = Object.values(parsedResponse.scores).filter(
        (score) => score !== null
      );

      const avgScore =
        totalScores.length > 0
          ? (
              totalScores.reduce((sum, score) => sum + score, 0) /
              totalScores.length
            ).toFixed(1)
          : null;

      console.log("Parsed Response:", avgScore);

      return {
        overallScore: avgScore,
        feedBack: parsedResponse.feedback.trim(),
      };
    } catch (error) {
      console.error("Error evaluating writing:", error);
      return {
        overallScore: null,
        feedBack: "An error occurred while evaluating the response.",
      };
    }
  };

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

  useEffect(() => {
    if (testData && currentSkillIndex === 0 && !startTimeRef.current) {
      startTimeRef.current = Date.now(); // Set start time when the test begins

      timerRef.current = setInterval(() => {
        const elapsedTime = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        elapsedTimeRef.current = elapsedTime;

        // Update timeTakenData state only if necessary
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        setTimeTakenData((prev) => {
          if (
            prev.timeMinutesTaken !== minutes ||
            prev.timeSecondsTaken !== seconds
          ) {
            return { timeMinutesTaken: minutes, timeSecondsTaken: seconds };
          }
          return prev;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [testData, currentSkillIndex]);

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
    clearInterval(timerRef.current); // Clear the timer
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
        (async () => {
          try {
            const responseWriting = await evaluateAnswer(userAnswers);
            console.log("ResponseWriting", responseWriting);

            const questionId = Object.keys(userAnswers)[0];
            const updateAnswers = {
              ...userAnswers,
              [questionId]: {
                ...userAnswers[questionId],
                explain: responseWriting.feedBack,
                overallScore: responseWriting.overallScore,
              },
            };

            // console.log("Updated Answers:", updateAnswers);

            const result = await dispatch(
              submitAnswerTest({
                userAnswers: updateAnswers,
                testId,
                timeMinutesTaken: timeTakenData.timeMinutesTaken,
                timeSecondsTaken: timeTakenData.timeSecondsTaken,
              })
            );

            if (result.meta.requestStatus === "fulfilled") {
              setSkillResultIds((prev) => [...prev, result.payload.id]);
            } else {
              console.error(
                "Error submitting writing test:",
                result.error.message
              );
            }
            setUserAnswers([]);
            if (lastSkillKey === currentSkillKey) {
              setSubmitted(true);
            }
          } catch (error) {
            console.error("Error handling writing test submission:", error);
          }
        })();
        break;
      case 3:
        const updateUserAnswers = dispatch(
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
        setUserAnswers([]);

        break;
      default:
        console.log("Unknown skill type");
    }
  };

  return (
    <>
      {submitted ? (
        <TestExplain
          skillResultIds={skillResultIds}
          testId={testId}
          skillId={practiceTestData?.skillId}
        />
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
