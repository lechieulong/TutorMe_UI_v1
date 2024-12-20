import React from "react";

const ParseHtmlExplain = ({
  html,
  sectionType,
  questionCounter,
  questions,
  sectionExplain,
}) => {
  let currentCounter = questionCounter;

  // Process the HTML to inject user answers and placeholders
  const updatedHtml = html.replace(
    /<input[^>]*data-question-id="([^"]+)"[^>]*>/g,
    (match, questionId) => {
      // Find the corresponding question and answers
      const question = questions.find((q) => q.id === questionId);

      // User answer and correct answer for the question
      const userAnswer = question?.userAnswers?.[0]?.answerText || "";
      const correctAnswer = question?.answers?.[0]?.answerText || "";

      // Increment the placeholder for each input
      const placeholder = ` ${currentCounter++}`;

      // Return the updated input element with default value and placeholder
      return `
        <div class="input-wrapper mb-4">
          ${match.replace(
            ">",
            ` value="${userAnswer}" placeholder="${placeholder}" class="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"`
          )}
          <p class="correct-answer text-green-600 font-semibold mt-1">Correct Answer: ${correctAnswer}</p>
        </div>
      `;
    }
  );

  const highlightSpecialCharacters = (text) => {
    if (!text) return "";

    // Step 1: Highlight QuestionId
    text = text.replace(
      /\*\*QuestionId:\s*([a-f0-9\-]+)\s*/gi,
      (match, id) =>
        `<div class="mt-4 mb-2">
          <span class="font-bold text-gray-700">Question ID:</span>
          <span class="font-mono text-purple-600">${id}</span>
        </div>`
    );

    // Step 2: Highlight "Correct Answer" with vibrant styling
    text = text.replace(
      /\*\*Correct Answer:\s*([^*]+)/gi,
      (match, answer) =>
        `<div class="mb-2">
          <span class="font-bold text-blue-600">Correct Answer:</span>
          <span class="bg-green-100 text-green-700  font-bold px-2 py-1 rounded-lg shadow-sm">
            ${answer}
          </span>
        </div>`
    );

    // Step 3: Add breaklines and format explanation text
    text = text.replace(
      /(?:\*\*(.*?)\*\*)\s*([^*]+)/g,
      (match, title, content) =>
        `<div class="mt-4">
          <p class="font-semibold text-gray-700">${title}:</p>
          <p class="text-gray-600">${content.trim()}</p>
        </div>`
    );

    // Ensure clean breaks between questions
    text = text.replace(/(\n\s*)+/g, "<br />");

    return text;
  };

  const formatExplanations = (text) => {
    if (!text) return "";

    // Step 1: Highlight Section Titles
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      (match, title) =>
        `<h2 class="mt-4 text-lg font-bold text-blue-700">${title}</h2>`
    );

    // Step 2: Highlight Subsection Titles
    text = text.replace(
      /\*\s*(.*?):/g,
      (match, subtitle) =>
        `<p class="mt-2 font-semibold text-purple-600">${subtitle}:</p>`
    );

    // Step 3: Style Correct Answers
    text = text.replace(
      /Correct Answer:\s*(.*?)\n/g,
      (match, answer) =>
        `<p class="text-green-600 bg-green-100 px-4 py-2 rounded-md font-medium mb-2">Correct Answer: ${answer}</p>`
    );

    // Step 4: Add Styling for Explanations
    text = text.replace(
      /The passage\s*(.*?):/g,
      (match, explanation) =>
        `<p class="text-gray-700 leading-relaxed mb-4">${explanation}:</p>`
    );

    // Step 5: Clean and Replace Newlines
    text = text.replace(/(?:\n\s*)+/g, "<br />");

    return text;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Inject the processed HTML */}
      <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />

      {/* Explanation Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-yellow-500 mb-4">
          Explained Answer:
        </h2>
        {/* <div
          className="prose prose-sm text-gray-700 space-y-6"
          dangerouslySetInnerHTML={{
            __html: highlightSpecialCharacters(
              sectionExplain || "No explanation provided."
            ),
          }}
        /> */}

        <div
          className="prose prose-sm text-gray-700 space-y-6"
          dangerouslySetInnerHTML={{
            __html: formatExplanations(
              sectionExplain || "No explanation provided."
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ParseHtmlExplain;
