import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const Speaking = () => {
  const { transcript, listening } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [question, setQuestion] = useState("");
  const [allowSpeaking, setAllowSpeaking] = useState(false); // New state to control TTS
  const [firstLoad, setFirstLoad] = useState(true); // Flag to prevent TTS on reload

  const generateSpeakingQuestion = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Generate an IELTS speaking part 2 question.";
      const result = await model.generateContent(prompt);
      const generatedQuestion =
        result.response.candidates[0].content.parts[0].text.trim();

      // Clean the question before setting it
      const cleanedQuestion = cleanText(generatedQuestion);
      setQuestion(cleanedQuestion);

      if (allowSpeaking && !firstLoad) {
        speakText(cleanedQuestion); // Speak only if it's allowed and after first load
      }
    } catch (error) {
      console.error("Error generating question:", error);
    }
  };

  const evaluateCorrectedAnswer = async (userAnswer) => {
    try {
      setThinking(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Give an overall score and scores for grammar, vocabulary, fluency, coherence on the IELTS score scale, and provide feedback based on this corrected answer: "${userAnswer}"`;
      const result = await model.generateContent(prompt);
      const aiResponse =
        result.response.candidates[0].content.parts[0].text.trim();
      setAiText(aiResponse);
      setThinking(false);

      if (allowSpeaking) {
        const cleanedText = cleanText(aiResponse);
        speakText(cleanedText);
      }
    } catch (error) {
      console.error("Error evaluating corrected answer:", error);
      setThinking(false);
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

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported.");
    }
  };

  useEffect(() => {
    generateSpeakingQuestion(); // Generates question, but doesn’t speak initially
    setFirstLoad(false); // Mark the first load as done
  }, []);

  useEffect(() => {
    if (!listening && transcript) {
      evaluateCorrectedAnswer(transcript);
    }
  }, [transcript, listening]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex  gap-2">
        <button
          type="button"
          onClick={generateSpeakingQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Speaking Question
        </button>
        <button
          type="button"
          onClick={() => setAllowSpeaking(!allowSpeaking)} // Toggle allowSpeaking
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {allowSpeaking ? "Disable Speaking" : "Enable Speaking"}
        </button>
      </div>

      {question && (
        <div className="p-4 shadow-2xl bg-warmNeutral">
          <p className="text-lg font-semibold text-gray-800 text-center">
            {" "}
            {question}{" "}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center space-y-2">
        {listening ? (
          <p className="text-green-600">Listening...</p>
        ) : (
          <p className="text-gray-600">Click to start speaking</p>
        )}
        <div className="flex  ">
          <button
            type="button"
            onClick={SpeechRecognition.startListening}
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
      <div className="w-full">
        <h2 className="text-lg font-semibold text-gray-700">Transcript:</h2>
        {transcript ? (
          <p className="text-gray-800">{transcript}</p>
        ) : (
          <p className="text-gray-400">No transcript available</p>
        )}
      </div>
      <div className="w-full">
        {thinking ? <p className="text-yellow-600">Thinking...</p> : null}
        {aiText && <p className="text-gray-800">{aiText}</p>}
      </div>
    </div>
  );
};

export default Speaking;
