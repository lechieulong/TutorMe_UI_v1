import React from "react";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpeakingForm = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        <span className="mr-5">
          <FontAwesomeIcon icon={faMicrophone} />
        </span>
        Speaking
      </h2>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((part) => (
          <>
            <h3 className="font-semibold text-xl"> Part {part}</h3>
            <textarea
              key={part}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg"
              placeholder={`enter content ...`}
            />
          </>
        ))}
      </div>
    </section>
  );
};

export default SpeakingForm;
