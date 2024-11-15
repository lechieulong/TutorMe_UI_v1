import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsBank } from "../../redux/testExam/TestSlice";
import { selectQuestions } from "../../redux/testExam/TestSlice"; // Import the selector
import { getUser } from "../../service/GetUser";
import { toast } from "react-toastify";

const QuestionCard = ({
  onClose,
  onSelectQuestions,
  disabledQuestions = [],
}) => {
  const questionsSelected = useSelector(selectQuestions); // Get selected questions from the Redux store
  const [questions, setQuestions] = useState([]); // Initialize as an empty array
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const dispatch = useDispatch();

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const user = await getUser();
        const fetchedQuestions = await dispatch(
          getQuestionsBank({ userId: user.sub })
        ).unwrap();

        console.log("fetchedQuestions", fetchedQuestions);
        console.log("questionsSelected", questionsSelected);

        // Update state with fetched questions
        setQuestions(fetchedQuestions); // Set all fetched questions
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast.error("Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, [dispatch]); // Removed questionsSelected from dependency array

  const toggleQuestionSelection = (question) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(question)
        ? prevSelected.filter((q) => q.id !== question.id)
        : [...prevSelected, question]
    );
  };

  const handleAddQuestions = () => {
    const questionsWithFlag = selectedQuestions.map((question) => ({
      ...question,
      isFromQuestionBank: true,
    }));

    onSelectQuestions(questionsWithFlag); // Call to add selected questions
    setSelectedQuestions([]); // Clear selected questions
    onClose(); // Close the question card
  };

  return (
    <div className="right-0 bottom-0 bg-white z-10 h-3/4 p-4 w-8/12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4"> Questions Bank</h2>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mb-4">
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => {
          const isAlreadySelected = disabledQuestions.some(
            (q) => q.questionName === question.questionName // Ensure the comparison is correct
          );
          const isSelectedInCurrent = selectedQuestions.some(
            (q) => q.id === question.id
          );
          const isDisabled =
            isAlreadySelected ||
            isSelectedInCurrent ||
            questionsSelected.some((q) => q.id === question.id); // Disable if it's already selected in the Redux store

          return (
            <div
              key={question.id}
              className={`border p-4 rounded flex justify-between items-center ${
                isDisabled ? "opacity-50" : ""
              }`}
            >
              <span>{question.questionName}</span> {/* Display questionName */}
              <span>{question.questionType}</span> {/* Display questionType */}
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
      {questions.length > 0 && (
        <button
          type="button"
          onClick={handleAddQuestions}
          className="bg-green-500 text-white p-2 rounded mt-4"
          disabled={selectedQuestions.length === 0}
        >
          Add Selected Questions
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
