import React from "react";
import AudioPlayer from "./AudioPlayer"; // Adjust the import based on your file structure

const AnswerView = ({ partData }) => {
  // Ensure partData is defined before accessing its properties
  if (!partData) return <div>No data available</div>;

  return (
    <div>
      {/* Display the content text */}
      <div dangerouslySetInnerHTML={{ __html: partData.contentText }} />

      {/* Check if there is an audio file and display the audio player */}
      {partData.audio && (
        <div className="my-4">
          <AudioPlayer src={partData.audio} />
        </div>
      )}

      {/* Check if there is an image and display it */}
      {partData.image && (
        <div className="my-4">
          <img
            src={partData.image}
            alt="Section Visual"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

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
