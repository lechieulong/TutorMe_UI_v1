/* eslint-disable react/prop-types */
import { useState } from "react";

const NavigationPart = ({ partData, handlePartClick, handleQuestionClick }) => {
  const [openPart, setOpenPart] = useState(null);

  const handleAccordionClick = (partNumber) => {
    if (openPart === partNumber) {
      setOpenPart(null); // Close if clicked again
    } else {
      setOpenPart(partNumber); // Open the clicked part
      handlePartClick(partNumber);
    }
  };

  const handleQuestionClickWrapper = (event, questionId) => {
    event.stopPropagation();
    handleQuestionClick(questionId);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-1">
      <div className="flex gap-3">
        {partData.map((part, index) => {
          const partName = part.name;
          const questions = part.navigations;

          return (
            <div
              key={index}
              className={`${
                openPart === index
                  ? "active flex-[4_4_0%] border-2 border-green-300 "
                  : "flex-1 "
              } p-2 border-2 flex justify-between gap-2 cursor-pointer rounded-2xl`}
              onClick={() => handleAccordionClick(index)}
            >
              <div
                className={`${
                  openPart === index ? "w-28" : ""
                } font-extrabold inline-flex items-center text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              >
                {partName}
              </div>
              <ul
                className={`${
                  openPart === index ? "flex-[4_4_0%]" : "hidden"
                } flex h-full justify-center text-center items-center gap-4`}
              >
                {questions.map((questionId, questionIndex) => (
                  <li
                    className="border-2 text-sm border-slate-200 w-7 text-black rounded-full cursor-pointer"
                    key={questionId}
                    onClick={(event) =>
                      handleQuestionClickWrapper(event, questionId)
                    }
                  >
                    {questionIndex + 1}
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
