export const highlightSpecialCharacters = (text) => {
  if (!text) return "";

  // Replace special characters with highlighted spans
  const regexSpecialChars = /[^\w\s]/g;
  text = text.replace(
    regexSpecialChars,
    (match) => `<span class="text-red-500">${match}</span>`
  );

  // Add a line break before "Question"
  const regexQuestion = /\bQuestion\b/g;
  text = text.replace(
    regexQuestion,
    (match) => `<br /><span class="font-bold text-blue-500">${match}</span>`
  );

  return text;
};
