export const generateSpeakingPrompt = (currentQuestion, userAnswer) => {
  return `IELTS Speaking Question: ${currentQuestion}
User's Response: ${userAnswer}

Please evaluate the response on the following criteria:

1. **Task Achievement:** 
   - Does the response address all aspects of the task and stay on topic?
   - Is the response detailed and relevant?

2. **Coherence and Cohesion:** 
   - Is the response well-organized and easy to follow?

3. **Lexical Resource:** 
   - Is the vocabulary varied and used accurately?

4. **Grammatical Range and Accuracy:** 
   - Are grammatical structures used correctly and varied?

**Important:** 
- Short or off-topic responses should be rated lower (e.g., below 3.0).

### Evaluation Format:
- **Overall Score:** [Numeric score, e.g., 6.5]
- **Feedback:** 
  - Task Achievement: [Your feedback]
  - Coherence: [Your feedback]
  - Lexical Resource: [Your feedback]
  - Grammar: [Your feedback]
- **Suggestions:** [Improvement tips]

Now, please evaluate the response.`;
};
