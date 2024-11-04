const mockTestData = {
  reading: {
    id: 'b1a0e408-75c4-4a15-9a62-e149e3b83cf3', // GUID for reading
    duration: 60,
    type: 0,
    parts: [
      {
        id: 'd46d33ef-82f0-4829-a9c0-e46aa84ec661', // GUID for part 1
        partNumber: 1,
        contentText: "<h1><strong>3 Lessons from the Smartest Developers I’ve Worked With</strong><br><br><br><img src='https://miro.medium.com/v2/resize:fit:875/1*3bQd9DysVI2gJezwaxxTzQ.jpeg' alt='' width='700' height='469'></h1><p>I have a confession.</p><p>I’ve copy pasted throughout my entire coding career.</p><p>Honestly, it’s how I’ve survived over the years as a developer.</p><p>On every team where I worked, I took note of what the smarter developers were doing.</p><p><strong>I copied from the right people at some amazing companies and worked with developers who I truly think might be genius</strong>.</p><ul><li>One started a multi-million dollar business.</li><li>Another wrote a popular library for unit testing that you’ve probably heard of.</li><li>The last one called me out on my b.s.</li></ul><p>I stole a little piece of each of these developers to accelerate my own career.</p><p>I’ve been very lucky.</p><p>I live in the epicenter of the tech universe in the San Francisco Bay Area. Every nerdy developer with a dollar and a dream ends up here somehow.</p><p>You don’t have to get lucky though.</p><p>I want to share the lessons I learned from each of these characters that saved me from mediocrity and might help you as well.</p><h1><strong>You won’t recognize what’s bad until you’ve experienced what’s good.</strong></h1><p>Before I met these super star developers, I was aiming too low in my career. After learning to code at 30, I was just happy someone hired me. My main goal was not to get fired.</p><p>I aimed to be average.</p><p>And I still fell short.</p><p><strong>Here are phrases you’ll often hear from sub-par developers.</strong></p><blockquote><p><i>“It works on my machine”</i></p></blockquote>",
        audio: null,
        image: "https://unsplash.com/photos/0z-KH_8mUHs",
        questionName: "Reading Section 1",
        sections: [
          {
            id: '31a0cf4d-e53a-41d2-bb5c-84c798eb2908', // GUID for section 1
            sectionGuide: "Answer the following questions:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: 'a9f673ed-b3b6-4944-92af-9f261ee32bcf', // GUID for question 1
                questionName: "What is the main idea?",
                answers: [
                  { id: 'e9a2a776-61ba-4b74-8a7f-84deff6e1037', answerText: "Correct answer", isCorrect: 1 }, // Correct
                  { id: '2e8cf23d-8ca3-44e7-a04f-638f4af31ec8', answerText: "Incorrect answer", isCorrect: 0 }, // Incorrect
                ],
              },
              {
                id: '0d5855f4-2556-470e-bd5d-01d51aa7e90e', // GUID for question 2
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '4c9e7e87-b9ae-4bc1-8c1f-b73371ab2df8', answerText: "Correct answer", isCorrect: 1 }, // Correct
                  { id: '511c3e91-0082-4d2b-b46b-dc4b6e23038a', answerText: "Incorrect answer", isCorrect: 0 }, // Incorrect
                ],
              },
            ],
          },
          {
            id: '4cfc00b0-f0b4-4a38-b219-6d6c8e7e6ae1', // GUID for section 2
            sectionGuide: "Matching Heading below for correct passage:",
            sectionType: 2,
            image: "",
            questions: [
              {
                id: '85f8bfb6-86dc-4849-b0bc-580fc5d22c57', // GUID for question 3
                questionName: "What is the main idea?",
                answers: [
                  { id: 'b1824b0a-38aa-4db9-8ef1-c05f45c327f1', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '0d7bc25e-5db1-42ca-9bde-32efc08d9cf1', // GUID for question 4
                questionName: "the second",
                answers: [
                  { id: '6bc14fc4-7bba-475e-9173-3e3a3a45bc8a', answerText: "ABC", isCorrect: 1 }, // Correct
                  { id: '6bc14fc4-7bba-475e-9173-3e3a3a45bc8a', answerText: "cdfssdf", isCorrect: 1 }, // Correct
                  { id: '6bc14fc4-7bba-475e-9173-3e3a3a45bc8a', answerText: "cdfssdf", isCorrect: 1 }, // Correct
                ],
              },
             
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '918aa61d-f5a6-4764-8471-b88aa7d1a0d0', // GUID for question 9
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '8f0b6205-e9ef-4c6f-bd94-699b93068ec4', answerText: "CCCC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '5091c4c7-c568-4af4-bf73-60a7b75e3fa9', // GUID for question 10
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '5e8d78ef-2b2b-4bb1-a6c4-20569d376597', answerText: "DDDD", isCorrect: 1 }, // Correct
                ],
              },
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
            
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
             
            ],
          },
          
        ],
      },
      {
        id: 'a07e4b7d-4f7b-45dc-9569-1680f8cf6601', // GUID for part 2
        partNumber: 2,
        contentText:
          "<h1>Another Reading Passage</h1><p>This passage discusses the importance of time management.</p>",
        audio: null,
        image: "https://unsplash.com/photos/m2F6mDFP17g",
        questionName: "Reading Section 2",
        sections: [
          {
            id: '03c77c79-f8be-42f7-9139-0ff2c4ac6c49', // GUID for section 4
            sectionGuide: "Analyze the text and answer the questions:",
            sectionType: 4,
            image: "",
            questions: [
              {
                id: '1ed2b02f-cf5c-48c5-b45e-75c90b6c8477', // GUID for question 11
                questionName:
                  "What strategies are suggested for time management?",
                answers: [
                  { id: '82b4cdb3-d3c0-49c7-b9e0-4e59e11bdf5e', answerText: "Correct answer", isCorrect: 1 }, // Correct
                  { id: '7b44cb3b-e84f-4bc9-9e07-447e8da58896', answerText: "Incorrect answer", isCorrect: 0 }, // Incorrect
                ],
              },
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '918aa61d-f5a6-4764-8471-b88aa7d1a0d0', // GUID for question 9
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '8f0b6205-e9ef-4c6f-bd94-699b93068ec4', answerText: "CCCC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '5091c4c7-c568-4af4-bf73-60a7b75e3fa9', // GUID for question 10
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '5e8d78ef-2b2b-4bb1-a6c4-20569d376597', answerText: "DDDD", isCorrect: 1 }, // Correct
                ],
              },
            ],
          },
          {
            id: 'e6c70726-eeb9-439f-9ef9-134bb36ffbb0', // GUID for section 3
            sectionGuide: "Choose true or false answer for each question below:",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: 'e8c2a10c-f94d-4e77-a4b4-dae13860a7d3', // GUID for question 7
                questionName: "What is the main idea?",
                answers: [
                  { id: '3a527144-0b68-4524-81f2-86c6b4ae9d8d', answerText: "Real marid", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '8c818f42-f85f-4af1-b54d-007303dbef73', // GUID for question 8
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '36a53a61-85e6-4cc8-aad7-69cc3c7e1ff2', answerText: "ABC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '918aa61d-f5a6-4764-8471-b88aa7d1a0d0', // GUID for question 9
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '8f0b6205-e9ef-4c6f-bd94-699b93068ec4', answerText: "CCCC", isCorrect: 1 }, // Correct
                ],
              },
              {
                id: '5091c4c7-c568-4af4-bf73-60a7b75e3fa9', // GUID for question 10
                questionName: "What is the author's opinion?",
                answers: [
                  { id: '5e8d78ef-2b2b-4bb1-a6c4-20569d376597', answerText: "DDDD", isCorrect: 1 }, // Correct
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  listening:{
    id: '5f7b1253-0ae2-49c0-905f-10a59e92e982', // GUID for listening
    duration: 30,
    type: 1,
    parts: [
      {
        id: 'e84d6b55-9828-4421-90d6-19a9e24af5a8', // GUID for part 3
        contentText: "",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://unsplash.com/photos/T4DNRfE9rN4",
        questionName: "Listening Section 1",
        sections: [
          {
            id: 'a51a5a7b-0bb1-4d85-a174-8f0e51d049c1', // GUID for section 1
            sectionGuide: "Listen carefully and answer the following questions:",
            sectionType: 2,
            image: "",
            questions: [
              {
                id: '8bc6d57d-9c09-4485-b4af-67b9f1cd9c5c', // GUID for question 1
                questionName: "What was the main topic of [] the discussion about task  today",
                answers: [
                  { id: '44bdb90d-f6b5-4086-9f01-fdc2deaa7d73', answerText: "Correct answer", isCorrect: 1 },
                  { id: '4c3d2e96-fb39-4658-9a56-5bcbab0281cc', answerText: "Incorrect answer", isCorrect: 0 },
                ],
              },
            ],
          },
          {
            id: 'b1234567-89ab-cdef-0123-456789abcdef', // GUID for section 2
            sectionGuide: "Summarize the discussion in your own words.",
            sectionType: 3,
            image: "",
            questions: [
              {
                id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: "Can you summarize [] the main points?",
              },
              {
                id: '9bc6d34d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: "[] the challenged what you save?",
              },
              {
                id: '9fa6d34d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: "[] is your world?",
              },
            ],
          },
          {
            id: 'b1234567-89ab-cdef-0123-456789abcdef', // GUID for section 2
            sectionGuide: "Summarize the discussion in your own words.",
            sectionType: 4,
            image: "https://miro.medium.com/v2/resize:fit:875/1*3bQd9DysVI2gJezwaxxTzQ.jpeg",
            questions: [
              {
                id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: " main points []",
              },
              {
                id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c9d', // GUID for question 2
                questionName: " cc points []",
              },
            ],
          },
          // {
          //   id: 'b1234567-89ab-cdef-0123-456789abcdef', // GUID for section 2
          //   sectionGuide: "Summarize the discussion in your own words.",
          //   sectionType: 5,
          //   image: "",
          //   questions: [
          //     {
          //       id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
          //       questionName: "Can you summarize the main points?",
          //       answers: [
          //         { id: '55bdb90d-f6b5-4086-9f01-fdc2deaa7d73', answerText: "Main points summary", isCorrect: 1 },
          //         { id: '6c3d2e96-fb39-4658-9a56-5bcbab0281cc', answerText: "Wrong summary", isCorrect: 0 },
          //       ],
          //     },
          //     {
          //       id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
          //       questionName: "wwwww you ff the main points?",
          //       answers: [
          //         { id: '35bdb90d-f6b5-4086-9f01-fdc2deaa7d73', answerText: "gg rr summary", isCorrect: 1 },
          //         { id: '2c3d2e96-fb39-4658-9a56-5bcbab0281cc', answerText: "cc summary", isCorrect: 0 },
          //       ],
          //     },
          //   ],
          // },
          {
            id: 'b1234567-89ab-cdef-0123-456789abcdef', // GUID for section 2
            sectionGuide: "Summarize the discussion in your own words.",
            sectionType: 6,
            image: "",
            questions: [
              {
                id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: "Can you summarize the main points?",
                answers: [
                  { id: '55bdb90d-f6b5-4086-9f01-fdc2deaa7d73', answerText: "Main points summary", isCorrect: 1 },
                  { id: '6c3d2e96-fb39-4658-9a56-5bcbab0281cc', answerText: "Wrong summary", isCorrect: 0 },
                ],
              },
            ],
          },
          {
            id: 'b1234567-89ab-cdef-0123-456789abcdef', // GUID for section 2
            sectionGuide: "Summarize the discussion in your own words.",
            sectionType: 7,
            image: "",
            questions: [
              {
                id: '9bc6d57d-9c09-4485-b4af-67b9f1cd9c5d', // GUID for question 2
                questionName: "Can you summarize the main points?",
                answers: [
                  { id: '55bdb90d-f6b5-4086-9f01-fdc2deaa7d73', answerText: "Main points summary", isCorrect: 1 },
                  { id: '6c3d2e96-fb39-4658-9a56-5bcbab0281cc', answerText: "Wrong summary", isCorrect: 0 },
                ],
              },
            ],
          },
          {
            id: 'c2345678-90ab-cdef-0123-456789abcdef', // GUID for section 3
            sectionGuide: "Fill in the blanks as you listen.",
            sectionType: 8,
            image: "",
            questions: [
              {
                id: '10ec2f83-66ec-4b83-b56b-5b44b6c54a75', // GUID for question 3
                questionName: "What were the key points discussed?",
                answers: [
                  { id: '78c7a624-4e48-4e5d-8d37-e8d47b0e76f5', answerText: "Key point A", isCorrect: 1 },
                  { id: 'd0d152ff-b4da-473b-b51c-95cb14bcce5d', answerText: "Incorrect key point", isCorrect: 0 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '0f7e0cbb-0f57-4a58-85d7-e2c257e0a865', // GUID for part 4
        contentText: "",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://unsplash.com/photos/Rc9wGpZmfZ0",
        questionName: "Listening Section 2",
        sections: [
          {
            id: 'd3456789-01ab-cdef-0123-456789abcdef', // GUID for section 4
            sectionGuide: "Listen and answer the following questions:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: '15fc2f83-66ec-4b83-b56b-5b44b6c54a76', // GUID for question 4
                questionName: "What was the main topic discussed?",
                answers: [
                  { id: '90d152ff-b4da-473b-b51c-95cb14bcce5d', answerText: "Correct answer", isCorrect: 1 },
                  { id: '21c7a624-4e48-4e5d-8d37-e8d47b0e76f5', answerText: "Incorrect answer", isCorrect: 0 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  writing: {
    id: '7f0ec5a8-8017-47b1-b848-53a7bc6de993', // GUID for writing
    duration: 60,
    type: 2,
    parts: [
      {
        id: 'b65b2391-5dbf-4673-81c1-5271d055482b', // GUID for part 5
        partNumber: 1,
        contentText: "<p>Write about the following topic.</p>",
        audio: null,
        image:
          "https://www.pexels.com/photo/document-on-top-of-stationery-669619.jpeg",
        questionName: "Writing Section 1",
        sections: [
          {
            id: '3a537a52-1c94-4973-9f4e-d1bd953d8ef8', // GUID for section 7
            sectionGuide: "Write at least 250 words on the following topic:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: '74e032d5-e672-4e53-b2d1-c4dbf8ee2b1e', // GUID for question 14
                questionName:
                  "Discuss the impact of technology on communication.",
                answers: [], // No answers for writing questions
              },
            ],
          },
        ],
      },
      {
        id: 'd7400c7a-c66e-4010-b5ba-3b5e1c74afc8', // GUID for part 6
        partNumber: 2,
        contentText: "<p>Writing Task 2 prompt.</p>",
        audio: null,
        image:
          "https://www.pexels.com/photo/close-up-photo-of-ballpoint-pen-on-paper-590582.jpeg",
        questionName: "Writing Section 2",
        sections: [
          {
            id: 'd3d41483-82eb-4d88-b87a-95f86eebc5f7', // GUID for section 8
            sectionGuide:
              "Write a letter to your friend inviting them to your birthday party:",
            sectionType: 1,
            image: "",
            questions: [
              {
                id: 'd8d2c7ee-f76e-4f00-b058-70893bc21d43', // GUID for question 15
                questionName:
                  "What details should you include in the invitation?",
                answers: [], // No answers for writing questions
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
