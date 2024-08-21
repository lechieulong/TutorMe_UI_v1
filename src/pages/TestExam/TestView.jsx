import { useState, useRef, useEffect } from "react";
import Answer from "../../components/Test/Answer";
import Topic from "../../components/Test/Topic";
import Header from "../../components/Test/Header";
import NavigationPart from "../../components/Test/NavigationPart";
import { useLocation } from "react-router-dom";

const TestView = () => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [partData, setPartData] = useState([]);
  const [part, setPart] = useState(1);

  const location = useLocation();
  const receivedData = location.state;

  const readingPart = [
    {
      name: "reading 1",
      content:
        "Eaque incidunt, consectetur illum cupiditate a eveniet. Fuga saepe minima iusto illum a deserunt iure, facilis reprehenderit facere consequatur voluptas doloremque magnam qui neque, praesentium quo eius tempora est aperiam " +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!",
      questions: [
        {
          id: 1,
          question: "What is abc?",
          type: "multiple-choice",
          answers: [
            { id: 1, name: "Option 1", answer: "abc" },
            { id: 2, name: "Option 2", answer: "def" },
            { id: 3, name: "Option 3", answer: "ghi" },
            { id: 4, name: "Option 4", answer: "jkl" },
          ],
        },
        {
          id: 2,
          question:
            "Please enter the name [bl2] of the first planet in our solar system.",
          type: "enter-answer",
          blanks: [{ id: 2, placeholder: "1" }],
          correctAnswer: "Mercury",
        },
      ],
      navigations: [1, 2],
    },
    {
      name: "reading 2",
      content:
        "Eaque incidunt, consectetur illum cupiditate a eveniet. Fuga saepe minima iusto illum a deserunt iure, facilis reprehenderit facere consequatur voluptas doloremque magnam qui neque, praesentium quo eius tempora est aperiam " +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!",

      questions: [
        {
          id: 3,
          question: "What is eme?",
          type: "multiple-choice",
          answers: [
            { id: 9, name: "Option 1", answer: "eme" },
            { id: 10, name: "Option 2", answer: "ene" },
            { id: 11, name: "Option 3", answer: "one" },
            { id: 12, name: "Option 4", answer: "ome" },
          ],
        },
        {
          id: 4,
          question: "Please enter the chemical symbol for water.",
          type: "enter-answer",
          blanks: [{ id: 4, placeholder: "Chemical symbol" }],
          correctAnswer: "H2O",
        },
      ],
      navigations: [3, 4],
    },
    {
      name: "reading 3",
      content:
        "Eaque incidunt, consectetur illum cupiditate a eveniet. Fuga saepe minima iusto illum a deserunt iure, facilis reprehenderit facere consequatur voluptas doloremque magnam qui neque, praesentium quo eius tempora est aperiam " +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!" +
        "Tempora voluptatum expedita nesciunt. Ducimus optio modi nulla omnis eveniet officiis dolor cupiditate, inventore aperiam, totam minima? Iste amet delectus explicabo aperiam neque omnis accusamus molestiae eligendi quas non. Recusandae!",

      questions: [
        {
          id: 5,
          question: "What is haha?",
          type: "multiple-choice",
          answers: [
            { id: 17, name: "Option 1", answer: "haha" },
            { id: 18, name: "Option 2", answer: "heehee" },
            { id: 19, name: "Option 3", answer: "hoho" },
            { id: 20, name: "Option 4", answer: "hihi" },
          ],
        },
        {
          id: 6,
          question: "What is the square [bl6] root of 16?",
          type: "enter-answer",
          blanks: [{ id: 6, placeholder: "hydra" }],
          correctAnswer: "4",
        },
      ],
      navigations: [5, 6],
    },
  ];

  const englishPart = {
    READING: 1,
    LISTENING: 2,
    WRITING: 3,
    SPEAKING: 4,
  };

  useEffect(() => {
    if (receivedData === englishPart.READING) {
      setPartData(readingPart);
    }
  }, [receivedData]);

  useEffect(() => {
    if (
      receivedData === englishPart.READING ||
      receivedData === englishPart.WRITING
    ) {
      setOpenSideView(true);
    }
  }, [receivedData]);

  const handleQuestionClick = (questionId) => {
    if (questionRef.current[questionId]) {
      questionRef.current[questionId].scrollIntoView();
    }
  };

  const handlePartClick = (partNumber) => {
    setPart(partNumber);
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex justify-between h-screen w-screen">
        {isOpenSideView && (
          <div className="w-1/2 bg-slate-400 overflow-auto h-[calc(100%-112px)] mt-14">
            <Topic part={part} partData={partData} />
          </div>
        )}
        <div
          className={`w-${
            isOpenSideView ? "1/2" : "full"
          } overflow-auto h-[calc(100%-112px)] mt-14`}
        >
          <Answer part={part} partData={partData} refs={questionRef} />
        </div>
      </div>
      <NavigationPart
        partData={partData}
        handlePartClick={handlePartClick}
        handleQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default TestView;
