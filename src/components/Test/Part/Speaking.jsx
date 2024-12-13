import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useMemo, useState } from "react";
import { getWelcomeMessage } from "./getWelcomeMessage";
import { useDispatch } from "react-redux";
import { evaluateSpeaking } from "../../../redux/testExam/TestSlice";
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
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with welcome message
  const [timeLeft, setTimeLeft] = useState(15);
  const [guidelineMessage, setGuidelineMessage] = useState("");
  const [questionRead, setQuestionRead] = useState(false);
  const [explanation, setExplanation] = useState(""); // Giải thích cho câu hỏi hiện tại
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for submit

  const dispatch = useDispatch();

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
      setExplanation(response.explanation || "No explanation provided.");

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
      return response.explanation;
    } catch (error) {
      console.error("Error evaluating answer:", error);
      return "Error evaluating answer.";
    } finally {
      setLoadingSubmit(false); // End loading
    }
  };

  const submitAnswer = async () => {
    SpeechRecognition.stopListening();

    const explanation = await evaluateAnswer(transcript);

    await new Promise((resolve) => {
      const waitForSpeechEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(waitForSpeechEnd);
          resolve();
        }
      }, 100);
    });

    speakText(explanation, () => {
      if (isLastQuestion) {
        nextPartHandler(); // Move to the next part
      } else {
        goToNextQuestion();
      }
    });

    resetTranscript();
  };

  const skipExplainAndNext = async () => {
    window.speechSynthesis.cancel(); // Stop speech synthesis

    const userAnswer = transcript?.trim(); // Lấy câu trả lời từ transcript
    let explanation = "";

    try {
      if (userAnswer) {
        // Nếu có câu trả lời, chấm điểm bình thường
        const response = await scoringAndExplain(userAnswer);
        explanation = response.explanation || "No explanation provided.";

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
      } else {
        // Nếu không có câu trả lời, chấm 0
        const answerData = {
          part: partData.partNumber,
          questionId: partData.sections[0]?.questions[currentQuestionIndex]?.id,
          sectionType: 0,
          questionName: partData.sections[0]?.questions[0]?.questionName,
          answers: [
            {
              answerText: "",
              answerId: "00000000-0000-0000-0000-000000000000",
            },
          ],
          overallScore: 0, // Điểm 0 khi không trả lời
          partId: partData.id,
          skill: skill,
          skillId: currentSkillId,
        };
        handleAnswerChange({ questionId: answerData.questionId, answerData });
      }
    } catch (error) {
      console.error("Error scoring skipped answer:", error);
    }

    // Reset trạng thái và chuyển sang câu tiếp theo hoặc phần tiếp theo nếu là câu cuối
    resetTranscript();
    if (isLastQuestion) {
      nextPartHandler(); // Move to the next part
    } else {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
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
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timer);
              submitAnswer();
              return 0;
            }
          });
        }, 1000);
        return () => clearInterval(timer);
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
            <div className="mt-4 p-4 bg-blue-100 rounded">
              <p className="text-md text-blue-800">{explanation}</p>
            </div>
          )}
        </div>
      )}

      {!guidelineMessage && (
        <div className="flex flex-col items-center space-y-2">
          {listening ? (
            <p className="text-green-600">Listening...</p>
          ) : (
            <p className="text-gray-600">Click to start speaking</p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                SpeechRecognition.startListening({
                  continuous: true,
                  language: "en-US",
                })
              }
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Start Speaking
            </button>
            <button
              type="button"
              onClick={submitAnswer}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Submitting..." : "Submit Answer"}
            </button>
            <button
              type="button"
              onClick={skipExplainAndNext}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Skip Explain & Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Speaking;
