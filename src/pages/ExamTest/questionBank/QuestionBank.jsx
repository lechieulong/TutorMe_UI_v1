import React, { useState, useEffect } from "react";
import QuestionFormBank from "./QuestionFormBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  importQuestion,
  getQuestionsBank,
  deleteQuestion,
  downloadTemplate,
} from "../../../redux/testExam/TestSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "../../../service/GetUser";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]); // Initializing as an array
  const [editQuestion, setEditQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetch
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Start loading
      try {
        const user = await getUser(); // Assuming this returns user details
        const questionsBank = await dispatch(
          getQuestionsBank({ userId: user.sub })
        ).unwrap(); // Unwrap the response
        setQuestions(questionsBank || []); // Set the questions array or an empty array if none
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast.error("Failed to fetch questions");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchQuestions();
  }, [dispatch]);

  const addNewQuestion = () => {
    setEditQuestion(null); // Ensure no question is being edited (new question mode)
    setIsModalOpen(true); // Open the modal
  };

  const updateQuestion = (question) => {
    setEditQuestion(question); // Set the selected question for editing
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await dispatch(deleteQuestion(id)); // Dispatching the action
      setQuestions(questions.filter((question) => question.id !== id)); // Updating state
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question");
    }
  };

  const handleDownloadTemplate = async () => {
    setLoading(true);
    try {
      const resultAction = await dispatch(downloadTemplate());
      if (resultAction.payload && resultAction.payload.fileUrl) {
        const fileUrl = resultAction.payload.fileUrl;
        console.log("File URL:", fileUrl);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "QuestionTemplate.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error(
          "Download failed:",
          resultAction.error?.message || "No payload"
        );
      }
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file); // Add file to form data

    try {
      dispatch(importQuestion(formData));
      toast.success("Questions imported successfully");
    } catch (error) {
      console.error("Failed to import questions:", error);
      toast.error("Failed to import questions");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center my-4">
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div className=" mb-2 flex justify-between items-center space-x-2">
            <button
              onClick={addNewQuestion}
              className="flex items-center text-[12px] p-2 bg-accentGreen text-customText rounded"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Question
            </button>
            <div className="flex gap-2">
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

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className=" bg-red-50 border text-sm border-gray-300"
              >
                Download Template
              </button>
            </div>
          </div>{" "}
          <div className="h-[450px] overflow-auto">
            {" "}
            {/* Added overflow-auto here */}
            <table className="min-w-full   border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Question</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(questions) && questions.length > 0 ? (
                  questions.map((question) => (
                    <tr key={question.id}>
                      <td className="border px-4 py-2">
                        {question.questionName}
                      </td>
                      <td className="border px-4 py-2 flex space-x-2">
                        <button onClick={() => updateQuestion(question)}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2" colSpan="2">
                      No questions available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <QuestionFormBank
              setIsModalOpen={setIsModalOpen}
              question={editQuestion}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
