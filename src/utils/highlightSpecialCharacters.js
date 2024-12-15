export const highlightSpecialCharacters = (text) => {
  if (!text) return "";

  // Replace special characters with highlighted spans
  const regexSpecialChars = /[^\w\s]/g;
  text = text.replace(
    regexSpecialChars,
    (match) => `<span class="text-red-500 ">${match}</span>`
  );

  // Add a line break before "Question" and style it
  const regexQuestion = /\bQuestion\b/g;
  text = text.replace(
    regexQuestion,
    (match) =>
      `<br /><span class="font-bold text-blue-600 text-lg mt-4">Question</span>`
  );

  // Style "Correct Answer" and "Explanation"
  const regexCorrectAnswer = /\bCorrect Answer\b/g;
  text = text.replace(
    regexCorrectAnswer,
    (match) =>
      `<br /><span class="font-semibold text-green-600 text-lg mt-4">Correct Answer:</span>`
  );

  const regexExplanation = /\bExplanation\b/g;
  text = text.replace(
    regexExplanation,
    (match) =>
      `<br /><span class="font-semibold text-gray-800 text-lg mt-4 leading-7">Explanation:</span>`
  );

  // Add space after each section for readability
  text = text.replace(
    /(Question::|Correct Answer::|Explanation::)/g,
    "$1<br />"
  );

  return text;
};
