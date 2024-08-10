import React from 'react'

const Part = ({questions , handlePartClick, handleQuestionClick}) => {
  console.log("hlello")

  return (
    
    <div className="flex hs-accordion-group">
      {part1.length > 0 && (
        <div
          className="n"
          id="hs-basic-heading-one"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3
              inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            aria-expanded="true"
            aria-controls="hs-basic-collapse-one"
            onClick={() => handlePartClick(1)}
          >
            Part 1
          </button>
          <div
            id="hs-basic-collapse-one"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-basic-heading-one"
            style={{ height: "auto" }}
          >
            <ul className="flex justify-between space-x-3">
              {part1.map((question) => (
                <li
                  className="px-2 py-1 bg-slate-800 text-white rounded-full cursor-pointer"
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                >
                  {question.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {part2.length > 0 && (
        <div
          className="bg-slate-200 border-r-4 flex justify-between space-x-2 cursor-pointer hs-accordion"
          id="hs-basic-heading-two"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3
              inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls="hs-basic-collapse-two"
            onClick={() => handlePartClick(2)}
          >
            Part 2
          </button>
          <div
            id="hs-basic-collapse-two"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-basic-heading-two"
            style={{ height: "0px" }}
          >
            <ul className="flex justify-between space-x-3">
              {part2.map((question) => (
                <li
                  className="px-2 py-1 bg-slate-800 text-white rounded-full cursor-pointer"
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                >
                  {question.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {part3.length > 0 && (
        <div
          className="bg-slate-200 border-r-4 flex justify-between space-x-2 cursor-pointer hs-accordion"
          id="hs-basic-heading-three"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3
              inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls="hs-basic-collapse-three"
            onClick={() => handlePartClick(3)}
          >
            Part 3
          </button>
          <div
            id="hs-basic-collapse-three"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby="hs-basic-heading-three"
            style={{ height: "0px" }}
          >
            <ul className="flex justify-between space-x-3">
              {part3.map((question) => (
                <li
                  className="px-2 py-1 bg-slate-800 text-white rounded-full cursor-pointer"
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                >
                  {question.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Uncomment and complete Part 4 if needed */}
   
  </div>
);
}

export default Part