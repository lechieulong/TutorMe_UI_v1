import React, { useState } from "react";

const MatchingHeading = ({ question, order, onAnswerChange }) => {
  const optionLabels = ["A", "B", "C", "D", "E", "G", "H"];

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <tbody>
                  {question.questionMatch.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                    >
                      <tr className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {optionLabels[index]}. {item.name}
                      </tr>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <tbody>
                  {question.answers.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                    >
                      <tr className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {order++}.
                        <select
                          value={""}
                          className="border px-2 py-1 rounded-lg"
                        >
                          <option value="">Select an option</option>
                          {question.questionMatch.map((op, opIndex) => (
                            <option key={opIndex} value={op}>
                              {optionLabels[opIndex]}
                            </option>
                          ))}
                        </select>
                        {item.name}
                      </tr>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingHeading;
