import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI);

const Writing = ({ partData, currentSkillKey, handleAnswerChange }) => {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [scores, setScores] = useState({
    task: null,
    coherence: null,
    lexical: null,
    grammar: null,
  });
  const [overallScore, setOverallScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEvaluationVisible, setIsEvaluationVisible] = useState(true);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    const answerData = {
      skill: currentSkillKey,
      part: partData.partId,
      questionId: partData.sections[0]?.questions[0]?.id,
      answerText: value,
      answerId: "",
    };

    handleAnswerChange({ index: 0, answerData });
  };

  const evaluateAnswer = async () => {
    if (text.trim().length === 0) {
      setFeedback("Please write something before submitting for evaluation.");
      return;
    }

    setLoading(true);
    setFeedback("");
    setScores({
      task: null,
      coherence: null,
      lexical: null,
      grammar: null,
    });
    setSuggestions([]);
    setOverallScore(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Evaluate the following response based on IELTS Writing Task 2 criteria:
        - Task Achievement (Score: 0-9)
        - Coherence and Cohesion (Score: 0-9)
        - Lexical Resource (Score: 0-9)
        - Grammatical Range and Accuracy (Score: 0-9)
        - Highlight any grammar or syntax issues in the text, and suggest corrections.
        - Provide an overall score as the average of the four criteria.
        
        Response: "${text}"
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.candidates[0].content.parts[0].text;

      // Ensure we extract valid scores
      const parsedResponse = aiResponse.split("\n").reduce(
        (acc, line) => {
          if (line.includes("Task Achievement")) {
            const score = parseFloat(line.split(":")[1]?.trim());
            if (!isNaN(score)) acc.scores.task = score;
          }
          if (line.includes("Coherence and Cohesion")) {
            const score = parseFloat(line.split(":")[1]?.trim());
            if (!isNaN(score)) acc.scores.coherence = score;
          }
          if (line.includes("Lexical Resource")) {
            const score = parseFloat(line.split(":")[1]?.trim());
            if (!isNaN(score)) acc.scores.lexical = score;
          }
          if (line.includes("Grammatical Range")) {
            const score = parseFloat(line.split(":")[1]?.trim());
            if (!isNaN(score)) acc.scores.grammar = score;
          }
          if (line.includes("Suggestions")) {
            acc.suggestions.push(line.replace("Suggestions:", "").trim());
          }
          if (!line.includes(":") && acc.suggestions.length > 0) {
            acc.suggestions[acc.suggestions.length - 1] += ` ${line.trim()}`;
          }
          if (!line.includes(":") && acc.suggestions.length === 0) {
            acc.feedback += line.trim() + " ";
          }
          return acc;
        },
        { feedback: "", scores: {}, suggestions: [] }
      );

      // Calculate overall score
      const totalScores = [
        parsedResponse.scores.task,
        parsedResponse.scores.coherence,
        parsedResponse.scores.lexical,
        parsedResponse.scores.grammar,
      ].filter((score) => score !== null);

      const avgScore =
        totalScores.length > 0
          ? (
              totalScores.reduce((sum, score) => sum + score, 0) /
              totalScores.length
            ).toFixed(1)
          : null;

      setFeedback(parsedResponse.feedback.trim());
      setScores(parsedResponse.scores);
      setSuggestions(parsedResponse.suggestions);
      setOverallScore(avgScore);
    } catch (error) {
      console.error("Error evaluating writing:", error);
      setFeedback(
        "An error occurred while evaluating your writing. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleEvaluationVisibility = () => {
    setIsEvaluationVisible((prev) => !prev);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 180px)",
      }}
      className="flex flex-col"
    >
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Writing Task</h1>
        <div className="text-sm">Word Count: {countWords(text)}</div>
      </header>

      <textarea
        value={text}
        onChange={handleChange}
        className="flex-grow p-6 text-lg outline-none resize-none bg-gray-100"
        placeholder="Start writing your article here..."
      />

      <button
        type="button"
        onClick={evaluateAnswer}
        className="bg-green-600 text-white p-2 rounded shadow hover:bg-mainColor"
        disabled={loading}
      >
        {loading ? "Evaluating..." : "Submit for Evaluation"}
      </button>

      <button
        type="button"
        onClick={toggleEvaluationVisibility}
        className="bg-white text-houseGreen border border-houseGreen p-2 mt-2 rounded shadow hover:bg-gray-200"
      >
        {isEvaluationVisible ? "Hide Evaluation" : "Show Evaluation"}
      </button>

      {isEvaluationVisible && (
        <div className="p-4 bg-gray-100 mt-4 rounded shadow">
          {loading && <p className="text-gray-600">Generating feedback...</p>}

          {!loading && feedback && (
            <>
              <h2 className="text-lg font-bold text-gray-800">Feedback</h2>
              <p className="text-gray-700">{feedback}</p>
            </>
          )}

          {!loading && suggestions.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold text-gray-800">Suggestions</h2>
              <ul className="list-disc pl-4 text-gray-700">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {!loading && Object.keys(scores).length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold text-gray-800">Scores</h2>
              <ul className="list-disc pl-4 text-gray-700">
                <li>Task Achievement: {scores.task || "Not Available"}</li>
                <li>
                  Coherence and Cohesion: {scores.coherence || "Not Available"}
                </li>
                <li>Lexical Resource: {scores.lexical || "Not Available"}</li>
                <li>
                  Grammatical Range and Accuracy:{" "}
                  {scores.grammar || "Not Available"}
                </li>
                <li>Overall Score: {overallScore || "Not Available"}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Writing;
