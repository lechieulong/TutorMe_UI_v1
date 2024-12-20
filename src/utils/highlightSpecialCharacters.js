export const highlightSpecialCharacters = (text ) => {
  if (!text) return "";

    // Step 1: Highlight Questions
    text = text.replace(
      /\*\*Question:\s*(.*?)\*\*/g,
      (match, question) =>
        `<div class="mt-2">
          <h2 class="text-lg font-bold text-blue-700">Question:</h2>
          <p class="text-gray-800">${question}</p>
        </div>`
    );

    // Step 2: Highlight Correct Answers
    text = text.replace(
      /\*\*Correct Answers:\s*(.*?)\*\*/g,
      (match, correctAnswers) =>
        `<div class="mt-2">
          <h3 class="text-md font-semibold text-green-700">Correct Answers:</h3>
          <p class="text-green-600 bg-green-100 px-4 py-2 rounded-md">${correctAnswers}</p>
        </div>`
    );

    // Step 3: Highlight Explanation Sections
    text = text.replace(
      /\*\*\s*Explanation:\s*\*/g,
      `<h3 class="mt-2 text-md font-bold text-yellow-700">Explanation:</h3>`
    );

    // Step 4: Style Explanation Details
    text = text.replace(
      /\*\s*(.*?)\:/g,
      (match, detail) =>
        `<div class="">
          <span class="font-semibold text-purple-700">${detail}:</span>
        </div>`
    );

    // Step 5: Breaklines for Clarity
    text = text.replace(/(?:\n\s*)+/g, "<br />");

    return text;
};
