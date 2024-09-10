// // src/Speaking.js
// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

// // Initialize GoogleGenerativeAI
// const genAI = new GoogleGenerativeAI("AIzaSyAkFBzNmOixBE8Elh-nNseThbJZMJAMc_A");

// const SpeakingGemini = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [correctedAnswer, setCorrectedAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [spellingFeedback, setSpellingFeedback] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to generate an IELTS speaking question
//   const generateSpeakingQuestion = async () => {
//     setIsLoading(true);
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const prompt = "Generate an IELTS speaking part 2 question.";
//       const result = await model.generateContent(prompt);

//       setQuestion(result.response.candidates[0].content.parts[0].text.trim());
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error generating question:", error);
//       setIsLoading(false);
//     }
//   };

//   // Function to evaluate the corrected answer using Gemini AI after spelling check
//   const evaluateCorrectedAnswer = async (correctedAnswer) => {
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const prompt = `Give an overall score and scores for grammar, vocabulary, fluency, coherence on the IELTS score scale, and provide feedback based on this corrected answer: "${correctedAnswer}"`;

//       const result = await model.generateContent(prompt);
//       setFeedback(result.response.candidates[0].content.parts[0].text.trim());
//     } catch (error) {
//       console.error("Error evaluating corrected answer:", error);
//     }
//   };

//   // Function to check spelling using Hugging Face model
//   const checkSpellingAndEvaluate = async () => {
//     setIsLoading(true);
//     try {
//       // Call the Hugging Face spelling correction model
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/oliverguhr/spelling-correction-english-base",
//         { inputs: answer },
//         {
//           headers: {
//             Authorization: `Bearer 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`,
//           },
//         }
//       );

//       const corrected = response.data[0].generated_text;
//       setCorrectedAnswer(corrected);
//       setSpellingFeedback(
//         `Original Answer: ${answer}\nCorrected Answer: ${corrected}`
//       );

//       // Now evaluate the corrected answer
//       await evaluateCorrectedAnswer(corrected);

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error checking spelling:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>IELTS Speaking Practice</h1>

//       <button onClick={generateSpeakingQuestion} disabled={isLoading}>
//         {isLoading ? "Generating..." : "Generate Speaking Question"}
//       </button>

//       {question && (
//         <>
//           <div className="question">
//             <h2>Speaking Question:</h2>
//             <p>{question}</p>
//           </div>

//           <div className="answer-section">
//             <textarea
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               placeholder="Type your answer here"
//               rows="10"
//               cols="80"
//             ></textarea>

//             <button
//               onClick={checkSpellingAndEvaluate}
//               disabled={!answer || isLoading}
//             >
//               {isLoading ? "Evaluating..." : "Check Spelling & Evaluate"}
//             </button>
//           </div>

//           {spellingFeedback && (
//             <div className="spelling-feedback">
//               <h2>Spelling and Pronunciation Feedback:</h2>
//               <p>{spellingFeedback}</p>
//             </div>
//           )}

//           {feedback && (
//             <div className="feedback">
//               <h2>Overall Feedback:</h2>
//               <p>{feedback}</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SpeakingGemini;
