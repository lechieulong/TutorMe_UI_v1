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

    // Replace special characters with highlighted spans
    const regexSpecialChars = /[^\w\s]/g;
    text = text.replace(
      regexSpecialChars,
      (match) => `<span class="text-red-500">${match}</span>`
    );

    // Add a line break before "Question"
    const regexQuestion = /\bQuestion\b/g;
    text = text.replace(
      regexQuestion,
      (match) => `<br /><span class="font-bold text-blue-500">${match}</span>`
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
          className="font-bold mt-4 mb-4"
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
