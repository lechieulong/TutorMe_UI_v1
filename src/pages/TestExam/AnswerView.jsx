import React from "react";
import { useDispatch } from "react-redux";

const AnswerView = ({ partData }) => {
  const dispatch = useDispatch();

  // Ensure partData is defined before accessing its properties
  if (!partData) return <div>No data available</div>;

  return (
    <div>
      {/* Display the content text */}
      <p>{partData.contentText}</p>

      {/* Render sections */}
      {partData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <p>{section.sectionGuide}</p>

          {/* Render questions within each section */}
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <p>{question.questionName}</p>

              {/* Render answers within each question */}
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <p>{answer.answerText}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnswerView;
