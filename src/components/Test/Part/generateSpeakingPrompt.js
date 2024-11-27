export const generateSpeakingPrompt = (currentQuestion, userAnswer, part) => {
  return `IELTS Speaking Part ${part} Question: ${currentQuestion}
User's Response: ${userAnswer}

Please evaluate the response based on the following criteria:

1. **Task Achievement:**
   - Does the response address all aspects of the question?
   - Is the answer relevant, detailed, and sufficiently developed for the given part of the test?

2. **Coherence and Cohesion:**
   - Is the response well-organized and easy to follow?
   - Are ideas linked clearly, with logical flow?

3. **Lexical Resource:**
   - Is the vocabulary varied and used accurately?
   - Are there any errors in word choice or repetition?

4. **Grammatical Range and Accuracy:**
   - Are a variety of grammatical structures used correctly?
   - Are there any significant grammatical errors or issues with sentence structure?

### Evaluation Format:
- **Overall Score:** [Numeric score only, e.g., 6.5, 7.5]
- **Feedback:** 
  - Task Achievement: [Your feedback]
  - Coherence: [Your feedback]
  - Lexical Resource: [Your feedback]
  - Grammar: [Your feedback]
- **Suggestions for Improvement:** [Provide actionable tips for improvement]

Now, please evaluate the user's response based on the criteria above.`;
};
