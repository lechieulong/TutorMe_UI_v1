import React, { useState } from "react";

const MatchingHeading = ({ question, order, onAnswerChange }) => {
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full  ">
            <div className="overflow-hidden p-2">
              <h3 className="font-semibold p-2 text-lg">Heading content</h3>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-collapse border border-gray-300">
                <tbody>
                  {question.questionMatch.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {optionLabels[index]}.
                      </td>
                      <td className=" py-4 text-sm text-gray-600 dark:text-neutral-300">
                        {item.name} asdfas sad asd f ds dsfds fds f
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="font-semibold p-2 text-lg  mt-7">Matching </h3>
              {/* Table for answers */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-collapse border border-gray-300">
                <tbody>
                  {question.answers.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100  dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {order++}.
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={""}
                          className="border border-gray-300 py-2 px-3 rounded-lg"
                        >
                          <option value="">----</option>
                          {question.questionMatch.map((op, opIndex) => (
                            <option key={opIndex} value={op}>
                              {optionLabels[opIndex]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-neutral-300">
                        {item.name} sdaf asdf sad dsaf sadf sadf sadf á fas sdf
                        dsf dsf
                      </td>
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
