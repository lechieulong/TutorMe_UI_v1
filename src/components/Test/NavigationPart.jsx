/* eslint-disable react/prop-types */
import { useState } from "react";

const NavigationPart = ({ partData, handlePartClick, handleQuestionClick }) => {
  const [openPart, setOpenPart] = useState(0);

  const handleAccordionClick = (partNumber) => {
    if (openPart === partNumber) {
      setOpenPart(0);
    } else {
      setOpenPart(partNumber);
      handlePartClick(partNumber); // Call this to handle part selection
    }
  };

  const handleQuestionClickWrapper = (event, questionId) => {
    event.stopPropagation();
    handleQuestionClick(questionId); // Call this to handle question selection
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex gap-3">
        {partData.map((part, index) => {
          const partName = part.questionName || `Part ${index + 1}`; // Use questionName or fallback
          const questions = part.sections.flatMap(
            (section) => section.questions
          ); // Flatten questions from sections

          return (
            <div
              key={index}
              className={`${
                openPart === index
                  ? "active flex-[4_4_0%] border-green-700 p-2"
                  : "flex-1 border-gray-300"
              } p-2 border text-white flex justify-between gap-2 cursor-pointer rounded-2xl`}
              onClick={() => handleAccordionClick(index)}
            >
              <div
                className={`${
                  openPart === index ? "w-40" : ""
                } font-extrabold inline-flex items-center text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              >
                {partName}
              </div>
              <ul
                className={`${
                  openPart === index ? "flex-[4_4_0%]" : "hidden"
                } flex h-full justify-center text-center items-center gap-4`}
              >
                {questions.map((question, questionIndex) => (
                  <li
                    className="border text-sm border-green-600 w-6 text-black rounded-full cursor-pointer"
                    key={question.id} // Use a unique identifier, such as question.id
                    onClick={
                      (event) => handleQuestionClickWrapper(event, question.id) // Pass question.id as identifier
                    }
                  >
                    {questionIndex + 1}{" "}
                    {/* Display the question index (1-based) */}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPart;
