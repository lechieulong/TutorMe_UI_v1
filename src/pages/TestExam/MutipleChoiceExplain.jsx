const MutipleChoiceExplain = ({ question, renderLetter }) => {
  // Get the correct answers from the question
  const correctAnswers = question.answers.filter(
    (answer) => answer.isCorrect === 1
  );

  // Check if the user's selected answers match the correct answers exactly
  const userSelectedAnswerIds = question.userAnswers.map(
    (userAnswer) => userAnswer.answerId
  );

  const correctAnswerIds = correctAnswers.map((answer) => answer.id);

  // Fully correct if:
  // 1. User selected all correct answers (correctAnswerIds are in userSelectedAnswerIds).
  // 2. No extra answers are selected (userSelectedAnswerIds are in correctAnswerIds).
  const isFullyCorrect =
    userSelectedAnswerIds.length === correctAnswerIds.length &&
    correctAnswerIds.every((id) => userSelectedAnswerIds.includes(id)) &&
    userSelectedAnswerIds.every((id) => correctAnswerIds.includes(id));

  return (
    <div>
      <div className="flex flex-col gap-2">
        {question.answers.map((answer, index) => {
          // Check if the user selected this answer
          const userAnswer = question.userAnswers.find(
            (userAns) => userAns.answerId === answer.id
          );

          // Determine border style for each answer
          const borderStyle = userAnswer
            ? answer.isCorrect === 1
              ? "border-green-600"
              : "border-red-600"
            : "border-gray-200";

          return (
            <div
              key={answer.id}
              className={`flex gap-2 justify-start border-2 rounded p-2 ${borderStyle}`}
            >
              <p className="font-semibold">{renderLetter(index + 1)}</p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!userAnswer} // Checked if the user selected this answer
                  disabled
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-800">{answer.answerText}</span>
              </label>
            </div>
          );
        })}
        {/* Display the overall result */}
        <div className="mt-4">
          <p
            className={`text-lg font-bold ${
              isFullyCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isFullyCorrect
              ? "Your answer is fully correct!"
              : "Your answer is incomplete or incorrect."}
          </p>
        </div>
      </div>

      <p className="mt-3 mb-3 text-2xl">Explains</p>
      <div dangerouslySetInnerHTML={{ __html: question.explain }} />
    </div>
  );
};

export default MutipleChoiceExplain;
