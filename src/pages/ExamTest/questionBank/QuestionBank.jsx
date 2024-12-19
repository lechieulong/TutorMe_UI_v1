import React, { useState, useEffect, useRef } from "react";
import QuestionFormBank from "./QuestionFormBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  importQuestion,
  getAllQuestionsById,
  deleteQuestion,
} from "../../../redux/testExam/TestSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const scrollRef = useRef(null);

  // Fetch questions function
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const questionsBank = await dispatch(
        getAllQuestionsById({ userId: user.id, page })
      ).unwrap();
      if (questionsBank && questionsBank.length > 0) {
        setQuestions((prev) => [...prev, ...questionsBank]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle infinite scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // First useEffect to fetch data on mount
  useEffect(() => {
    fetchQuestions();
  }, [page]);

  // Handle scroll event to load more questions
  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const addNewQuestion = () => {
    setEditQuestion(null);
    setIsModalOpen(true);
  };

  const updateQuestion = (question) => {
    setEditQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await dispatch(deleteQuestion(id));
      setQuestions(questions.filter((q) => q.id !== id));
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ["txt"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only .txt files are allowed!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await dispatch(importQuestion(formData));
      toast.success("Questions imported successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to import questions");
    }
  };

  const convertSkill = (skill) => {
    switch (skill) {
      case 0:
        return "Reading";
      case 1:
        return "Listening";
      case 2:
        return "Writing";
      case 3:
        return "Speaking";
      default:
        return "Unknown Skill";
    }
  };

  const handleDownloadTemplate = async () => {
    setLoading(true);
    try {
      const fileUrl =
        "https://thientvhde160268.blob.core.windows.net/questionbank/Resources.xlsx";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "Resources.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50">
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />

      {isModalOpen ? (
        <QuestionFormBank
          setIsModalOpen={setIsModalOpen}
          editQuestion={editQuestion}
        />
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={addNewQuestion}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Question
            </button>
            <button className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImportFile}
                />
                <span className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  <FontAwesomeIcon icon={faFileImport} className="mr-2" />
                  Import Questions
                </span>
              </label>
              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-2 text-sm border border-green-700 text-gray-500 rounded hover:bg-gray-200"
              >
                Download Template
              </button>
            </button>
          </div>

          <div
            className="grid grid-cols-1  gap-4 p-4 h-[500px] overflow-auto"
            ref={scrollRef}
          >
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all ease-in-out duration-300"
                >
                  <div className="text-sm text-gray-500 mb-3">
                    Question {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {convertSkill(question.skill)}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Question Name:</span>{" "}
                    {question.questionName || <i>No name provided</i>}
                  </p>

                  {question.skill != 2 && question.skill != 3 && (
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Question Type:</span>{" "}
                      {question.questionType}
                    </p>
                  )}

                  {question.skill != 2 && question.skill != 3 && (
                    <div className="text-sm text-gray-700 mb-4">
                      <span className="font-medium">Answers:</span>
                      {question.answers.map((answer, i) => (
                        <div key={answer.id} className="ml-4 mb-2">
                          <span className="font-bold text-gray-600">
                            {i + 1}.
                          </span>{" "}
                          {answer.answerText}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-3 items-center mt-4">
                    {((question.skill === 0 &&
                      (question.questionType === 1 ||
                        question.questionType === 2 ||
                        question.questionType === 3)) ||
                      (question.skill === 1 && question.questionType === 8) ||
                      question.questionType === 5 ||
                      question.skill === 2 ||
                      question.skill === 3) && (
                      <button
                        onClick={() => updateQuestion(question)}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 p-2 rounded-lg"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 p-2 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No questions available.
              </div>
            )}
            {loading && (
              <div className="col-span-full text-center text-green-600">
                Loading...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
