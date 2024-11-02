/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const NavigationPart = ({
  partDatas,
  handlePartClick,
  handleQuestionClick,
  userAnswers, // Add userAnswers prop
}) => {
  const [openPart, setOpenPart] = useState(0);

  // Reset openPart to 0 whenever partDatas changes
  useEffect(() => {
    setOpenPart(0);
  }, [partDatas]);

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
    handleQuestionClick(questionId);
  };

  return (
    <div className="bottom-0 left-0 right-0 ">
      <div className="flex gap-3">
        {partDatas.map((part, index) => {
          const partName = `Part ${index + 1}`;
          const questions = part.sections.flatMap(
            (section) => section.questions
          );

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
                {questions.map((question, questionIndex) => {
                  const isAnswered =
                    userAnswers.hasOwnProperty(question.id) &&
                    userAnswers[question.id] !== undefined; // Check if answered and not undefined

                  return (
                    <li
                      className={`flex items-center justify-center gap-1 border text-sm border-green-600 w-6p p-2 h-6 text-black rounded-full cursor-pointer ${
                        isAnswered ? "bg-green-200" : "bg-transparent"
                      }`} // Change background if answered
                      key={questionIndex} // Use a unique identifier, such as question.id
                      onClick={(event) =>
                        handleQuestionClickWrapper(event, question.id)
                      }
                    >
                      <span>{questionIndex + 1}</span>
                      {isAnswered && <span>✔️</span>}
                      {/* Optional: Add a checkmark */}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPart;
