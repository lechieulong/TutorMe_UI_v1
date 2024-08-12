/* eslint-disable react/prop-types */
import { useState } from "react";

const NavigationPart = ({
  questions,
  handlePartClick,
  handleQuestionClick,
}) => {
  const [openPart, setOpenPart] = useState(0);

  const handleAccordionClick = (partNumber) => {
    if (openPart === partNumber) {
      setOpenPart(null);
    } else {
      setOpenPart(partNumber);
      handlePartClick(partNumber);
    }
  };

  const handleQuestionClickWrapper = (event, questionId) => {
    event.stopPropagation();
    handleQuestionClick(questionId);
  };

  const parts = {
    reading: [],
    listening: [],
    writing: [],
    speaking: [],
    other: [],
  };

  questions.forEach((question) => {
    if (parts[question.type]) {
      parts[question.type].push(question);
    }
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 p-1">
      <div className="flex gap-3">
        {Object.keys(parts).map(
          (partType, index) =>
            parts[partType].length > 0 && (
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
                  {`Part ${partType}`}
                </div>
                <ul
                  className={`${
                    openPart === index ? "flex-[4_4_0%]" : "hidden"
                  } flex h-full justify-center text-center items-center gap-4`}
                >
                  {parts[partType].map((question, index) => (
                    <li
                      className="border-2 text-sm border-slate-200 w-7 text-black rounded-full cursor-pointer"
                      key={question.id}
                      onClick={(event) =>
                        handleQuestionClickWrapper(event, question.id)
                      }
                    >
                      {index}
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default NavigationPart;
