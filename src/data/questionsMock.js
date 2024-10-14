const questionsMock = [
    {
      id: 1,
      questionName: "What is the capital of France?",
      questionType: 2, // Multiple choice
      skill: 0, // Reading
      answers: [
        {
          answerText: "Berlin",
          isCorrect: 0,
        },
        {
          answerText: "Madrid",
          isCorrect: 0,
        },
        {
          answerText: "Paris",
          isCorrect: 1, // This is the correct answer
        },
        {
          answerText: "Rome",
          isCorrect: 0,
        },
      ],
    },
    {
      id: 2,
      questionName: "Fill in the blank: The sun rises in the ____.",
      questionType: 1, // Fill in the blank
      skill: 0, // Reading
      answers: [
        {
          answerText: "east",
          isCorrect: 1, // Correct
        },
      ],
    },
    {
      id: 3,
      questionName: "Which planet is known as the Red Planet?",
      questionType: 2, // Multiple choice
      skill: 0, // Reading
      answers: [
        {
          answerText: "Earth",
          isCorrect: 0,
        },
        {
          answerText: "Mars",
          isCorrect: 1, // Correct
        },
        {
          answerText: "Jupiter",
          isCorrect: 0,
        },
        {
          answerText: "Venus",
          isCorrect: 0,
        },
      ],
    },
    {
      id: 4,
      questionName: "True or false: Water boils at 100°C.",
      questionType: 4, // True/False
      skill: 0, // Reading
      answers: [
        {
          answerText: "True",
          isCorrect: 1, // Correct
        },
        {
          answerText: "False",
          isCorrect: 0,
        },
      ],
    },
    {
      id: 5,
      questionName: "Match the following countries to their capitals.",
      questionType: 0, // Heading Matching
      skill: 0, // Reading
      answers: [
        {
          answerText: "Germany - Berlin",
          isCorrect: 1, // Correct
        },
        {
          answerText: "Spain - Madrid",
          isCorrect: 1, // Correct
        },
        {
          answerText: "France - Paris",
          isCorrect: 1, // Correct
        },
        {
          answerText: "Italy - Rome",
          isCorrect: 1, // Correct
        },
      ],
    },
    {
      id: 6,
      questionName: "Listen to the audio and choose the correct statement.",
      questionType: 2, // Multiple choice
      skill: 1, // Listening
      answers: [
        {
          answerText: "The speaker is talking about space travel.",
          isCorrect: 0,
        },
        {
          answerText: "The speaker is describing a holiday trip.",
          isCorrect: 1, // Correct
        },
        {
          answerText: "The speaker is talking about cooking.",
          isCorrect: 0,
        },
      ],
    },
    {
      id: 7,
      questionName: "Write a short paragraph about your favorite hobby.",
      questionType: 1, // Fill in the blank / Open-ended
      skill: 2, // Writing
      answers: [
        {
          answerText: "User-generated response",
          isCorrect: null, // No correct answer for open-ended questions
        },
      ],
    },
    {
      id: 8,
      questionName:
        "You are on the phone with a customer. Respond to their question.",
      questionType: 1, // Open-ended
      skill: 3, // Speaking
      answers: [
        {
          answerText: "User-generated response",
          isCorrect: null, // No correct answer for speaking tasks
        },
      ],
    },
  ];

  
  export default questionsMock