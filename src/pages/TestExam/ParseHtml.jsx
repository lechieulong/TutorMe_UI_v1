import React, { useEffect, useRef } from "react";

const ParseHtml = ({
  html,
  onInputChange,
  sectionType,
  questionCounter,
  userAnswers,
  sectionExplain,
}) => {
  const containerRef = useRef();

  // Function to handle input changes
  const test = (event) => {
    const input = event.target;
    const questionId = input.getAttribute("data-question-id");
    const value = input.value;

    if (questionId) {
      onInputChange(questionId, value, sectionType);
    }
  };

  // Update the HTML with the correct values and placeholders
  const updatedHtml = html.replace(/<input/g, (match, offset, string) => {
    const questionIdMatch = string
      .slice(offset)
      .match(/data-question-id="([^"]+)"/);
    const questionId = questionIdMatch ? questionIdMatch[1] : null;

    const value =
      questionId && userAnswers[questionId]
        ? userAnswers[questionId].answers[0].answerText
        : "";

    const placeholder = ` ${questionCounter++}`;

    return `<input value="${value}" placeholder="${placeholder}" data-question-id="${questionId}" />`;
  });

  // After the component mounts, attach event listeners to the dynamically generated inputs
  useEffect(() => {
    const container = containerRef.current;

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("change", test);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("change", test);
      });
    };
  }, [html, userAnswers, sectionType]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: updatedHtml }} />
  );
};

export default ParseHtml;
