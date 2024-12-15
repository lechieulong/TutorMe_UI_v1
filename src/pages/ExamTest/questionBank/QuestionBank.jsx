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
import { toast } from "react-toastify";
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
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      await dispatch(importQuestion(formData));
      window.location.reload();
      console.log("hahah");

      toast.success("Questions imported successfully");
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

  console.log(questions);

  return (
    <div className="p-4 bg-gray-50  ">
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
            className="h-[600px] overflow-auto bg-white shadow rounded-lg"
            ref={scrollRef}
          >
            <table className="w-full border-collapse">
              <thead className="bg-green-600 ">
                <tr>
                  <th className="px-4 py-2 text-left">No </th>

                  <th className="px-4 py-2 text-left ">Skill name </th>
                  <th className="px-4 py-2 text-left">Question name</th>
                  <th className="px-4 py-2 text-left">Question type</th>
                  <th className="px-4 py-2 text-left">Answers</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <tr
                      key={question.id}
                      className={`${
                        index % 2 === 0 ? "bg-lightGreen" : "bg-white"
                      } `}
                    >
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">
                        {convertSkill(question.skill)}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {question.questionName || <i>No name provided</i>}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {question.questionType}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {question.answers.map((answer, i) => (
                          <div key={answer.id} className="text-gray-700">
                            {i + 1}. {answer.answerText}
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 border-b flex space-x-2">
                        {((question.skill === 0 &&
                          (question.questionType === 1 ||
                            question.questionType === 2 ||
                            question.questionType === 3)) ||
                          (question.skill === 1 &&
                            question.questionType === 8) ||
                          question.questionType === 5 ||
                          question.skill === 2 ||
                          question.skill === 3) && (
                          <button onClick={() => updateQuestion(question)}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-blue-600 hover:text-blue-800"
                            />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-600 hover:text-red-800"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No questions available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {loading && (
              <div className="text-center py-4 text-green-600">Loading...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
