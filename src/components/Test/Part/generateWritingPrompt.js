const generateWritingPrompt = (currentQuestion, userAnswer, task) => {
  return `**Task:** 
${currentQuestion}.

**Response:** 
${userAnswer}

**Evaluation:** 

Please evaluate the response based on the following IELTS Writing Task ${task} criteria:

1. **Task Achievement:** Does the response fully address all parts of the task? Is the main idea clear and well-supported?
2. **Coherence and Cohesion:** Is the response well-organized and logically structured? Are ideas linked effectively?
3. **Lexical Resource:** Does the response use a wide range of vocabulary? Is the vocabulary used accurately and appropriately? 
4. **Grammatical Range and Accuracy:** Does the response use a variety of grammatical structures? Is the grammar accurate and error-free?

**Provide:**
* **Overall band score:** A numerical score (1-9) for the overall quality of the response.
* **Detailed feedback:** Specific comments on each of the four criteria, highlighting strengths and weaknesses.
* **Specific suggestions for improvement:** Concrete advice on how the writer can improve their future writing.
* **Examples of alternative phrasings or sentence structures:** To illustrate how the writer can enhance their language use.

**Important Considerations:**
* **Accuracy:** Ensure that your evaluation is accurate and aligns with the official IELTS band descriptors.
* **Clarity:** Provide clear and concise feedback that is easy to understand.
* **Constructive criticism:** Offer helpful suggestions for improvement, avoiding overly negative or generic comments.
* **Professional tone:** Maintain a professional and objective tone throughout your evaluation.
`;
};
