export const getWelcomeMessage = (partNumber) => {
  switch (partNumber) {
    case 1:
      return "abcd";
    // return `Hello, and welcome to the IELTS Speaking test. My name is Hydra, and I will be your examiner today. This test is recorded for assessment purposes.
    // The Speaking test is divided into three parts. I will explain each part as we go along, and I will ask you to speak on a variety of topics
    // In Part 1, I will ask you some general questions ;
    case 2:
      return `In Part 2, I will give you a task card with a topic and prompts. You will have 1 minute to prepare, and then I would like you to speak for 1-2 minutes on the topic.`;
    case 3:
      return `In Part 3, we will have a discussion based on the topic in Part 2. I will ask you more detailed questions, and we will explore your ideas in more depth.`;
    default:
      return "Welcome to the IELTS Speaking test.";
  }
};
