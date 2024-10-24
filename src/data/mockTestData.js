const mockTestData = {
  reading: {
    id: 1,
    duration: 1, // Duration in minutes for the reading skill
    type: 0, // 0: Reading
    parts: [
      {
        id: 1,
        partNumber: 1,
        contentText: "<h1> hhahhaha </h1><p>Sample reading text for the testI’ve started too many failed businesses to count. .</p>",
        audio: null, // No audio for reading section
        image: "https://unsplash.com/photos/0z-KH_8mUHs", // Example image
        questionName: "Reading Section",
        sections: [
          {
            id: 1,
            sectionGuide: "Answer the following questions:",
            sectionType: "3", // Example type
            image: "",
            questions: [
              {
                id: 1,
                questionName: "What is the main idea?",
                answers: [
                  { id: 1, answerText: "Correct answer", isCorrect: true },
                  { id: 2, answerText: "Incorrect answer", isCorrect: false },
                ],
              },
              {
                id: 2,
                questionName: "What is the author's opinion?",
                answers: [
                  { id: 3, answerText: "Correct answer", isCorrect: true },
                  { id: 4, answerText: "Incorrect answer", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  listening: {
    id: 2,
    duration: 1,
    type: 1, // 1: Listening
    parts: [
      {
        id: 2,
        contentText: "",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Audio file for listening
        image: "https://unsplash.com/photos/T4DNRfE9rN4", // Example image
        questionName: "Listening Section",
        sections: [
          {
            id: 2,
            sectionGuide: "Listen carefully and answer the following questions:",
            sectionType: "2", // Example type
            image: "",
            questions: [
              {
                id: 3,
                questionName: "What was the speaker talking about?",
                answers: [
                  { id: 5, answerText: "Correct answer", isCorrect: true },
                  { id: 6, answerText: "Incorrect answer", isCorrect: false },
                ],
                isFromQuestionBank: false,
              },
            ],
          },
        ],
      },
    ],
  },
  writing: {
    id: 3,
    duration: 1, // Duration in minutes for the Writing skill
    type: 2, // 2: Writing
    parts: [
      {
        id: 3,
        partNumber: 1,
        contentText: "<p>Write about the following topic.</p>",
        audio: null, // No audio for writing section
        image: "https://unsplash.com/photos/Rc9wGpZmfZ0", // Example image
        questionName: "Writing Section",
        sections: [
          {
            id: 3,
            sectionGuide: "Write at least 250 words on the following topic:",
            sectionType: "1", // Example type
            image: "",
            questions: [
              {
                id: 4,
                questionName: "Describe the advantages and disadvantages of using technology in education.",
                answers: [],
              },
            ],
          },
        ],
      },
    ],
  },
  speaking: {
    id: 4,
    duration: 1, // Duration in minutes for the Speaking skill
    type: 3, // 3: Speaking
    parts: [
      {
        id: 4,
        partNumber: 1,
        contentText: "<p>Speaking prompt: Talk about your favorite book.</p>",
        audio: null, // No audio for speaking section
        image: "https://unsplash.com/photos/0z-KH_8mUHs", // Example image
        questionName: "Speaking Section",
        sections: [
          {
            id: 4,
            sectionGuide: "Answer the following questions:",
            sectionType: "4", // Example type
            image: "",
            questions: [
              {
                id: 5,
                questionName: "What is the title of the book?",
                answers: [],
              },
              {
                id: 6,
                questionName: "Why do you like this book?",
                answers: [],
              },
            ],
          },
        ],
      },
    ],
  },
  vocabulary: {
    id: 5,
    duration: 1, // Duration in minutes for the Vocabulary skill
    type: 4, // 4: Vocabulary
    parts: [
      {
        id: 5,
        partNumber: 1,
        contentText: "<p>Learn the following vocabulary words.</p>",
        audio: null, // No audio for vocabulary section
        image: "https://unsplash.com/photos/Rc9wGpZmfZ0", // Example image
        questionName: "Vocabulary Section",
        sections: [
          {
            id: 5,
            sectionGuide: "Define the following words:",
            sectionType: "5", // Example type
            image: "",
            questions: [
              {
                id: 7,
                questionName: "What does 'ephemeral' mean?",
                answers: [],
              },
              {
                id: 8,
                questionName: "What does 'ubiquitous' mean?",
                answers: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default mockTestData;
