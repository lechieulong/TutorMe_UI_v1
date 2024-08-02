import React, { useState } from "react";

const NavigationPart = ({ questions, handlePartClick, handleQuestionClick , isEnglish }) => {
  const [openPart, setOpenPart] = useState(1); 

  const handleAccordionClick = (partNumber) => {
    if (openPart === partNumber) {
      setOpenPart(null);
    } else {
      setOpenPart(partNumber);
      handlePartClick(partNumber); 
    }
  };

  const part1 = questions.slice(0, 15);
  const part2 = questions.slice(15, 30);
  const part3 = questions.slice(30,45 );
  const part4 = questions.slice(45, 46);


  return (
    <div className="absolute bottom-0 left-0 right-0  p-1">
      <div className="flex hs-accordion-group w-full gap-3">
        {part1.length > 0 && (
          <div
            className={`hs-accordion ${openPart === 1 ? 'active flex-[4_4_0%] border-2 border-green-300' : 'flex-1' }  border-2  flex justify-between cursor-pointer rounded-2xl `}
            id="hs-basic-heading-one" 
          >
            <div
              className={`hs-accordion-toggle ${openPart === 1 ? 'hs-accordion-active:text-blue-600 w-24 ' : ''}   ml-7  font-extrabold  inline-flex items-center gap-x-3  w-full  text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              aria-expanded={openPart === 1}
              aria-controls="hs-basic-collapse-one"
              onClick={() => handleAccordionClick(1)}
            >
              Part 1
            </div>
            <div
              id="hs-basic-collapse-one"
              className={`hs-accordion-content ${openPart === 1 ? 'block flex-[4_4_0%]  ' : 'hidden'}  overflow-hidden transition-[height] duration-300 `}
              role="region"
              aria-labelledby="hs-basic-heading-one"
              style={{ height: openPart === 1 ? 'auto' : '0px' }}
            >
              <ul className="flex    h-full justify-center  text-center items-center px-2 gap-4">
                {part1.map((question) => (
                  <li
                    className=" border-2 border-slate-200  w-7   text-black rounded-full cursor-pointer"
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {part2.length > 0 && (
          <div
            className={`hs-accordion ${openPart === 2 ? 'active flex-[4_4_0%] border-2 border-green-300' : ' flex-1'} border-2 flex justify-between cursor-pointer rounded-2xl`}
            id="hs-basic-heading-two"
          >
            <div
              className={`hs-accordion-toggle ${openPart === 2 ? 'hs-accordion-active:text-blue-600 w-24' : ''}  px-6 font-extrabold  inline-flex items-center gap-x-3 text-sm w-full  text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              aria-expanded={openPart === 2}
              aria-controls="hs-basic-collapse-two"
              onClick={() => handleAccordionClick(2)}
            >
              Part 2
            </div>
            <div
              id="hs-basic-collapse-two"
              className={`hs-accordion-content ${openPart === 2 ? 'block flex-[4_4_0%] ' : 'hidden'} w-full overflow-hidden transition-[height] duration-300`}
              role="region"
              aria-labelledby="hs-basic-heading-two"
              style={{ height: openPart === 2 ? 'auto' : '0px' }}
            >
              <ul className="flex    h-full  justify-center text-center items-center px-2 gap-4">
                {part2.map((question) => (
                  <li
                    className="border-2 border-slate-200  w-7 text-black rounded-full cursor-pointer"
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        { part3.length > 0 && (
          <div
            className={`hs-accordion ${openPart === 3 ? 'active flex-[4_4_0%] border-2 border-green-300' : ' flex-1'} border-2 flex justify-between cursor-pointer rounded-2xl`}
            id="hs-basic-heading-three"
          >
            <div
              className={`hs-accordion-toggle ${openPart === 3 ? 'hs-accordion-active:text-blue-600 w-24' : ''} font-extrabold  px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full  text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              aria-expanded={openPart === 3}
              aria-controls="hs-basic-collapse-three"
              onClick={() => handleAccordionClick(3)}
            >
              Part 3
            </div>
            <div
              id="hs-basic-collapse-three"
              className={`hs-accordion-content ${openPart === 3 ? 'block flex-[4_4_0%]' : 'hidden'}  w-full overflow-hidden transition-[height] duration-300`}
              role="region"
              aria-labelledby="hs-basic-heading-three"
              style={{ height: openPart === 3 ? 'auto' : '0px' }}
            >
              <ul className="flex justify-center   h-full  text-center items-center px-2 gap-4">
                {part3.map((question) => (
                  <li
                    className="border-2 border-slate-200  w-7 text-black rounded-full cursor-pointer"
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {  part4.length > 0 && (
          <div
            className={`hs-accordion ${openPart === 4 ? 'active flex-[4_4_0%] border-2 border-green-300' : ' flex-1'} border-2 flex justify-between cursor-pointer rounded-2xl`}
            id="hs-basic-heading-three"
          >
            <div
              className={`hs-accordion-toggle ${openPart === 4 ? 'hs-accordion-active:text-blue-600 w-24' : ''} font-extrabold  px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full  text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg`}
              aria-expanded={openPart === 4}
              aria-controls="hs-basic-collapse-three"
              onClick={() => handleAccordionClick(4)}
            >
              Part 4
            </div>
            <div
              id="hs-basic-collapse-three"
              className={`hs-accordion-content ${openPart === 4 ? 'block flex-[4_4_0%]' : 'hidden'}  w-full overflow-hidden transition-[height] duration-300`}
              role="region"
              aria-labelledby="hs-basic-heading-three"
              style={{ height: openPart === 4 ? 'auto' : '0px' }}
            >
              <ul className="flex  justify-center  h-full  text-center items-center px-2 gap-4">
                {part3.map((question) => (
                  <li
                    className="border-2 border-slate-200  w-7 text-black rounded-full cursor-pointer"
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationPart;
