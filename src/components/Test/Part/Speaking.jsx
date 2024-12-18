import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useMemo, useState, useRef } from "react";
import { getWelcomeMessage } from "./getWelcomeMessage";
import { useDispatch } from "react-redux";
import { evaluateSpeaking } from "../../../redux/testExam/TestSlice";
import {
  faForward,
  faMicrophone,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Speaking = ({
  partData,
  currentSkillId,
  handleAnswerChange,
  skill,
  userAnswers,
  part2Time,
  part1And3Time,
  selectedVoice,
  nextPartHandler, // Callback to go to the next part
  totalPart,
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with welcome message
  const [timeLeft, setTimeLeft] = useState(15);
  const [guidelineMessage, setGuidelineMessage] = useState("");
  const [questionRead, setQuestionRead] = useState(false);
  const [explanation, setExplanation] = useState(""); // Explanation for the current question
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for submit
  const [explaining, setExplaining] = useState(false); // Loading state for submit

  const dispatch = useDispatch();

  const timerRef = useRef(null); // Use ref to store the timer ID

  const currentQuestion =
    partData?.sections[0]?.questions[currentQuestionIndex]?.questionName;
  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === partData?.sections[0]?.questions.length - 1;
  }, [currentQuestionIndex]);

  const examinerVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((voice) => voice.name === selectedVoice) ||
      voices.find((voice) => voice.lang.startsWith("en")) ||
      voices[0]
    );
  };

  const scoringAndExplain = async (answer) => {
    try {
      const result = await dispatch(
        evaluateSpeaking({
          questionName: currentQuestion, // Pass currentQuestion as a property
          answer, // Pass the answer as a property
          partNumber: partData.partNumber, // Pass part as a property
        })
      );

      return result.payload; // Return the result payload from the dispatched action
    } catch (error) {
      console.error("Error fetching explanation:", error);
      return { explanation: "Unable to fetch explanation." };
    }
  };

  const speakText = (text, callback) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.voice = examinerVoice();
      utterance.rate = 1;
      utterance.onend = callback;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported.");
    }
  };

  const evaluateAnswer = async (userAnswer) => {
    try {
      setLoadingSubmit(true); // Start loading
      const response = await scoringAndExplain(userAnswer);
      setExplanation(response.explain || "No explanation provided.");

      const answerData = {
        part: partData.partNumber,
        questionId: partData.sections[0]?.questions[currentQuestionIndex]?.id,
        sectionType: 0,
        questionName: partData.sections[0]?.questions[0]?.questionName,
        answers: [
          {
            answerText: userAnswer,
            answerId: "00000000-0000-0000-0000-000000000000",
          },
        ],
        overallScore: response.score,
        partId: partData.id,
        skill: skill,
        skillId: currentSkillId,
      };

      handleAnswerChange({ questionId: answerData.questionId, answerData });
      return response.explain;
    } catch (error) {
      console.error("Error evaluating answer:", error);
      return "Error evaluating answer.";
    }
  };

  const cleanText = (text) => {
    const cleanedText = text.replace(/<[^>]*>/g, "");

    return cleanedText.replace(/\s+/g, " ").trim();
  };

  const submitAnswer = async () => {
    clearInterval(timerRef.current); // Stop the timer when answer is submitted
    SpeechRecognition.stopListening();

    const explainResponse = await evaluateAnswer(transcript);
    if (!explainResponse) {
      return;
    }
    setLoadingSubmit(false);
    setExplaining(true);

    // Wait for speech synthesis to finish before continuing
    await new Promise((resolve) => {
      const waitForSpeechEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(waitForSpeechEnd);
          resolve();
        }
      }, 100);
    });

    speakText(cleanText(explainResponse), () => {
      if (isLastQuestion && partData.partNumber < totalPart) {
        nextPartHandler(partData.partNumber); // Move to the next part
        setExplaining(false);
      } else {
        goToNextQuestion(); // Move to the next question
        setExplaining(false);
      }
    });

    resetTranscript();
  };

  const skipExplainAndNext = async () => {
    window.speechSynthesis.cancel();
    setLoadingSubmit(false);
    setExplaining(false);

    if (isLastQuestion && partData.partNumber < totalPart) {
      console.log("handlePart ne ");

      nextPartHandler(partData.partNumber);
    } else {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    clearInterval(timerRef.current); // Stop the timer when moving to the next question
    setLoadingSubmit(false);

    SpeechRecognition.stopListening();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setQuestionRead(false);
    setTimeLeft(
      partData.partNumber === 1 || partData.partNumber === 3
        ? part1And3Time || 40
        : part2Time || 180
    );
    resetTranscript();
    setExplanation("");
  };

  useEffect(() => {
    if (currentQuestionIndex >= 0) {
      if (!questionRead && currentQuestion) {
        speakText(currentQuestion, () => {
          setQuestionRead(true);
        });
      }
      if (questionRead) {
        timerRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timerRef.current); // Stop the timer when time runs out
              submitAnswer();
              return 0;
            }
          });
        }, 1000);

        return () => clearInterval(timerRef.current); // Cleanup the timer on component unmount
      }
    }
  }, [currentQuestionIndex, questionRead, currentQuestion]);

  useEffect(() => {
    window.speechSynthesis.cancel();
    const welcomeMessage = getWelcomeMessage(partData?.partNumber);
    setGuidelineMessage(welcomeMessage);

    speakText(welcomeMessage, () => {
      setGuidelineMessage("");
      goToNextQuestion();
    });

    return () => {
      window.speechSynthesis.cancel();
      setCurrentQuestionIndex(-1);
    };
  }, [partData.partNumber]);

  useEffect(() => {
    const handleBeforeUnload = () => stopSpeechSynthesis();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const formatExplanation = (explanation) => {
    const lines = explanation.split("\n");

    const formattedLines = lines.map((line) => {
      const match = line.match(/(.*?):\s*(.*)/);
      if (match) {
        const key = match[1];
        const value = match[2];
        return `
        <div style="margin-bottom: 12px;">
          <strong style="font-size: 16px; font-weight: bold; color: #2d3748;">${key}:</strong> 
          <span style="font-size: 14px; color: #4a5568;">${value}</span>
        </div>
      `;
      } else {
        // For other lines (e.g., unformatted text), wrap them in <div> tag
        return `
        <div style="margin-bottom: 12px;">
          <span style="font-size: 14px; color: #4a5568;">${line}</span>
        </div>
      `;
      }
    });

    // Step 2: Join all formatted lines with a line break between them
    return formattedLines.join("\n");
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {guidelineMessage && (
        <div className="p-4 shadow-2xl bg-warmNeutral">
          <p className="text-lg font-semibold text-gray-800 text-center">
            {guidelineMessage}
          </p>
        </div>
      )}

      {!guidelineMessage && (
        <div className="text-center text-red-600">
          Time Remaining: {timeLeft} seconds
        </div>
      )}

      {!guidelineMessage && currentQuestion && (
        <div className="p-4 shadow-2xl bg-warmNeutral">
          <p className="text-lg font-semibold text-gray-800 text-center">
            {currentQuestion}
          </p>
          {explanation && (
            <div
              className="mt-4 p-4 bg-blue-100 rounded shadow-md border border-blue-200 text-md text-blue-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatExplanation(explanation),
              }}
            />
          )}
        </div>
      )}

      {!guidelineMessage && (
        <div className="flex flex-col items-center space-y-2">
          {listening ? (
            <p className="text-green-600">Listening...</p>
          ) : (
            <>
              {!explaining && (
                <p className="text-gray-600">Click to start speaking</p>
              )}
            </>
          )}
          <div className="flex gap-3">
            {!loadingSubmit && !explaining && (
              <button
                type="button"
                onClick={() =>
                  SpeechRecognition.startListening({
                    continuous: true,
                    language: "en-US",
                  })
                }
                className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600"
              >
                <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                Start Speaking
              </button>
            )}

            {!loadingSubmit ? (
              <>
                {!explaining && (
                  <button
                    type="button"
                    onClick={submitAnswer}
                    className=" border border-green-700 text-accentGreen px-4 py-2 rounded "
                    disabled={loadingSubmit}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Submit answers
                  </button>
                )}
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 animate-spin"
                />
                <p>Submitting ...</p>
              </>
            )}

            {explaining && (
              <button
                type="button"
                onClick={skipExplainAndNext}
                className="bg-red-500 text-white px-4 py-2 rounded shadow-md transition-all duration-200 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none active:scale-95 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faForward} className="mr-2" />
                Skip Explain & Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Speaking;
