import React, { useEffect } from "react";

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
      <div>
      <div class="input-wrapper">
        ${match.replace(
          ">",
          ` value="${userAnswer}" placeholder="${placeholder}">`
        )}
      </div>
        <p  class="correct-answer font-bold"> CorrectAnswers:  ${correctAnswer} </p>
      </div>

    `;
    }
  );

  const highlightSpecialCharacters = (text) => {
    if (!text) return "";

    // Step 1: Remove IDs
    text = text.replace(/\b[a-f0-9\-]{36}\b\s+/g, "");

    // Step 2: Highlight "Correct Answer"
    const regexCorrectAnswer = /\bCorrect Answer:\s*("[^"]+")/i;
    text = text.replace(
      regexCorrectAnswer,
      (match, answer) =>
        `<span class="font-bold text-blue-500">Correct Answer:</span> <span class="font-bold text-green-500">${answer}</span>`
    );

    // Step 3: Append "Explain here" to each section
    const regexExplain =
      /(The correct answer is ".*?")([^]*?)(?=(The correct answer is "|$))/g;
    text = text.replace(
      regexExplain,
      (match, firstSentence, rest) =>
        `${firstSentence}<br /><span class="font-bold text-yellow-500">Explain here:</span>${rest}`
    );

    return text;
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
      <div>
        <p className="font-bold text-yellow-400 mt-4 mb-4">Explained Answer:</p>
        {/* Highlight special characters in the explanation */}
        <p
          className="mt-4 mb-4"
          dangerouslySetInnerHTML={{
            __html: highlightSpecialCharacters(
              sectionExplain || "No explanation provided."
            ),
          }}
        />
      </div>
    </>
  );
};

export default ParseHtmlExplain;
