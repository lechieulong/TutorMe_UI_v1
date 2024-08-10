import React, { useState } from "react";

const NavigationPart = ({ questions, handlePartClick, handleQuestionClick, isEnglish }) => {
  const [openPart, setOpenPart] = useState(1);

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

  const parts = [
    questions.slice(0, 15),
    questions.slice(15, 30),
    questions.slice(30, 45),
    questions.slice(45, 60)
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 p-1">
      <div className="flex gap-3 ">
        {parts.map((part, index) => (
          part.length > 0 && (
            <div
              key={index}
              className={`${openPart === index + 1 ? 'active flex-[4_4_0%] border-2 border-green-300 ' : 'flex-1 '} p-2 border-2 flex justify-between gap-2 cursor-pointer rounded-2xl`}
              onClick={() => handleAccordionClick(index + 1)}
          >
              <div
                className={`${openPart === index + 1 ? '  w-28' : ''}  font-extrabold inline-flex items-center   text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
             
              >
               {`Part ${index + 1}`}
              </div>
              <ul className={`${openPart === index + 1 ? ' flex-[4_4_0%]' : 'hidden'} flex h-full justify-center text-center items-center gap-4`}>
                {part.map((question) => (
                  <li
                    className="border-2 text-sm border-slate-200 w-7 text-black rounded-full cursor-pointer"
                    key={question.id}
                        onClick={(event) => handleQuestionClickWrapper(event, question.id)}
                  >
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default NavigationPart;
