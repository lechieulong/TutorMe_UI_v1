import React, { useState, useEffect } from "react";

const Writing = ({
  partData,
  currentSkillId,
  handleAnswerChange,
  skill,
  userAnswers,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your progress might be lost.";
    };

    const preventNavigation = () => {
      window.history.pushState(null, document.title, window.location.href);
    };

    // Ngăn người dùng thoát trang
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Ngăn nút Back
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", preventNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", preventNavigation);
    };
  }, []);

  // Populate text state from userAnswers when userAnswers or partData changes
  useEffect(() => {
    const answerText =
      userAnswers[partData.sections[0]?.questions[0]?.id]?.answers[0]
        ?.answerText || "";
    setText(answerText);
  }, [userAnswers, partData]);

  // Handle updating answer data
  useEffect(() => {
    if (!text.trim()) return; // Avoid sending empty text
    const answerData = {
      part: partData.partNumber,
      questionId: partData.sections[0]?.questions[0]?.id,
      sectionType: 0,
      questionName: partData.sections[0]?.questions[0]?.questionName,
      answers: [
        { answerText: text, answerId: "00000000-0000-0000-0000-000000000000" },
      ],
      skill: skill,
      skillId: currentSkillId,
      partId: partData.id,
    };
    handleAnswerChange({ questionId: answerData.questionId, answerData });
  }, [text]);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 180px)",
      }}
      className="flex flex-col"
    >
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Writing Task</h1>
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
