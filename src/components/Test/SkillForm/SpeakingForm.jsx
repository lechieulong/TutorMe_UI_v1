import React from "react";

const SpeakingForm = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Speaking</h2>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((part) => (
          <textarea
            key={part}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg"
            placeholder={`Part ${part}`}
          />
        ))}
      </div>
    </section>
  );
};

export default SpeakingForm;
