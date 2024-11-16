import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useMemo, useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const Speaking = ({ partData, currentSkillKey, handleAnswerChange }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with welcome message
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [timeLeft, setTimeLeft] = useState(5); // Default time for Part 1 (45 seconds)

  const [showWelcome, setShowWelcome] = useState(true);
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
      voices.find((voice) => voice.name.includes("Google US English Male")) ||
      voices[1]
    );
  };

  const speakText = (text, callback) => {
    if ("speechSynthesis" in window) {
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
    // Strip unwanted special characters and format the text for speech and rendering
    return text
      .replace(/[\*\n\r]+/g, " ") // Remove bullet points, asterisks, newlines
      .replace(/\*\s*\*/g, "") // Remove double asterisks (for example, in markdown)
      .replace(/[-\u200B-\u200D\uFEFF\u202F]/g, "") // Remove zero-width characters and other non-visible characters
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim(); // Remove leading/trailing spaces
  };

  const evaluateAnswer = async (userAnswer) => {
    try {
      console.log(userAnswer);
      setThinking(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      Evaluate this response based on IELTS Speaking criteria:
      1. Fluency and Coherence (0-9)
      2. Lexical Resource (0-9)
      3. Grammatical Range and Accuracy (0-9)
      4. Pronunciation (0-9)
      
      Provide scores for each criterion and a summary of feedback.
      Response: "${userAnswer}"`;
      const result = await model.generateContent(prompt);
      const aiResponse =
        result.response.candidates[0].content.parts[0].text.trim();
      setAiText(aiResponse);

      setThinking(false);
      const cleanedText = cleanText(aiResponse);
      speakText(cleanedText);
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setThinking(false);
    }
  };

  const handleTimer = () => {
    SpeechRecognition.stopListening();
    evaluateAnswer(transcript);
    resetTranscript();
    setAiText("");
    window.speechSynthesis.cancel();
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setQuestionRead(false); // Reset question read state
    setTimeLeft(
      partData.partNumber === 1 || partData.partNumber === 3 ? 5 : 180
    ); // Reset timer based on partNumber
    resetTranscript(); // Clear the transcript for the next question
    setAiText(""); // Clear feedback
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
    let welcomeMessage = "";

    if (partData?.partNumber === 1) {
      welcomeMessage = "a";
      // welcomeMessage = `Hello, and welcome to the IELTS Speaking test. My name is Hydra, and I will be your examiner today. This test is recorded for assessment purposes.
      //   The Speaking test is divided into three parts. I will explain each part as we go along, and I will ask you to speak on a variety of topics. You are encouraged to speak as much as possible and give full answers. There are no right or wrong answers, so feel free to share your thoughts and opinions.
      //   In Part 1, I will ask you some general questions about yourself, your life, and familiar topics. This is just to help you feel comfortable.`;
    } else if (partData?.partNumber === 2) {
      welcomeMessage = `In Part 2, I will give you a task card with a topic and prompts. You will have 1 minute to prepare, and then I would like you to speak for 1-2 minutes on the topic.`;
    } else if (partData?.partNumber === 3) {
      welcomeMessage = `In Part 3, we will have a discussion based on the topic in Part 2. I will ask you more detailed questions, and we will explore your ideas in more depth.`;
    }

    setGuidelineMessage(welcomeMessage);

    speakText(welcomeMessage, () => {
      setGuidelineMessage(); // Hide the welcome message after it's spoken
      goToNextQuestion(); // Proceed to the first question after the welcome message
    });

    return () => {
      window.speechSynthesis.cancel();
      setCurrentQuestionIndex(-1);
    };
  }, [partData.partNumber]); // Trigger effect when partData changes

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

              <button
                type="button"
                onClick={SpeechRecognition.stopListening}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Stop
              </button>
            </div>
          </div>

          <div className="w-full text-gray-700">
            {thinking && (
              <p className="text-gray-800 text-center">Thinking...</p>
            )}
            {!thinking && aiText && (
              <div>
                <p>Feedback:</p>
                <div className="bg-gray-100 p-2 rounded">{aiText}</div>
              </div>
            )}
          </div>

          {!isLastQuestion && (
            <button
              type="button"
              onClick={goToNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Speaking;
