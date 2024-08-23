import React, { useState, useRef, useEffect } from "react";
import Answer from "../../components/Test/Answer";
import Topic from "../../components/Test/Topic";
import Header from "../../components/Test/Header";
import NavigationPart from "../../components/Test/NavigationPart";
import { useLocation } from "react-router-dom";

const TestView = () => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [partData, setPartData] = useState([]);
  const [part, setPart] = useState(0);
  const [leftWidth, setLeftWidth] = useState(50);
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 1000);

  const location = useLocation();
  const receivedData = location.state;

  const writingPart = [
    {
      name: "Writing Task 1",
      questions: [
        {
          id: 1,
          question:
            "Describe the information shown in the bar chart. Include details about the main trends and any notable features.",
          type: "write-essay",
          prompt:
            "The bar chart below shows the number of visitors to five different attractions in a city in 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        },
      ],
      navigations: [1],
    },
    {
      name: "Writing Task 2",
      questions: [
        {
          id: 2,
          question:
            "Discuss both views and give your own opinion on whether the government should invest more in public transportation or in road infrastructure.",
          type: "write-essay",
          prompt:
            "Some people think that governments should invest more in public transportation, while others believe that road infrastructure should be improved. Discuss both sides and give your own opinion.",
        },
      ],
      navigations: [2],
    },
  ];

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
          order: 1,
        },
        {
          id: 2,
          question:
            "Please enter the name [bl2] of the first planet [bl3] in our solar system.",
          type: "enter-answer",
          blanks: [{ id: 2, placeholder: "1" }],
          blanks: [{ id: 3, placeholder: "Gion mat ha" }],
          correctAnswer: "Mercury",
          order: 2,
        },
        {
          id: 3,
          question: "PUPU NGU",
          type: "matching-heading",
          answers: [
            { id: 1, name: "Option 1", answer: "abc" },
            { id: 2, name: "Option 2", answer: "def" },
            { id: 3, name: "Option 3", answer: "ghi" },
            { id: 4, name: "Option 4", answer: "jkl" },
          ],
          correctAnswer: "haha",
          order: 3,
        },
        {
          id: 4,
          question: "Rambo",
          type: "matching-heading",
          answers: [
            { id: 1, name: "Option 1", answer: "abc" },
            { id: 2, name: "Option 2", answer: "def" },
            { id: 3, name: "Option 3", answer: "ghi" },
            { id: 4, name: "Option 4", answer: "jkl" },
          ],
          correctAnswer: "Mercury",
          order: 4,
        },
        {
          id: 5,
          question:
            "Please enter the name [bl2] of the first planet [bl7] in  our solar system.",
          type: "enter-answer",
          blanks: [{ id: 2, placeholder: "1" }],
          blanks: [{ id: 7, placeholder: "1kkk" }],

          correctAnswer: "Mercury",
          order: 5,
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
          order: 1,
        },
        {
          id: 4,
          question: "Please enter the chemical [bl4] symbol for water.",
          type: "enter-answer",
          blanks: [{ id: 4, placeholder: "Chemical symbol" }],
          correctAnswer: "H2O",
          order: 2,
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
          order: 1,
        },
        {
          id: 6,
          question: "What is the square [bl6] root of 16 ,[bl7] wtf is that ?",
          type: "enter-answer",
          blanks: [
            { id: 6, placeholder: "hydra" },
            { id: 7, placeholder: "wtf " },
          ],
          order: 2,
          correctAnswer: "4",
        },

        {
          id: 7,
          question: ". What is haha?",
          type: "multiple-choice",
          answers: [
            { id: 17, name: "Option 1", answer: "haha" },
            { id: 18, name: "Option 2", answer: "heehee" },
            { id: 19, name: "Option 3", answer: "hoho" },
            { id: 20, name: "Option 4", answer: "hihi" },
          ],
          order: 3,
        },
        {
          id: 8,
          question: "[bl9] wtf is that ?",
          type: "enter-answer",
          blanks: [{ id: 9, placeholder: "wtf " }],
          order: 4,
          correctAnswer: "4",
        },
      ],
      navigations: [5, 6],
      blanks: [6, 7],
    },
  ];

  const englishPart = {
    READING: 1,
    LISTENING: 2,
    WRITING: 3,
    SPEAKING: 4,
  };

  useEffect(() => {
    if (receivedData.skillPart === englishPart.READING) {
      setPartData(readingPart);
    } else if (receivedData.skillPart === englishPart.WRITING) {
      setPartData(writingPart);
    } else if (receivedData.skillPart === englishPart.LISTENING) {
      setPartData(readingPart);
    } else {
    }
  }, []);

  useEffect(() => {
    if (
      receivedData.skillPart === englishPart.READING ||
      receivedData.skillPart === englishPart.WRITING
    ) {
      setOpenSideView(true);
    }
  }, [receivedData]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1000; // Decrease by 1 second
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Clean up on component unmount
  }, []);

  const startResizing = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setLeftWidth(newWidth);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const handleQuestionClick = (questionId) => {
    if (questionRef.current[questionId]) {
      questionRef.current[questionId].scrollIntoView();
    }
  };

  const handlePartClick = (partNumber) => {
    setPart(partNumber);
  };

  return (
    <div className="relative ">
      <Header timeLeft={timeLeft} />
      <div className="flex justify-between h-screen w-screen">
        {isOpenSideView && (
          <div
            className="overflow-auto"
            style={{
              width: `${leftWidth}%`,
              height: "calc(100% - 112px)",
              marginTop: "60px",
            }}
          >
            <Topic partData={partData} part={part} />
          </div>
        )}
        {isOpenSideView && (
          <div
            className="cursor-ew-resize "
            style={{
              width: "2px",
              height: "calc(100% - 112px)",
              marginTop: "60px",
            }}
            onMouseDown={startResizing}
          />
        )}
        <div
          className="overflow-auto flex-grow  "
          style={{
            width: `${100 - leftWidth}%`,
            height: "calc(100% - 117px)",
            marginTop: "65px",
          }}
        >
          <Answer
            skillPart={receivedData.skillPart}
            part={part}
            partData={partData}
            refs={questionRef}
          />
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
