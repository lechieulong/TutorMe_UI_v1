/* eslint-disable react/prop-types */
const Question = ({ part, questionsByType }) => {
  const subjectType = Object.freeze({
    READING: 0,
    LISTENING: 1,
    WRITING: 2,
    SPEAKING: 3,
    OTHER: 4,
  });

  let contentToDisplay = "";

  switch (part) {
    case subjectType.READING:
      contentToDisplay = questionsByType["reading"]?.content;
      break;
    case subjectType.LISTENING:
      contentToDisplay = questionsByType["listening"]?.content;
      break;
    case subjectType.WRITING:
      contentToDisplay = questionsByType["writing"]?.content;
      break;
    case subjectType.SPEAKING:
      contentToDisplay = questionsByType["speaking"]?.content;
      break;
    case subjectType.OTHER:
      contentToDisplay = questionsByType["other"]?.content;
      break;
    default:
      contentToDisplay = "No content available";
      break;
  }

  return (
    <div className="p-5">
      <p>{contentToDisplay}</p>
    </div>
  );
};

export default Question;
