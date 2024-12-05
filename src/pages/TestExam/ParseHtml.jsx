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
      onInputChange(questionId, value, sectionType, html);
    }
  };

  // Update the HTML with the correct values and placeholders
  const updatedHtml = html.replace(/<input[^>]*>/g, (match) => {
    // Giữ lại các thuộc tính cần thiết
    const valueMatch = match.match(/value="([^"]*)"/);
    const placeholderMatch = match.match(/placeholder="([^"]*)"/);
    const dataQuestionIdMatch = match.match(/data-question-id="([^"]*)"/);

    const value = valueMatch ? `value="${valueMatch[1]}"` : "";
    const placeholder = placeholderMatch
      ? `placeholder="${placeholderMatch[1]}"`
      : "";
    const dataQuestionId = dataQuestionIdMatch
      ? `data-question-id="${dataQuestionIdMatch[1]}"`
      : "";

    // Tạo lại thẻ input với chỉ các thuộc tính cần thiết
    return `<input ${value} ${placeholder} ${dataQuestionId} />`;
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
