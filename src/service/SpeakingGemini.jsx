import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const SpeakingGemini = () => {
  const { transcript, listening } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [question, setQuestion] = useState("");

  const generateSpeakingQuestion = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Generate an IELTS speaking part 2 question.";
      const result = await model.generateContent(prompt);

      const generatedQuestion =
        result.response.candidates[0].content.parts[0].text.trim();
      setQuestion(generatedQuestion);

      // Speak the question
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(generatedQuestion);
        window.speechSynthesis.speak(utterance);
      } else {
        console.error("Speech synthesis not supported.");
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
      setAiText(result.response.candidates[0].content.parts[0].text.trim());
      setThinking(false);
      return result; // Return the result so it can be handled outside
    } catch (error) {
      console.error("Error evaluating corrected answer:", error);
      return null;
    }
  };

  useEffect(() => {
    // Automatically generate question and read it aloud when the component mounts
    generateSpeakingQuestion();
  }, []);

  useEffect(() => {
    if (!listening && transcript) {
      evaluateCorrectedAnswer(transcript).then((result) => {
        if (result && "speechSynthesis" in window) {
          const resultText =
            result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (resultText) {
            console.log("AI response: ", resultText);
            const utterance = new SpeechSynthesisUtterance(resultText);
            window.speechSynthesis.speak(utterance);
            setAiText(resultText);
          } else {
            console.error("No valid response to speak.");
          }
        } else {
          console.error("Speech synthesis not supported or invalid response.");
        }
      });
    }
  }, [transcript, listening]);

  return (
    <div className="flex flex-col">
      {question && <p>{question}</p>}
      {listening ? <p>Listening...</p> : <p>Click to start speaking</p>}
      <button onClick={SpeechRecognition.startListening}>Start Speaking</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>

      <div>
        <h2>Transcript:</h2>
        {transcript && <p>{transcript}</p>}
      </div>
      <div>{thinking && <p>thinking...</p>}</div>
      <div>{aiText && <p>{aiText}</p>}</div>
    </div>
  );
};

export default SpeakingGemini;
