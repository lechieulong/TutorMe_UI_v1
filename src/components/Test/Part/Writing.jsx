import React, { useState } from "react";

const Writing = ({ partData, currentSkillKey, handleAnswerChange }) => {
  const [text, setText] = useState("");

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    const answerData = {
      skill: currentSkillKey,
      part: partData.partId,
      questionId: partData.sections[0]?.questions[0]?.id,
      answerText: value,
      answerId: "",
    };

    handleAnswerChange({ index: 0, answerData });
  };

  return (
    <div
      style={{
        height: "calc(100vh - 100px)",
      }}
      className="flex flex-col"
    >
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Task 1</h1>
        <div className="text-sm">Word Count: {countWords(text)}</div>
      </header>

      <textarea
        value={text}
        onChange={handleChange}
        className="flex-grow p-6 text-lg outline-none resize-none bg-gray-100"
        placeholder="Start writing your article here..."
      />
    </div>
  );
};

export default Writing;
