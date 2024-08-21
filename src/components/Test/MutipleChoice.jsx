const MultipleChoice = ({ question, onAnswerChange }) => {
  const handleOptionChange = (id) => {
    onAnswerChange(id);
  };

  return (
    <div className="p-5">
      <p className="font-semibold">{question.question}</p>
      <div className="mt-2">
        {question.answers.map((answer) => (
          <div key={answer.id}>
            <input
              type="radio"
              id={`option-${answer.id}`}
              name={`question-${question.id}`}
              value={answer.id}
              onChange={() => handleOptionChange(answer.id)}
            />
            <label htmlFor={`option-${answer.id}`} className="ml-2">
              {answer.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultipleChoice;
