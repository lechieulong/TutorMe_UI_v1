import "regenerator-runtime/runtime";
import speech, { useSpeechRecognition } from "react-speech-recognition"; // Correctly import SpeechRecognition
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useEffect, useState } from "react";

const genAI = new GoogleGenerativeAI("AIzaSyAkFBzNmOixBE8Elh-nNseThbJZMJAMc_A");

const Speaking = () => {
  const { listening, transcript } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [question, setQuestion] = useState("");

  const generateSpeakingQuestion = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Generate an IELTS speaking part 2 question.";
      const result = await model.generateContent(prompt);

      setQuestion(result.response.candidates[0].content.parts[0].text.trim());
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
    } catch (error) {
      console.error("Error evaluating corrected answer:", error);
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      evaluateCorrectedAnswer(transcript).then((response) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
        setAiText(response);
      });
    }
  }, [transcript, listening]);

  return (
    <>
      <button onClick={generateSpeakingQuestion()}></button>
      {question && <p>{question}</p>}
      {listening ? (
        <p>Go ahead, I listening...</p>
      ) : (
        <p>Click the button below to start speaking.</p>
      )}
      <button onClick={() => speech.startListening()}>Ask me anything </button>
      <div>
        <h2>Transcript:</h2>
        {transcript && <p> {transcript}</p>}
      </div>
      <div>{thinking && <p> thinking .....</p>}</div>
      <div>{aiText && <p> {aiText}</p>}</div>
    </>
  );
};

export default Speaking;
