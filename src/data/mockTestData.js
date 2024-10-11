const mockTestData = [
    {
      duration: 1000, // Duration in minutes for the test skill
      type: 0, // 0: Reading, 1: Listening, 2: Writing, 3: Speaking
      parts: [
        {
          contentText: "<p>Sample reading text for the test.</p>",
          audio: null,
          image: null,
          questionName: "Reading Section",
          sections: [
            {
              sectionGuide: "Answer the following questions:",
              sectionType: "3", // Example type
              image: "",
              questions: [
                {
                  questionName: "What is the main idea?",
                  answers: [
                    { answerText: "Correct answer", isCorrect: true },
                    { answerText: "Incorrect answer", isCorrect: false },
                  ],
                  isFromQuestionBank: false,
                },
                {
                  questionName: "What is the author's opinion?",
                  answers: [
                    { answerText: "Correct opinion", isCorrect: true },
                    { answerText: "Incorrect opinion", isCorrect: false },
                  ],
                  isFromQuestionBank: false,
                },
              ],
            },
          ],
        },
        {
            contentText: "<p>Sample reading text for the test.</p>",
            audio: null,
            image: null,
            questionName: "Reading Section",
            sections: [
              {
                sectionGuide: "Answer the following questions:",
                sectionType: "3", // Example type
                image: "",
                questions: [
                  {
                    questionName: "What is the main idea?",
                    answers: [
                      { answerText: "Correct answer", isCorrect: true },
                      { answerText: "Incorrect answer", isCorrect: false },
                    ],
                    isFromQuestionBank: false,
                  },
                  {
                    questionName: "What is the author's opinion?",
                    answers: [
                      { answerText: "Correct opinion", isCorrect: true },
                      { answerText: "Incorrect opinion", isCorrect: false },
                    ],
                    isFromQuestionBank: false,
                  },
                  {
                    questionName: "What is the author's opinion?",
                    answers: [
                      { answerText: "Correct opinion", isCorrect: true },
                      { answerText: "Incorrect opinion", isCorrect: false },
                    ],
                    isFromQuestionBank: false,
                  },
                ],
              },
            ],
          },
      ],
    },
    {
      duration: 1,
      type: 1, // Listening
      parts: [
        {
          contentText: "",
          audio: "audio_sample.mp3", // Audio file for listening
          image: null,
          questionName: "Listening Section",
          sections: [
            {
              sectionGuide: "Listen carefully and answer the following questions:",
              sectionType: "2", // Example type
              image: "",
              questions: [
                {
                  questionName: "What was the speaker talking about?",
                  answers: [
                    { answerText: "Correct answer", isCorrect: true },
                    { answerText: "Incorrect answer", isCorrect: false },
                  ],
                  isFromQuestionBank: false,
                },
              ],
            },
          ],
        },
      ],
    },
    // Add more mock data for Writing and Speaking sections if needed
  ];
  

  
export default mockTestData;
