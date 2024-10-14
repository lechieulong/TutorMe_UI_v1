import React, { useState, useEffect } from "react";
import QuestionFormBank from "./QuestionFormBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
const questionsMock = [
  {
    id: 1,
    questionName: "What is the capital of France?",
    questionType: 2, // Multiple choice
    skill: 0, // Reading
    answers: [
      {
        answerText: "Berlin",
        isCorrect: 0,
      },
      {
        answerText: "Madrid",
        isCorrect: 0,
      },
      {
        answerText: "Paris",
        isCorrect: 1, // This is the correct answer
      },
      {
        answerText: "Rome",
        isCorrect: 0,
      },
    ],
  },
  {
    id: 2,
    questionName: "Fill in the blank: The sun rises in the ____.",
    questionType: 1, // Fill in the blank
    skill: 0, // Reading
    answers: [
      {
        answerText: "east",
        isCorrect: 1, // Correct
      },
    ],
  },
  {
    id: 3,
    questionName: "Which planet is known as the Red Planet?",
    questionType: 2, // Multiple choice
    skill: 0, // Reading
    answers: [
      {
        answerText: "Earth",
        isCorrect: 0,
      },
      {
        answerText: "Mars",
        isCorrect: 1, // Correct
      },
      {
        answerText: "Jupiter",
        isCorrect: 0,
      },
      {
        answerText: "Venus",
        isCorrect: 0,
      },
    ],
  },
  {
    id: 4,
    questionName: "True or false: Water boils at 100°C.",
    questionType: 4, // True/False
    skill: 0, // Reading
    answers: [
      {
        answerText: "True",
        isCorrect: 1, // Correct
      },
      {
        answerText: "False",
        isCorrect: 0,
      },
    ],
  },
  {
    id: 5,
    questionName: "Match the following countries to their capitals.",
    questionType: 0, // Heading Matching
    skill: 0, // Reading
    answers: [
      {
        answerText: "Germany - Berlin",
        isCorrect: 1, // Correct
      },
      {
        answerText: "Spain - Madrid",
        isCorrect: 1, // Correct
      },
      {
        answerText: "France - Paris",
        isCorrect: 1, // Correct
      },
      {
        answerText: "Italy - Rome",
        isCorrect: 1, // Correct
      },
    ],
  },
  {
    id: 6,
    questionName: "Listen to the audio and choose the correct statement.",
    questionType: 2, // Multiple choice
    skill: 1, // Listening
    answers: [
      {
        answerText: "The speaker is talking about space travel.",
        isCorrect: 0,
      },
      {
        answerText: "The speaker is describing a holiday trip.",
        isCorrect: 1, // Correct
      },
      {
        answerText: "The speaker is talking about cooking.",
        isCorrect: 0,
      },
    ],
  },
  {
    id: 7,
    questionName: "Write a short paragraph about your favorite hobby.",
    questionType: 1, // Fill in the blank / Open-ended
    skill: 2, // Writing
    answers: [
      {
        answerText: "User-generated response",
        isCorrect: null, // No correct answer for open-ended questions
      },
    ],
  },
  {
    id: 8,
    questionName:
      "You are on the phone with a customer. Respond to their question.",
    questionType: 1, // Open-ended
    skill: 3, // Speaking
    answers: [
      {
        answerText: "User-generated response",
        isCorrect: null, // No correct answer for speaking tasks
      },
    ],
  },
];

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null); // Hold the question being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Mocked questions
        setQuestions(questionsMock);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const addNewQuestion = () => {
    setEditQuestion(null); // Ensure no question is being edited (new question mode)
    setIsModalOpen(true); // Open the modal
  };

  const updateQuestion = (question) => {
    setEditQuestion(question); // Set the selected question for editing
    setIsModalOpen(true); // Open the modal for editing
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, { method: "DELETE" });
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const parsedQuestions = JSON.parse(content);
      setQuestions(
        parsedQuestions.map((q) => ({ ...q, id: Date.now() + Math.random() }))
      );
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <h1>Question Bank</h1>
      <div className="mb-4 flex justify-end items-center space-x-2">
        <button
          onClick={addNewQuestion}
          className="flex items-center text-[12px] bg-blue-500 text-white rounded"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Question
        </button>
        <label className="flex items-center cursor-pointer">
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportFile}
          />
          <span className="flex items-center px-4 py-2 bg-green-500 text-white rounded">
            <FontAwesomeIcon icon={faFileImport} className="mr-2" />
            Import Questions
          </span>
        </label>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Question</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="border px-4 py-2">{question.questionName}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => updateQuestion(question)}>
                  <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                </button>
                <button onClick={() => deleteQuestion(question.id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <QuestionFormBank
          setIsModalOpen={setIsModalOpen}
          question={editQuestion}
        />
      )}
    </div>
  );
};

export default QuestionBank;
