import { useState, useRef } from "react";
import Answer from "../../components/Test/Answer";
import Question from "../../components/Test/Question";
import Header from "../../components/Test/Header";
import NavigationPart from "../../components/Test/NavigationPart";

const questions = [];

const subjects = ["english", "literature", "math", "physics", "chemistry"];
const types = ["reading", "listening", "writing", "speaking", "other"];
const levels = ["primary", "secondary", "highschool", "college"];

for (let i = 1; i <= 60; i++) {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];

  questions.push({
    id: i,
    subject: subject,
    content: `Content of question ${i}`,
    image: `image${i}.jpg`,
    type: type,
    level: level,
  });
}

const questionsByType = {};

for (let i = 1; i <= 60; i++) {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];

  const question = {
    id: i,
    subject: subject,
    content: `Content of question ${i}`,
    image: `image${i}.jpg`,
    level: level,
  };

  if (!questionsByType[type]) {
    questionsByType[type] = {
      subjectType: type,
      content: `Content of ${type} questions`,
      questions: [],
    };
  }

  questionsByType[type].questions.push(question);
}

console.log(questionsByType);

const Test = () => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [part, SetPart] = useState(0);

  const handleQuestionClick = (questionId) => {
    if (questionRef.current[questionId]) {
      questionRef.current[questionId].scrollIntoView();
    }
  };

  const subjectType = Object.freeze({
    READING: 0,
    LISTENING: 1,
    WRITING: 2,
    SPEAKING: 3,
    OTHER: 4,
  });

  const handlePartClick = (partNumber) => {
    SetPart(partNumber);
    if (
      partNumber === subjectType.READING ||
      partNumber === subjectType.WRITING
    )
      setOpenSideView(true);
    else setOpenSideView(false);
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex justify-between h-screen">
        {isOpenSideView && (
          <div className="w-1/2 bg-slate-400 overflow-auto h-[calc(100%-112px)] mt-14">
            <Question part={part} questionsByType={questionsByType} />
          </div>
        )}
        <div
          className={`w-${
            isOpenSideView ? "1/2" : "full"
          } overflow-auto h-[calc(100%-112px)] mt-14`}
        >
          <Answer questions={questionsByType} refs={questionRef} />
        </div>
      </div>
      <NavigationPart
        questions={questions}
        handlePartClick={handlePartClick}
        handleQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default Test;
