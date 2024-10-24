const kk = {
  reading: {
    duration: 1,
    type: 0, // 0: Reading
    parts: [
      {
        partNumber: 1,
        contentText:
          "<h1> hhahhaha </h1><p>Sample reading text for the testI’ve started too many failed businesses to count. .</p>",
        audio: null,
        image: "https://unsplash.com/photos/0z-KH_8mUHs",
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
              },
              {
                id: 2,
                questionName: "What is the author's opinion?",
                answers: [
                  { answerText: "Correct answer", isCorrect: true },
                  { answerText: "Incorrect answer", isCorrect: false },
                ],
              },
            ],
          },
        ],
        questions: [],
      },
    ],
  },
};
