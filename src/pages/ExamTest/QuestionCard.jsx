import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsBank } from "../../redux/testExam/TestSlice";
import { selectQuestions } from "../../redux/testExam/TestSlice";
import { toast } from "react-toastify";

const QuestionCard = ({
  onClose,
  onSelectQuestions,
  disabledQuestions = [],
  sectionType,
  skill,
}) => {
  const questionsSelected = useSelector(selectQuestions);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const fetchQuestions = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const fetchedQuestions = await dispatch(
        getQuestionsBank({ userId: user.id, skill, sectionType, page })
      ).unwrap();

      if (fetchedQuestions.length > 0) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...fetchedQuestions,
        ]);
        setPage((prevPage) => prevPage + 1); // Increment page after each fetch
      } else {
        setHasMore(false); // No more questions to load
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to fetch questions");
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, user.sub, sectionType, page]);

  useEffect(() => {
    fetchQuestions(); // Fetch initial questions on mount
  }, [fetchQuestions]);

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

  // Handle scroll event to load more questions when scrolled to the bottom
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      fetchQuestions(); // Load more questions when scrolled to the bottom
    }
  };

  return (
    <div className="right-0 bottom-0 bg-white z-10 h-3/4 p-4 w-8/12">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4">Questions Bank</h2>
        <button onClick={onClose} className="bg-red-500 text-white p-2 mb-4">
          Close
        </button>
      </div>

      <div
        className="grid grid-cols-1 gap-4 h-[380px] overflow-auto"
        onScroll={handleScroll} // Add the scroll event listener
      >
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
              <div>
                <p>
                  <span className="font-bold">Question Name:</span>{" "}
                  {question.questionName}
                </p>
                <p className="font-bold">Answers</p>
                {question.answers.map((a) => (
                  <p>{a.answerText}</p>
                ))}
              </div>
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

        {isLoading && <p className="text-center">Loading more questions...</p>}
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
