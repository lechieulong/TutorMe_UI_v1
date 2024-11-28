import React, { useEffect } from "react";

const ParseHtml = ({
  html,
  onInputChange,
  sectionType,
  questionCounter,
  userAnswers,
}) => {
  useEffect(() => {
    const inputs = document.querySelectorAll("input[data-question-id]");

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const questionId = input.getAttribute("data-question-id");
        const value = input.value;

        if (questionId) {
          onInputChange(questionId, value, sectionType);
        }
      });
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("change", () => {});
      });
    };
  }, [html, onInputChange, sectionType]);

  let currentCounter = questionCounter++;

  const updatedHtml = html.replace(/<input/g, (match, offset, string) => {
    const questionIdMatch = string
      .slice(offset)
      .match(/data-question-id="([^"]+)"/);
    const questionId = questionIdMatch ? questionIdMatch[1] : null;

    const value =
      questionId && userAnswers[questionId]
        ? userAnswers[questionId].answers[0].answerText
        : "";

    // Increment the placeholder
    const placeholder = ` ${currentCounter++}`;

    // Return the updated input tag
    return `<input value="${value}" placeholder="${placeholder}" `;
  });

  return <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />;
};

export default ParseHtml;
