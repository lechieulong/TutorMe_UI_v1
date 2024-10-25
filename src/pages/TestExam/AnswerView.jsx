import React from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure
import Writing from "../../components/Test/Part/Writing";
import Speaking from "../../components/Test/Part/Speaking";

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

  const renderInputBasedOnSectionType = (sectionType, question) => {
    switch (sectionType) {
      case 1: // For example: Multiple Choice Questions
        return (
          <select
            onChange={(e) =>
              handleChangeWrap(e, currentSkillKey, partData.id, question.id)
            }
          >
            {question.answers.map((answer) => (
              <option key={answer.id} value={answer.answerText}>
                {answer.answerText}
              </option>
            ))}
          </select>
        );
      case 2: // Sentence Completion
      case 8: // Short-answer Questions
        return (
          <input
            type="text"
            placeholder="Your answer"
            onChange={(e) =>
              handleChangeWrap(e, currentSkillKey, partData.id, question.id)
            }
          />
        );
      case 3: // True/False/Not Given
        return (
          <>
            <label>
              <input
                type="radio"
                name={`question_${question.id}`}
                value="True"
                onChange={(e) =>
                  handleChangeWrap(e, currentSkillKey, partData.id, question.id)
                }
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name={`question_${question.id}`}
                value="False"
                onChange={(e) =>
                  handleChangeWrap(e, currentSkillKey, partData.id, question.id)
                }
              />
              False
            </label>
            <label>
              <input
                type="radio"
                name={`question_${question.id}`}
                value="Not Given"
                onChange={(e) =>
                  handleChangeWrap(e, currentSkillKey, partData.id, question.id)
                }
              />
              Not Given
            </label>
          </>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Your answer"
            onChange={(e) =>
              handleChangeWrap(e, currentSkillKey, partData.id, question.id)
            }
          />
        );
    }
  };

  return (
    <form>
      {currentSkillKey === "listening" && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
        </div>
      )}

      {(currentSkillKey === "reading" || currentSkillKey === "listening") && (
        <>
          {partData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p>{section.sectionGuide}</p>
              {section.sectionType === 4 && (
                <div>
                  {section.questions.map((question, index) => (
                    <div key={index}>
                      <p>{question.questionName}</p>
                      {renderInputBasedOnSectionType(
                        section.sectionType,
                        question
                      )}
                    </div>
                  ))}
                </div>
              )}
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
