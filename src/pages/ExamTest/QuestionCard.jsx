import React, { useState } from "react";

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    answers: [],
  },
  {
    id: 2,
    questionText: "Explain the process of photosynthesis.",
    answers: [],
  },
  {
    id: 3,
    questionText: "What is the boiling point of water?",
    answers: [],
  },
];

const QuestionCard = ({
  onClose,
  onSelectQuestions,
  disabledQuestions = [],
}) => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Toggle selection of questions
  const toggleQuestionSelection = (question) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(question)
        ? prevSelected.filter((q) => q.id !== question.id)
        : [...prevSelected, question]
    );
  };

  const handleAddQuestions = () => {
    // Add the flag to indicate the questions are from the question bank
    const questionsWithFlag = selectedQuestions.map((question) => ({
      ...question,
      isFromQuestionBank: true,
    }));

    onSelectQuestions(questionsWithFlag); // Call to add selected questions
    setSelectedQuestions([]); // Clear selected questions
    onClose(); // Close the question card
  };

  return (
    <div className="right-0 bottom-0 bg-white z-10 p-4">
      <h2 className="text-lg font-bold mb-4">Select Questions</h2>
      <button onClick={onClose} className="bg-red-500 text-white p-2 mb-4">
        Close
      </button>
      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => {
          const isAlreadySelected = disabledQuestions.some(
            (q) => q.questionName === question.questionText // Ensure the comparison is correct
          );
          const isSelectedInCurrent = selectedQuestions.some(
            (q) => q.id === question.id
          );
          const isDisabled = isAlreadySelected || isSelectedInCurrent;

          return (
            <div
              key={question.id}
              className={`border p-4 rounded flex justify-between items-center ${
                isDisabled ? "opacity-50" : ""
              }`}
            >
              <span>{question.questionText}</span>
              <button
                type="button"
                onClick={() => toggleQuestionSelection(question)}
                className={`p-2 rounded ${
                  isSelectedInCurrent ? "bg-green-500" : "bg-gray-200"
                }`}
                disabled={isDisabled} // Correctly disable the button
              >
                {isAlreadySelected
                  ? "Already Added"
                  : isSelectedInCurrent
                  ? "Selected"
                  : "Select"}
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={handleAddQuestions}
        className="bg-green-500 text-white p-2 rounded mt-4"
        disabled={selectedQuestions.length === 0}
      >
        Add Selected Questions
      </button>
    </div>
  );
};

export default QuestionCard;
