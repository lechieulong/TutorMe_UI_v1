// import React, { useState } from "react";
// import axios from "axios";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize GoogleGenerativeAI
// const genAI = new GoogleGenerativeAI("AIzaSyAkFBzNmOixBE8Elh-nNseThbJZMJAMc_A");

// const WritingGemini = () => {
//   const [userText, setUserText] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [topic, setTopic] = useState("");
//   const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [isGeneratingImage, setIsGeneratingImage] = useState(false);

//   // Function to get feedback on the user's writing
//   const reviewWriting = async () => {
//     setIsLoading(true);
//     try {
//       // Use Gemini model to generate feedback
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const prompt = `Check grammar, vocabulary, coherence, and provide feedback including wrong words and sentences, and give scores: "${userText}"`;

//       const result = await model.generateContent(prompt);
//       setFeedback(result.response.candidates[0].content.parts[0].text.trim());
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error reviewing writing:", error);
//       setIsLoading(false);
//     }
//   };

//   // Function to generate topics for Writing Task 1 or Task 2
//   const generateTopic = async (taskType) => {
//     setIsGeneratingTopic(true);
//     try {
//       // Use Gemini model to generate topics
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const prompt = `Generate a topic for IELTS Writing Task ${taskType}.`;

//       const result = await model.generateContent(prompt);
//       const newTopic =
//         result.response.candidates[0].content.parts[0].text.trim();
//       setTopic(newTopic);

//       // Generate image for the new topic
//       generateImage(newTopic);
//       setIsGeneratingTopic(false);
//     } catch (error) {
//       console.error("Error generating topic:", error);
//       setIsGeneratingTopic(false);
//     }
//   };

//   // Function to generate image based on topic
//   const generateImage = async (topic) => {
//     setIsGeneratingImage(true);
//     try {
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
//         {
//           inputs: `generate a high-definition, ultra-detailed, and sharp image `,
//           options: { wait_for_model: true, quality: "ultra", resolution: "4k" }, // Request ultra quality and 4K resolution
//         },
//         {
//           responseType: "blob",
//           headers: {
//             Authorization: `Bearer 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`,
//           },
//         }
//       );

//       const imageUrl = URL.createObjectURL(response.data);
//       setImageUrl(imageUrl);
//       setIsGeneratingImage(false);
//     } catch (error) {
//       console.error("Error generating image:", error);
//       setIsGeneratingImage(false);
//     }
//   };

//   return (
//     <div>
//       <h1>IELTS Writing Review</h1>

//       <button onClick={() => generateTopic(1)} disabled={isGeneratingTopic}>
//         {isGeneratingTopic
//           ? "Generating Topic..."
//           : "Generate Writing Task 1 Topic"}
//       </button>
//       <button onClick={() => generateTopic(2)} disabled={isGeneratingTopic}>
//         {isGeneratingTopic
//           ? "Generating Topic..."
//           : "Generate Writing Task 2 Topic"}
//       </button>

//       {topic && (
//         <div className="topic">
//           <h2>Writing Topic:</h2>
//           <p>{topic}</p>
//         </div>
//       )}

//       {imageUrl && (
//         <div className="image">
//           <h2>Generated Image:</h2>
//           <img src={imageUrl} alt="Generated" style={{ with: "100%" }} />
//         </div>
//       )}

//       <textarea
//         value={userText}
//         onChange={(e) => setUserText(e.target.value)}
//         placeholder="Type your writing here"
//         rows="10"
//         cols="80"
//       ></textarea>

//       <button onClick={reviewWriting} disabled={!userText || isLoading}>
//         {isLoading ? "Reviewing..." : "Review Writing"}
//       </button>

//       {feedback && (
//         <div className="feedback">
//           <h2>Feedback:</h2>
//           <p>{feedback}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WritingGemini;
