import React, { useState, useRef } from "react";
import Answer from "../../components/Test/Answer";
import Question from "../../components/Test/Question";
import Header from "../../components/Test/Header";
import NavigationPart from "../../components/Test/NavigationPart";

// const questions = [
//   { id: "1", name: "1", subject: "Math", answers: "Easy" },
//   { id: "2", name: "2", subject: "Science", level: "Medium" },
//   { id: "3", name: "3", subject: "History", level: "Hard" },
//   { id: "4", name: "5", subject: "English", level: "Easy" },
//   { id: "5", name: "6", subject: "Math", level: "Easy" },
//   { id: "6", name: "7", subject: "Math", level: "Easy" },
//   { id: "7", name: "8", subject: "Math", level: "Easy" },
//   { id: "8", name: "9", subject: "Math", level: "Easy" },
//   { id: "9", name: "10", subject: "Math", level: "Easy" },
//   { id: "10", name: "J", subject: "Math", level: "Easy" },
//   { id: "11", name: "K", subject: "Math", level: "Easy" },
//   { id: "12", name: "L", subject: "Math", level: "Easy" },
//   { id: "13", name: "M", subject: "Math", level: "Easy" },
//   { id: "14", name: "N", subject: "Math", level: "Easy" },
//   { id: "15", name: "O", subject: "Math", level: "Easy" },
//   { id: "16", name: "P", subject: "Math", level: "Easy" },
//   { id: "17", name: "Q", subject: "Math", level: "Easy" },
//   { id: "18", name: "R", subject: "Math", level: "Easy" },
//   { id: "19", name: "S", subject: "Math", level: "Easy" },
//   { id: "20", name: "T", subject: "Math", level: "Easy" },
//   { id: "21", name: "U", subject: "Math", level: "Easy" },
//   { id: "22", name: "V", subject: "Math", level: "Easy" },
//   { id: "23", name: "W", subject: "Math", level: "Easy" },
//   { id: "24", name: "X", subject: "Math", level: "Easy" },
//   { id: "25", name: "Y", subject: "Math", level: "Easy" },
//   { id: "26", name: "Z", subject: "Math", level: "Easy" },
//   { id: "27", name: "AA", subject: "Math", level: "Easy" },
//   { id: "28", name: "BB", subject: "Math", level: "Easy" },
//   { id: "29", name: "CC", subject: "Math", level: "Easy" },
//   { id: "30", name: "DD", subject: "Math", level: "Easy" },
//   { id: "31", name: "df", subject: "Math", level: "Easy" },
//   { id: "32", name: "DdfD", subject: "Math", level: "Easy" },
//   { id: "33", name: "DdfD", subject: "Math", level: "Easy" },
//   { id: "34", name: "g", subject: "Math", level: "Easy" },
//   { id: "35", name: "DD", subject: "Math", level: "Easy" },
//   { id: "36", name: "r", subject: "Math", level: "Easy" },
//   { id: "37", name: "DgD", subject: "Math", level: "Easy" },
//   { id: "38", name: "DrD", subject: "Math", level: "Easy" },
// ];

const questions = [];

const subjects = ['english', 'literature', 'math', 'physics', 'chemistry'];
const types = ['reading', 'listening', 'writing', 'speaking'];
const levels = ['primary', 'secondary', 'highschool', 'college'];

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
    level: level
  });
}
// english 
// literal 
// other 

// if english 
// TestQuestion
// id, name, type 
// list answers ==  



const Test = () => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [part, setPart] = useState(1);

  const handleQuestionClick = (questionId) => {
    if (questionRef.current[questionId]) {
      questionRef.current[questionId].scrollIntoView({ behavior: "smooth" });
    }
  };

  const isEnglish = true;
  const isLiteral = false;

  const handlePartClick = (partNumber) => {
    setPart(partNumber);
    if (isEnglish) {
      if (partNumber === 2 || partNumber === 4) {
        setOpenSideView(true);
      } else {
        setOpenSideView(false);
      }
    } else if (isLiteral) {
      if (partNumber === 4) {
        setOpenSideView(true);
      } else {
        setOpenSideView(false);
      }
    } else {
      setOpenSideView(false);
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex justify-between h-screen  ">
        {isOpenSideView && (
          <div className="w-1/2 bg-slate-400 overflow-auto  h-[calc(100%-112px)] mt-14 ">
            <Question />
          </div>
        )}
        <div
          className={`w-${
            isOpenSideView ? "1/2" : "full"
          }  overflow-auto  h-[calc(100%-112px)]  mt-14`}
        >
          <Answer
            isLiteral={isLiteral}
            questions={questions}
            refs={questionRef}
            part={part}
          />
        </div>
      </div>
      <NavigationPart
        questions={questions}
        isEnglish={isEnglish}
        handlePartClick={handlePartClick}
        handleQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default Test;
