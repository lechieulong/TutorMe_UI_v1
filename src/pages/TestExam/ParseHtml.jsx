import React, { useEffect, useRef } from "react";

const ParseHtml = ({
  html,
  onInputChange,
  sectionType,
  questionCounter,
  userAnswers,
  sectionExplain,
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    const inputs = document.querySelectorAll("input[data-question-id]");
    inputRefs.current = inputs;

    inputs.forEach((input, index) => {
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

  let currentCounter = questionCounter;

  const updatedHtml = html.replace(/<input/g, (match, offset, string) => {
    const questionIdMatch = string
      .slice(offset)
      .match(/data-question-id="([^"]+)"/);
    const questionId = questionIdMatch ? questionIdMatch[1] : null;

    const value =
      questionId && userAnswers[questionId]
        ? userAnswers[questionId].answers[0].answerText
        : "";

    const placeholder = ` ${currentCounter++}`;

    return `<input value="${value}" placeholder="${placeholder}" `;
  });

  return <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />;
};

export default ParseHtml;
