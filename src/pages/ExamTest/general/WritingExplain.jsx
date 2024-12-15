import React, { useState, useEffect } from "react";

const WritingExplain = ({ partData, currentSkillId }) => {
  // Function to clean and highlight text
  const cleanAndHighlightText = (explainText) => {
    if (!explainText) {
      // Return an empty string or a default message if explainText is null or undefined
      return "No explanation available.";
    }

    const keywords = [
      "Task Relevance",
      "Task Response",
      "Coherence",
      "Lexical Resource",
      "Grammar",
      "benefits",
      "drawbacks",
      "examples",
      "conclusion",
      "transition",
      "cohesion",
      "grammar",
      "vocabulary",
      "clarity",
      "specific",
      "compelling",
      "substantial",
      "weak",
    ];

    const highlightKeyword = (text, keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      return text.replace(
        regex,
        `<mark style="background-color: yellow; font-weight: bold;">$1</mark>`
      );
    };

    let cleanedText = explainText.replace(/\n/g, "<br />");

    keywords.forEach((keyword) => {
      cleanedText = highlightKeyword(cleanedText, keyword);
    });

    return cleanedText;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold">Writing Task</h1>
      </header>

      {/* Content Section */}
      <div className="flex flex-grow flex-col px-4 py-6">
        {/* Textarea for user answer */}
        <div className="mb-6">
          <textarea
            value={
              partData?.sections[0]?.questions[0]?.userAnswers[0]?.answerText
            }
            className="w-full h-[450px] p-4 text-lg outline-none resize-none bg-gray-100 rounded-lg shadow-md"
            placeholder="Start writing your article here..."
          />
        </div>

        {/* Explain Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Explain</h3>
          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{
              __html: cleanAndHighlightText(
                partData?.sections[0]?.questions[0]?.explain
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WritingExplain;
