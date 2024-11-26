import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Test/Header";
import TestView from "./TestView";
import {
  getSkill,
  getTesting,
  submitAnswerTest,
} from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";
import TestExplain from "./TestExplain";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Modal from "react-modal";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const TestLayout = ({ skillsData, practiceTestData, fullTestId }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [testData, setTestData] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [skillResultIds, setSkillResultIds] = useState([]);
  const [timeTakenData, setTimeTakenData] = useState({
    timeMinutesTaken: 0,
    timeSecondsTaken: 0,
  });

  const startTimeRef = useRef(null); // Ref to store the start time
  const elapsedTimeRef = useRef(0); // Ref to store elapsed time in seconds
  const timerRef = useRef(null); // Ref to store the interval ID

  const dispatch = useDispatch();

  // Function to handle scoring
  const handleScoring = async (userAnswers) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      This is a question: ${userAnswers.questionName}
      User Answer: ${userAnswers.answers[0].answerText}

      Evaluate the following response based on IELTS Writing Task 2 criteria:
      - Task Achievement (Score: 0-9)
      - Coherence and Cohesion (Score: 0-9)
      - Lexical Resource (Score: 0-9)
      - Grammatical Range and Accuracy (Score: 0-9)
    `;

      // Retry mechanism
      const retryFetchAIResponse = async (retries = 3, delay = 2000) => {
        let aiResponse = null;
        let attempt = 0;

        while (attempt < retries) {
          attempt++;
          try {
            console.log(`Attempt ${attempt} to fetch AI response...`);
            const result = await model.generateContent(prompt);
            aiResponse =
              result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiResponse) {
              console.log("AI Response received successfully.");
              break; // Exit loop if valid response is received
            }
          } catch (error) {
            console.error(`Attempt ${attempt} failed. Error:`, error);
          }

          // Wait for a specified delay before the next attempt
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        if (!aiResponse) {
          throw new Error(
            "Failed to fetch AI response after multiple attempts."
          );
        }

        return aiResponse;
      };

      const aiResponse = await retryFetchAIResponse();

      // Parse AI Response to get scores
      const parsedScores = aiResponse.split("\n").reduce((acc, line) => {
        const trimmedLine = line.trim();
        const scoreMatch = trimmedLine.match(/\(Score: (\d)/); // Matches a single digit score (0-9)
        if (scoreMatch) {
          const score = parseInt(scoreMatch[1], 10);
          if (trimmedLine.includes("Task Achievement")) {
            acc.task = score;
          } else if (trimmedLine.includes("Coherence and Cohesion")) {
            acc.coherence = score;
          } else if (trimmedLine.includes("Lexical Resource")) {
            acc.lexical = score;
          } else if (trimmedLine.includes("Grammatical Range")) {
            acc.grammar = score;
          }
        }
        return acc;
      }, {});

      // Validate that all scores are present
      const isValidScore = (score) => score !== null && !isNaN(score);

      // Retry if any score is missing or invalid
      let retries = 0;
      while (
        !isValidScore(parsedScores.task) ||
        !isValidScore(parsedScores.coherence) ||
        !isValidScore(parsedScores.lexical) ||
        !isValidScore(parsedScores.grammar)
      ) {
        retries++;
        if (retries > 3) {
          throw new Error(
            "Failed to get valid scores after multiple attempts."
          );
        }

        console.log("Invalid score detected. Retrying...");
        // Retry the request to the AI model
        const aiResponse = await retryFetchAIResponse();
        return await handleScoring(userAnswers); // Recursively retry
      }

      return parsedScores;
    } catch (error) {
      console.error("Error evaluating scoring:", error);
      return {
        task: null,
        coherence: null,
        lexical: null,
        grammar: null,
      };
    }
  };

  // Function to check if the answer is too short or not related
  const isAnswerTooShort = (answerText) => {
    const minLength = 20; // Define the minimum length for an acceptable answer
    const isEmptyAnswer = answerText.trim().length < minLength;
    const isIrrelevant = answerText.toLowerCase().includes("not related"); // Example check, can be customized
    return isEmptyAnswer || isIrrelevant;
  };

  // Function to handle feedback/explanation
  const explain = async (userAnswers) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      This is a question: ${userAnswers.questionName}
      User Answer: ${userAnswers.answers[0].answerText}

      Evaluate the following response based on IELTS Writing Task 2 criteria:
      - Task Achievement (Score: 0-9)
      - Coherence and Cohesion (Score: 0-9)
      - Lexical Resource (Score: 0-9)
      - Grammatical Range and Accuracy (Score: 0-9)
      - Highlight any grammar or syntax issues in the text, and suggest corrections.
    `;

      // Retry mechanism
      const retryFetchAIResponse = async (retries = 3, delay = 2000) => {
        let aiResponse = null;
        for (let attempt = 1; attempt <= retries; attempt++) {
          try {
            console.log(`Attempt ${attempt} to fetch AI response...`);
            const result = await model.generateContent(prompt);
            aiResponse = aiResponse =
              result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiResponse) {
              console.log("AI Response received successfully.");
              break; // Exit loop if valid response is received
            }
          } catch (error) {
            console.error(`Attempt ${attempt} failed. Error:`, error);
          }
          // Wait for a specified delay before the next attempt
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        if (!aiResponse) {
          throw new Error(
            "Failed to fetch AI response after multiple attempts."
          );
        }
        return aiResponse;
      };

      const aiResponse = await retryFetchAIResponse();

      // Extract feedback from AI Response
      const feedback = aiResponse.split("\n").reduce((acc, line) => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.includes(":")) {
          acc += trimmedLine + " ";
        }
        return acc;
      }, "");

      return feedback.trim();
    } catch (error) {
      console.error("Error explaining writing:", error);
      return "An error occurred while explaining the response.";
    }
  };

  // Refactored evaluateAnswer function
  const evaluateAnswer = async (userAnswers) => {
    try {
      const [scores, feedback] = await Promise.all([
        handleScoring(userAnswers),
        explain(userAnswers),
      ]);

      // Calculate overall score
      const totalScores = Object.values(scores).filter(
        (score) => score !== null && !isNaN(score)
      );

      const avgScore =
        totalScores.length > 0
          ? (
              totalScores.reduce((sum, score) => sum + score, 0) /
              totalScores.length
            ).toFixed(1)
          : null;
      return {
        overallScore: avgScore,
        feedBack: feedback,
      };
    } catch (error) {
      console.error("Error evaluating writing:", error);
      return {
        overallScore: null,
        feedBack: "An error occurred while evaluating the response.",
      };
    }
  };

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
    if (testData && !startTimeRef.current) {
      // Initialize start time
      startTimeRef.current = Date.now();

      // Start timer
      timerRef.current = setInterval(() => {
        const elapsedTime = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        elapsedTimeRef.current = elapsedTime;

        // Calculate minutes and seconds
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        // Update state only if there is a change
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

    // Cleanup on unmount or re-render
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null; // Ensure cleanup
      startTimeRef.current = null; // Reset start time for next use
    };
  }, [testData]); // Only depend on testData

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

  const getTotalQuestions = (currentSkillData) => {
    let totalQuestions = 0;
    currentSkillData.parts.forEach((part) => {
      part.sections.forEach((section) => {
        // Count all the questions in the section
        totalQuestions += section.questions.length;
      });
    });
    return totalQuestions;
  };

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
        setSubmitting(true);
        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
            totalQuestions: 0,
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
          setSubmitting(false);

          setUserAnswers([]);
          if (lastSkillKey === currentSkillKey) {
            setSubmitted(true);
          }
        });
        setSubmitting(false);
        handleNextSkill();
        break;
      case 1:
        setSubmitting(true);
        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
            totalQuestions: 0,
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
        setSubmitting(false);
        handleNextSkill();
        break;
      case 2:
        setSubmitting(true);

        (async () => {
          try {
            const updatedAnswers = {};
            const questionIds = Object.keys(userAnswers);

            for (const questionId of questionIds) {
              const userAnswer = userAnswers[questionId];

              const responseWriting = await evaluateAnswer(userAnswer);

              updatedAnswers[questionId] = {
                ...userAnswer,
                explain: responseWriting.feedBack,
                overallScore: responseWriting.overallScore,
              };
            }
            const totalQuestions = getTotalQuestions(currentSkillData);
            const result = await dispatch(
              submitAnswerTest({
                userAnswers: updatedAnswers,
                testId,
                timeMinutesTaken: timeTakenData.timeMinutesTaken,
                timeSecondsTaken: timeTakenData.timeSecondsTaken,
                totalQuestions,
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

            setSubmitting(false);
            handleNextSkill();

            setUserAnswers([]); // Clear user answers after submission
            setUserAnswers([]); // Clear user answers after submission
            if (lastSkillKey === currentSkillKey) {
              setSubmitted(true);
            }
          } catch (error) {
            console.error("Error handling writing test submission:", error);
            setSubmitting(false);
            setSubmitting(false);
          }
        })();
        break;

      case 3:
        setSubmitting(true);

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

        setSubmitting(false);
        handleNextSkill();

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
                submitting={submitting}
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
      {submitting && (
        <>
          <Modal
            isOpen={submitting}
            className="bg-warmNeutral rounded-lg shadow-lg p-6 max-w-md mx-auto text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h3>Submitting........</h3>
          </Modal>
        </>
      )}
    </>
  );
};

export default TestLayout;
