const mockTestData = {
  reading: {
    id: 1,
    duration: 60, // Duration in minutes for the reading skill
    type: 0, // 0: Reading
    parts: [
      {
        id: 1,
        partNumber: 1,
        contentText:
          "<h1>Sample Reading Passage</h1><p>Sample reading text for the test. I’ve started too many failed businesses to count.</p>",
        audio: null, // No audio for reading section
        image: "https://unsplash.com/photos/0z-KH_8mUHs", // Example image
        questionName: "Reading Section 1",
        sections: [
          {
            id: 1,
            sectionGuide: "Answer the following questions:",
            sectionType: 3,
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
      {
        id: 2,
        partNumber: 2,
        contentText:
          "<h1>Another Reading Passage</h1><p>This passage discusses the importance of time management.</p>",
        audio: null,
        image: "https://unsplash.com/photos/m2F6mDFP17g",
        questionName: "Reading Section 2",
        sections: [
          {
            id: 2,
            sectionGuide: "Analyze the text and answer the questions:",
            sectionType: 4,
            image: "",
            questions: [
              {
                id: 3,
                questionName:
                  "What strategies are suggested for time management?",
                answers: [
                  { id: 5, answerText: "Correct answer", isCorrect: true },
                  { id: 6, answerText: "Incorrect answer", isCorrect: false },
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
    duration: 30,
    type: 1, // 1: Listening
    parts: [
      {
        id: 1,
        contentText: "",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Audio file for listening
        image: "https://unsplash.com/photos/T4DNRfE9rN4", // Example image
        questionName: "Listening Section 1",
        sections: [
          {
            id: 1,
            sectionGuide:
              "Listen carefully and answer the following questions:",
            sectionType: 2,
            image: "",
            questions: [
              {
                id: 1,
                questionName: "What was the main topic of the discussion?",
                answers: [
                  { id: 1, answerText: "Correct answer", isCorrect: true },
                  { id: 2, answerText: "Incorrect answer", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        contentText: "",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://unsplash.com/photos/Rc9wGpZmfZ0", // Example image
        questionName: "Listening Section 2",
        sections: [
          {
            id: 2,
            sectionGuide: "Listen and fill in the blanks:",
            sectionType: 2,
            image: "",
            questions: [
              {
                id: 2,
                questionName: "What were the key points discussed?",
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
  writing: {
    id: 3,
    duration: 60,
    type: 2, // 2: Writing
    parts: [
      {
        id: 1,
        partNumber: 1,
        contentText: "<p>Write about the following topic.</p>",
        audio: null, // No audio for writing section
        image:
          "https://www.pexels.com/photo/document-on-top-of-stationery-669619.jpeg", // Example image
        questionName: "Writing Section 1",
        sections: [
          {
            id: 1,
            sectionGuide: "Write at least 250 words on the following topic:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: 1,
                questionName:
                  "Discuss the impact of technology on communication.",
                answers: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        partNumber: 2,
        contentText: "<p>Writing Task 2 prompt.</p>",
        audio: null,
        image:
          "https://www.pexels.com/photo/close-up-photo-of-ballpoint-pen-on-paper-590582.jpeg",
        questionName: "Writing Section 2",
        sections: [
          {
            id: 2,
            sectionGuide:
              "Write a letter to your friend inviting them to your birthday party:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: 1,
                questionName:
                  "Discuss the impact of technology on communication.",
                answers: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        partNumber: 2,
        contentText: "<p>Writing Task 2 prompt.</p>",
        audio: null,
        image:
          "https://www.pexels.com/photo/close-up-photo-of-ballpoint-pen-on-paper-590582.jpeg",
        questionName: "Writing Section 2",
        sections: [
          {
            id: 2,
            sectionGuide:
              "Write a letter to your friend inviting them to your birthday party:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: 2,
                questionName:
                  "What details should you include in the invitation?",
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
    duration: 15,
    type: 3, // 3: Speaking
    parts: [
      {
        id: 1,
        partNumber: 1,
        contentText: "<p>Speaking prompt: Describe your favorite holiday.</p>",
        audio: null, // No audio for speaking section
        image: "https://unsplash.com/photos/0z-KH_8mUHs", // Example image
        questionName: "Speaking Section 1",
        sections: [
          {
            id: 1,
            sectionGuide: "Answer the following questions:",
            sectionType: 4,
            image: "",
            questions: [
              {
                id: 1,
                questionName: "What makes this holiday special?",
                answers: [],
              },
              {
                id: 2,
                questionName: "What traditions do you follow?",
                answers: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        partNumber: 2,
        contentText:
          "<p>Speaking prompt: Talk about a memorable experience.</p>",
        audio: null,
        image: "https://unsplash.com/photos/qPpN4nSbeFw",
        questionName: "Speaking Section 2",
        sections: [
          {
            id: 2,
            sectionGuide: "Discuss your experience in detail:",
            sectionType: 4,
            image: "",
            questions: [
              {
                id: 3,
                questionName: "What happened during this experience?",
                answers: [],
              },
              {
                id: 4,
                questionName: "How did it affect you?",
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
    duration: 30, // Duration in minutes for the Vocabulary skill
    type: 4, // 4: Vocabulary
    parts: [
      {
        id: 1,
        partNumber: 1,
        contentText: "<p>Learn the following vocabulary words.</p>",
        audio: null, // No audio for vocabulary section
        image: "https://unsplash.com/photos/Rc9wGpZmfZ0", // Example image
        questionName: "Vocabulary Section 1",
        sections: [
          {
            id: 1,
            sectionGuide: "Define the following words:",
            sectionType: 5,
            image: "",
            questions: [
              {
                id: 1,
                questionName: "What does 'ephemeral' mean?",
                answers: [],
              },
              {
                id: 2,
                questionName: "What does 'ubiquitous' mean?",
                answers: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        partNumber: 2,
        contentText: "<p>Learn additional vocabulary words.</p>",
        audio: null,
        image: "https://unsplash.com/photos/jGm1kjkVp8I",
        questionName: "Vocabulary Section 2",
        sections: [
          {
            id: 2,
            sectionGuide: "Use the following words in a sentence:",
            sectionType: 5,
            image: "",
            questions: [
              {
                id: 3,
                questionName: "Use 'ambiguous' in a sentence.",
                answers: [],
              },
              {
                id: 4,
                questionName: "Use 'cognizant' in a sentence.",
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
