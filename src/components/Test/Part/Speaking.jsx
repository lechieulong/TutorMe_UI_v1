import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useMemo, useState } from "react";
import { getWelcomeMessage } from "./getWelcomeMessage";

const Speaking = ({
  partData,
  currentSkillId,
  handleAnswerChange,
  skill,
  userAnswers,
  part2Time,
  part1And3Time,
  selectedVoice,
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with welcome message
  const [timeLeft, setTimeLeft] = useState(15);
  const [guidelineMessage, setGuidelineMessage] = useState("");
  const [questionRead, setQuestionRead] = useState(false);

  const currentQuestion =
    partData?.sections[0]?.questions[currentQuestionIndex]?.questionName;
  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === partData?.sections[0]?.questions.length - 1;
  }, [currentQuestionIndex]);

  const examinerVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((voice) => voice.name === selectedVoice) ||
      voices.find((voice) => voice.lang.startsWith("en")) || // Fallback to first English voice
      voices[0] // Fallback to any available voice
    );
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

  const cleanText = (text) => {
    return text
      .replace(/[\*\n\r]+/g, " ")
      .replace(/\*\s*\*/g, "")
      .replace(/[-\u200B-\u200D\uFEFF\u202F]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const evaluateAnswer = async (userAnswer) => {
    try {
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
        partId: partData.id,
        skill: skill,
        skillId: currentSkillId,
      };

      handleAnswerChange({ questionId: answerData.questionId, answerData });
    } catch (error) {
      console.error("Error evaluating answer:", error);
    }
  };

  const handleTimer = async () => {
    SpeechRecognition.stopListening();
    await evaluateAnswer(transcript);
    goToNextQuestion();
    resetTranscript();
    setAiText("");
    window.speechSynthesis.cancel();
  };

  const goToNextQuestion = () => {
    if (isLastQuestion) {
      SpeechRecognition.stopListening();
      setTimeLeft(0);
      setAiText("");
      resetTranscript();
      window.speechSynthesis.cancel();
      setCurrentQuestionIndex(-1);
      setShowWelcome(true);
    } else {
      SpeechRecognition.stopListening();
      if (transcript) {
        evaluateAnswer(transcript);
      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionRead(false);
      setTimeLeft(
        partData.partNumber === 1 || partData.partNumber === 3
          ? part1And3Time
            ? part1And3Time
            : 40
          : part2Time
          ? part2Time
          : 180
      );
      resetTranscript();
      setAiText("");
    }
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
              handleTimer();
              return 0;
            }
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [currentQuestionIndex, questionRead, currentQuestion]);

  useEffect(() => {
    if (!listening && transcript) {
      evaluateAnswer(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    window.speechSynthesis.cancel();
    let welcomeMessage = getWelcomeMessage(partData?.partNumber);
    setGuidelineMessage(welcomeMessage);

    speakText(welcomeMessage, () => {
      setGuidelineMessage();
      goToNextQuestion();
    });

    return () => {
      window.speechSynthesis.cancel();
      setCurrentQuestionIndex(-1);
    };
  }, [partData.partNumber]);

  useEffect(() => {
    const handleUnload = () => {
      window.speechSynthesis.cancel();
      SpeechRecognition.stopListening();
      resetTranscript();
      setAiText("");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
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
        </div>
      )}

      {!guidelineMessage && (
        <>
          <div className="flex flex-col items-center space-y-2">
            {listening ? (
              <p className="text-green-600">Listening...</p>
            ) : (
              <p className="text-gray-600">Click to start speaking</p>
            )}
            <div className="flex">
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

              {/* <button
                type="button"
                onClick={SpeechRecognition.stopListening}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Stop speaking
              </button> */}
            </div>
          </div>

          {/* {!isLastQuestion && (
            <button
              type="button"
              onClick={goToNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Next Question
            </button>
          )} */}
        </>
      )}
    </div>
  );
};

export default Speaking;
