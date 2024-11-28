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
  downloadTemplate,
} from "../../../redux/testExam/TestSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]); // Store questions
  const [editQuestion, setEditQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Whether more data is available
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const scrollRef = useRef(null); // Ref for the scroll container
  console.log(user);

  // Fetch Questions
  const fetchQuestions = async () => {
    if (!hasMore || loading) return; // Prevent unnecessary fetches

    setLoading(true);
    try {
      console.log(user.id);

      const questionsBank = await dispatch(
        getAllQuestionsById({ userId: user.id, page })
      ).unwrap();
      if (questionsBank && questionsBank.length > 0) {
        setQuestions((prevQuestions) => [...prevQuestions, ...questionsBank]);
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  // Handle Scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setPage((prevPage) => prevPage + 1); // Increment page
    }
  };

  // Effect to fetch questions when page changes
  useEffect(() => {
    fetchQuestions();
  }, [page]);

  // Attach scroll event listener
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
    setEditQuestion(null); // Reset edit question
    setIsModalOpen(true); // Open modal
  };

  const updateQuestion = (question) => {
    setEditQuestion(question); // Set selected question
    setIsModalOpen(true); // Open modal
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await dispatch(deleteQuestion(id)); // Dispatch delete action
      setQuestions(questions.filter((question) => question.id !== id)); // Update state
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question");
    }
  };

  // const handleDownloadTemplate = async () => {
  //   setLoading(true);
  //   try {
  //     const resultAction = await dispatch(downloadTemplate());
  //     if (resultAction.payload && resultAction.payload.fileUrl) {
  //       const fileUrl = resultAction.payload.fileUrl;
  //       const link = document.createElement("a");
  //       link.href = fileUrl;
  //       link.download = "QuestionTemplate.xlsx";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } else {
  //       console.error(
  //         "Download failed:",
  //         resultAction.error?.message || "No payload"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error downloading template:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await dispatch(importQuestion(formData));
      toast.success("Questions imported successfully");
    } catch (error) {
      console.error("Failed to import questions:", error);
      toast.error("Failed to import questions");
    }
  };

  return (
    <div>
      <div className="mb-2 flex justify-between items-center space-x-2">
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
              accept=".json,.xlsx"
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
            className="bg-red-50 border text-sm border-gray-300"
          >
            Download Template
          </button>
        </div>
      </div>
      <div
        className="h-[450px] overflow-auto"
        ref={scrollRef} // Attach scroll ref
      >
        <table className="min-w-full border border-gray-200">
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
                  <td className="border px-4 py-2">{question.questionName}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button onClick={() => updateQuestion(question)}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500"
                      />
                    </button>
                    <button onClick={() => handleDeleteQuestion(question.id)}>
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
        {loading && <div className="text-center my-2">Loading...</div>}
      </div>
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
