import React, { useState, useEffect } from "react";
import FillInTheBlankQuestion from "../FillInTheBlankQuestion";
import RadioOption from "../AnswerType/RadioOption";
import MatchingHeading from "../AnswerType/MatchingHeading";

const Reading = ({ partData, part, refs }) => {
  const reading = partData[part];

  if (!reading) {
    return <p>Reading part not found.</p>;
  }

  const [answers, setAnswers] = useState({});
  const [questionsWithOrder, setQuestionsWithOrder] = useState([]);

  useEffect(() => {
    const generateOrderedQuestions = () => {
      let currentOrder = 1;
      const orderedQuestions = [];

      reading.questions.forEach((questionGroup) => {
        Object.keys(questionGroup).forEach((questionType) => {
          switch (questionType) {
            case "multiple-choice":
              questionGroup[questionType].forEach((question) => {
                orderedQuestions.push({ ...question, order: currentOrder });
                currentOrder++;
              });
              break;
            case "enter-answer":
              questionGroup[questionType].forEach((question, index) => {
                orderedQuestions.push({
                  ...question,
                  order: currentOrder,
                });
                currentOrder += question.blanks.length;
              });
              break;
            case "matching-heading":
              questionGroup[questionType].forEach((question, index) => {
                orderedQuestions.push({
                  ...question,
                  order: currentOrder + index,
                });
              });
              currentOrder += questionGroup[questionType].length;
              break;
            default:
              break;
          }
        });
      });

      setQuestionsWithOrder(orderedQuestions);
    };

    generateOrderedQuestions();
  }, [reading.questions]);

  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  return (
    <div className="bg-green-50 h-screen p-3">
      {questionsWithOrder.map((question, index) => {
        switch (question.type) {
          case "multiple-choice":
            return (
              <RadioOption
                key={index}
                ref={(el) => (refs.current[question.id] = el)}
                question={question}
                order={question.order}
                onAnswerChange={(id) => handleAnswerChange(question.id, id)}
              />
            );
          case "enter-answer":
            return (
              <FillInTheBlankQuestion
                key={index}
                ref={(el) => (refs.current[question.id] = el)}
                order={question.order}
                text={question.question}
                blanks={question.blanks}
                onAnswerChange={handleAnswerChange}
              />
            );
          case "matching-heading":
            return (
              <MatchingHeading
                key={index}
                ref={(el) => (refs.current[question.id] = el)}
                order={question.order}
                question={question}
                onAnswerChange={handleAnswerChange}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Reading;
