import React from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure

const AnswerView = ({ partData, currentSkillKey, handleAnswerChange }) => {
  if (!partData) return <div>No data available</div>;
  console.log("currentSkillKey", currentSkillKey);

  // This function will handle the answer change, capturing skill, part, questionId, and answerText
  const handleChangeWrap = (e, skill, partId, questionId, index) => {
    const answerText = e.target.value;
    const answerData = {
      skill, // e.g., "listening" or "writing"
      part: partId, // part's unique identifier
      questionId, // question's unique identifier
      answerText, // the text input by the user
      answerId: "",
    };

    handleAnswerChange({ index, answerData });
  };

  return (
    <form>
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
        </div>
      )}
      {(currentSkillKey === "listening" || currentSkillKey === "writing") &&
        partData.image && (
          <div className="my-4">
            <img
              src={partData.image}
              alt="Section Visual"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      {partData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <p>{section.sectionGuide}</p>
          {section.questions.map((question, index) => (
            <div key={question.questionId}>
              <p>{question.questionName}</p>
              <input
                type="text"
                onChange={(e) =>
                  handleChangeWrap(
                    e,
                    currentSkillKey,
                    partData.partId,
                    question.questionId,
                    index
                  )
                }
                placeholder="Your answer"
              />
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default AnswerView;
