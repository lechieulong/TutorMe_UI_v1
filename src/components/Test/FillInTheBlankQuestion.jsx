import React from "react";

const FillInTheBlankQuestion = ({ text, blanks, onAnswerChange }) => {
  const handleInputChange = (id, value) => {
    onAnswerChange(id, value);
  };

  const renderQuestionWithBlanks = () => {
    const regex = /\[bl(\d+)\]/g;
    let parts = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }
      const blankId = parseInt(match[1], 10);

      const blank = blanks.find((b) => b.id === blankId);

      if (blank) {
        parts.push(
          <input
            key={blankId}
            type="text"
            placeholder={blank.placeholder}
            onChange={(e) => handleInputChange(blankId, e.target.value)}
            className="border px-2 py-1 ml-1"
          />
        );
      }

      lastIndex = endIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    console.log("haha", parts);

    return parts;
  };

  return (
    <div className="p-5">
      <p>{renderQuestionWithBlanks()}</p>
    </div>
  );
};

export default FillInTheBlankQuestion;
