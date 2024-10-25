import React from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure
import Writing from "../../components/Test/Part/Writing";

const AnswerView = ({ partData, currentSkillKey, handleAnswerChange }) => {
  if (!partData) return <div>No data available</div>;

  const handleChangeWrap = (e, skill, partId, questionId) => {
    const answerText = e.target.value;
    const answerData = {
      skill,
      part: partId,
      questionId,
      answerText,
      answerId: "",
    };

    handleAnswerChange({ questionId, answerData }); // Pass questionId as a unique identifier
  };

  return (
    <form>
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
        </div>
      )}
      {currentSkillKey === "listening" && partData.image && (
        <div className="my-4">
          <img
            src={partData.image}
            alt="Section Visual"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      {currentSkillKey !== "writing" && (
        <>
          {partData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p>{section.sectionGuide}</p>
              {section.questions.map((question, index) => (
                <div key={index}>
                  <p>{question.questionName}</p>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChangeWrap(
                        e,
                        currentSkillKey,
                        partData.partId,
                        question.id
                      )
                    }
                    placeholder="Your answer"
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {currentSkillKey === "writing" && (
        <Writing
          partData={partData}
          currentSkillKey={currentSkillKey}
          handleAnswerChange={handleAnswerChange}
        />
      )}
    </form>
  );
};

export default AnswerView;
