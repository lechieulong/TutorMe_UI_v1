import React, { useState, useRef, useEffect, memo } from "react";
import Answer from "../../components/Test/Answer";
import Topic from "../../components/Test/Topic";
import NavigationPart from "../../components/Test/NavigationPart";
import { useLocation } from "react-router-dom";

const TestView = () => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [partData, setPartData] = useState([]);
  const [part, setPart] = useState(0);
  const [leftWidth, setLeftWidth] = useState(50);

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
          "multiple-choice": [
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
          ],
        },
        {
          "enter-answer": [
            {
              id: 2,
              question:
                "Please enter the name [bl2] of the first planet [bl3] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 2, placeholder: "1" },
                { id: 3, placeholder: "Gion mat ha" },
              ],
              correctAnswer: "Mercury",
            },
            {
              id: 5,
              question:
                "Please enter the name [bl5] of the first planet [bl7] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 5, placeholder: "1" },
                { id: 7, placeholder: "1kkk" },
              ],
              correctAnswer: "Mercury",
            },
          ],
        },
        {
          "matching-heading": [
            {
              id: 1,
              questionMatch: [
                {
                  id: "1",
                  name: "the best choose",
                },
                {
                  id: "2",
                  name: "the best kkkkk",
                },
              ],
              answers: [
                {
                  id: 1,
                  name: "A",
                },
                {
                  id: 2,
                  name: "B",
                },
              ],
              type: "matching-heading",
            },
          ],
        },
      ],
      navigations: [1, 2, 3, 5, 7, 8, 9],
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
          "multiple-choice": [
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
          ],
        },
        {
          "enter-answer": [
            {
              id: 2,
              question:
                "Please enter the name [bl2] of the first planet [bl3] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 2, placeholder: "1" },
                { id: 3, placeholder: "Gion mat ha" },
              ],
              correctAnswer: "Mercury",
            },
            {
              id: 5,
              question:
                "Please enter the name [bl2] of the first planet [bl7] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 2, placeholder: "1" },
                { id: 7, placeholder: "1kkk" },
              ],
              correctAnswer: "Mercury",
            },
          ],
        },
        {
          "matching-heading": [
            {
              id: 1,
              questionMatch: [
                {
                  id: "1",
                  name: "the best choose",
                },
                {
                  id: "2",
                  name: "the best kkkkk",
                },
              ],
              answers: [
                {
                  id: 1,
                  name: "A",
                },
                {
                  id: 2,
                  name: "B",
                },
              ],
              type: "matching-heading",
            },
          ],
        },
      ],
      navigations: [1, 2, 3, 5, 7, 8, 9],
    },
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
          "multiple-choice": [
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
          ],
        },
        {
          "enter-answer": [
            {
              id: 2,
              question:
                "Please enter the name [bl2] of the first planet [bl3] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 2, placeholder: "1" },
                { id: 3, placeholder: "Gion mat ha" },
              ],
              correctAnswer: "Mercury",
            },
            {
              id: 5,
              question:
                "Please enter the name [bl2] of the first planet [bl7] in our solar system.",
              type: "enter-answer",
              blanks: [
                { id: 2, placeholder: "1" },
                { id: 7, placeholder: "1kkk" },
              ],
              correctAnswer: "Mercury",
            },
          ],
        },
        {
          "matching-heading": [
            {
              id: 1,
              questionMatch: [
                {
                  id: "1",
                  name: "the best choose",
                },
                {
                  id: "2",
                  name: "the best kkkkk",
                },
              ],
              answers: [
                {
                  id: 1,
                  name: "Nothing imposible",
                },
                {
                  id: 2,
                  name: "enhance  the ielts test ",
                },
              ],
              type: "matching-heading",
            },
          ],
        },
      ],
      navigations: [1, 2, 3, 5, 7, 8, 9],
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

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const blockKeys = (e) => {
      if (e.key === "F11" || e.key === "Escape") {
        e.preventDefault();
      }
    };

    const ensureFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        ensureFullScreen();
      }
    };

    document.addEventListener("keydown", blockKeys);
    document.addEventListener("fullscreenchange", ensureFullScreen);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("fullscreenchange", ensureFullScreen);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const hanldeTestSubmit = () => {
    exitFullScreen();
  };

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
            className="cursor-ew-resize w-2 bg-black "
            style={{
              width: "2px",
              height: "calc(100% - 117px)",
              marginTop: "70px",
            }}
            onMouseDown={startResizing}
          />
        )}
        <div
          className="overflow-auto flex-grow  "
          style={{
            width: `${100 - leftWidth}%`,
            height: "calc(100% - 112px)",
            marginTop: "70px",
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
