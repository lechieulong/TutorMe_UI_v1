import React from "react";

const FillInTheBlankQuestion = ({ order, text, blanks, onAnswerChange }) => {
  const handleInputChange = (id, value) => {
    onAnswerChange(id, value);
  };

  const renderQuestionWithBlanks = () => {
    const regex = /\[bl(\d+)\]/g;
    let parts = [];
    let lastIndex = 0;
    let match;
    let blankIndex = order; // Initialize blank index

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
            placeholder={`${blankIndex}`} // Placeholder with order and blank index
            onChange={(e) => handleInputChange(blankId, e.target.value)}
            className="border px-2 w-36 ml-1 rounded-lg"
          />
        );
        blankIndex++; // Increment blank index for each blank
      }

      lastIndex = endIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts;
  };

  return (
    <div className="p-5">
      <p>{renderQuestionWithBlanks()}</p>
    </div>
  );
};

export default FillInTheBlankQuestion;
