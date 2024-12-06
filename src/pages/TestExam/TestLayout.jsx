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
import { generateSpeakingPrompt } from "../../components/Test/Part/generateSpeakingPrompt";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const TestLayout = ({
  skillsData,
  practiceTestData,
  fullTestId,
  part2Time,
  part1And3Time,
  selectedVoice,
}) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [testData, setTestData] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [noAnswers, setNoAnswers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [totalPartsSubmit, setTotalPartsSubmit] = useState([]);
  const [skillResultIds, setSkillResultIds] = useState([]);
  const [timeTakenData, setTimeTakenData] = useState({
    timeMinutesTaken: 0,
    timeSecondsTaken: 0,
  });

  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);
  const timerRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Ngăn reload ngay lập tức
      event.preventDefault();
      event.returnValue = ""; // Kích hoạt cảnh báo mặc định của trình duyệt

      return ""; // Duy trì hành vi mặc định
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Loại bỏ listener khi component bị unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const evaluateSpeakingAnswer = async (userAnswers) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateSpeakingPrompt(
        userAnswers.questionName,
        userAnswers.answers[0].answerText,
        1
      );

      const result = await model.generateContent(prompt);
      console.log("response AI finish ");

      const aiResponse =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      const overallScoreLine = aiResponse
        .split("\n")
        .find((line) => line.toLowerCase().includes("overall score:"));

      if (!overallScoreLine) {
        throw new Error("Overall Score not found in AI response.");
      }

      const avgScore =
        overallScoreLine.split(":")[1]?.match(/[\d.]+/)?.[0] || "N/A";

      return {
        overallScore: avgScore,
        feedBack: aiResponse,
      };
    } catch (error) {
      console.error("Error evaluating speaking answer:", error);
      return {
        overallScore: "N/A",
        feedBack: "Error processing answer.",
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

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null; // Ensure cleanup
      startTimeRef.current = null; // Reset start time for next use
    };
  }, [testData]);

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
        totalQuestions += section.questions.length;
      });
    });
    return totalQuestions;
  };

  const handleSubmit = () => {
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      setNoAnswers(true);
      return;
    }

    clearInterval(timerRef.current); // Clear the timer
    const keys = Object.keys(testData);
    const lastSkillKey = keys[keys.length - 1];
    const firstAnswer = Object.values(userAnswers)[0];
    const { skill } = firstAnswer;
    const parts = currentSkillData.parts.map((p) => p.partNumber);
    setTotalPartsSubmit(parts);
    switch (skill) {
      case 0:
        setSubmitting(true);
        const totalQuestionReading = getTotalQuestions(currentSkillData);

        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
            totalQuestions: totalQuestionReading,
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
          handleNextSkill();
          setUserAnswers([]);
          if (lastSkillKey === currentSkillKey) {
            setSubmitted(true);
          }
        });

        break;
      case 1:
        setSubmitting(true);
        const totalQuestions = getTotalQuestions(currentSkillData);

        dispatch(
          submitAnswerTest({
            userAnswers,
            testId,
            timeMinutesTaken: timeTakenData.timeMinutesTaken,
            timeSecondsTaken: timeTakenData.timeSecondsTaken,
            totalQuestions,
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
          handleNextSkill();
          setUserAnswers([]);
          if (lastSkillKey === currentSkillKey) {
            setSubmitted(true);
          }
        });

        break;
      case 2:
        setSubmitting(true);

        (async () => {
          try {
            const totalQuestions = getTotalQuestions(currentSkillData);
            const result = await dispatch(
              submitAnswerTest({
                userAnswers,
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
            if (lastSkillKey === currentSkillKey) {
              setSubmitted(true);
            }
          } catch (error) {
            console.error("Error handling writing test submission:", error);
            setSubmitting(false);
          }
        })();
        break;

      case 3:
        setSubmitting(true);

        (async () => {
          try {
            const updatedAnswers = {};
            const questionIds = Object.keys(userAnswers);
            for (const questionId of questionIds) {
              const userAnswer = userAnswers[questionId];

              const responseSpeaking = await evaluateSpeakingAnswer(userAnswer);
              updatedAnswers[questionId] = {
                ...userAnswer,
                explain: responseSpeaking.feedBack,
                overallScore: responseSpeaking.overallScore,
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
            setUserAnswers([]);
            if (lastSkillKey === currentSkillKey) {
              setSubmitted(true);
            }
          } catch (error) {
            setSubmitting(false);
          }
        })();
        break;
      default:
        console.log("Unknown skill type");
    }
  };

  return (
    <>
      {submitted ? (
        <TestExplain
          totalPartsSubmit={totalPartsSubmit}
          skillResultIds={skillResultIds}
          testId={testId}
          skillId={practiceTestData?.skillId}
        />
      ) : (
        <div className="w-screen">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Header
                practiceTestData={practiceTestData}
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
                part2Time={part2Time}
                part1And3Time={part1And3Time}
                selectedVoice={selectedVoice}
              />
            </div>
          </form>
        </div>
      )}
      {submitting && (
        <>
          <Modal
            isOpen={submitting}
            className="bg-gradient-to-br from-green-800 via-red-700 to-yellow-600 rounded-lg shadow-2xl p-8 max-w-lg mx-auto text-white text-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-16 w-16 text-white mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <h3 className="text-2xl font-bold">Calculating Score...</h3>
              <p className="mt-2 text-sm font-light">
                Please wait a little while as we finish up the calculations.
              </p>
              <div className="mt-4 text-xs font-semibold text-yellow-200">
                🎄 Enjoy the Noel vibes while waiting! 🎄
              </div>
            </div>
          </Modal>
        </>
      )}

      {noAnswers && userAnswers.length == 0 && (
        <>
          <Modal
            isOpen={noAnswers}
            className="bg-warmNeutral flex justify-center gap-5 items-center  rounded-lg shadow-lg p-6 max-w-md mx-auto text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h3 className="text-yellow-800 text-center">
              Please select at least one answer
            </h3>
            <button
              type="button"
              onClick={() => setNoAnswers(false)}
              className="bg-coolNeutral border-gray-500 text-black rounded-md px-4 py-2"
            >
              Close
            </button>
          </Modal>
        </>
      )}
    </>
  );
};

export default TestLayout;
