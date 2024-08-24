import React, { useState } from "react";

const Writing = ({ partData, part }) => {
  const writing = partData.find((_, index) => index === part);

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  return (
    <div className="flex flex-col h-screen bg-yellow-50 h-creen">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Task 1</h1>
        <div className="text-sm">Word Count: {countWords(text)}</div>
      </header>

      <textarea
        value={text}
        onChange={handleChange}
        className="flex-grow p-6 text-lg outline-none resize-none bg-gray-100 focus:bg-white"
        placeholder="Start writing your article here..."
      />
    </div>
  );
};

export default Writing;
