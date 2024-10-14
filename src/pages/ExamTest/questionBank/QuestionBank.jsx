import React, { useState, useEffect } from "react";
import QuestionFormBank from "./QuestionFormBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import questionsMock from "../../../data/questionsMock";
import { useDispatch } from "react-redux";
import { importQuestion } from "../../../redux/testExam/TestSlice";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

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

  const handleImportFile = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file); // Thêm tệp vào form data

    try {
      // Gửi tệp đến backend
      await dispatch(importQuestion(formData));
      toast.success("Set schedule successful");
    } catch (error) {
      console.error("Failed to import questions:", error);
    }
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
            accept=".json,.xlsx" // Accept both JSON and Excel files
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
