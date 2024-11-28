export const generateWritingPrompt = (currentQuestion, userAnswer, task) => {
  return `**Task:** 
${currentQuestion}

**Response:** 
${userAnswer}

**Evaluation:** 

Please evaluate the response based on the following IELTS Writing Task ${task} criteria:

1. **Task Achievement:**
   - Does the response address all parts of the task clearly and fully?
   - Is the main idea well-supported and developed?

2. **Coherence and Cohesion:**
   - Is the response logically organized and easy to follow?
   - Are ideas linked effectively with appropriate connectors?

3. **Lexical Resource:**
   - Does the response demonstrate a wide range of vocabulary?
   - Is the vocabulary used accurately and appropriately?

4. **Grammatical Range and Accuracy:**
   - Is there a variety of grammatical structures used?
   - Are there any errors in grammar, punctuation, or sentence structure?

**Evaluation Format:**
- **Overall Band Score:** A numerical score (1-9) based on the overall quality of the response.
- **Feedback:**
  - Task Achievement: [Your feedback]
  - Coherence and Cohesion: [Your feedback]
  - Lexical Resource: [Your feedback]
  - Grammatical Range and Accuracy: [Your feedback]
- **Suggestions for Improvement:** [Provide specific tips on how the writer can improve their writing.]
- **Examples:** [Offer alternative phrasings or sentence structures to improve the writing.]

**Important Considerations:**
- Be precise and ensure the evaluation aligns with IELTS band descriptors.
- Provide clear, constructive feedback with actionable suggestions for improvement.
- Maintain a professional and objective tone throughout.

Now, please evaluate the user's response based on these criteria.`;
};
