import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import AnswerForm from "./AnswerForm";
import QuestionCard from "./QuestionCard";
import {
  faAngleDown,
  faMultiply,
  faQuestionCircle,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionForm = ({ skill, partIndex, sectionIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions`,
    control,
  });

  const [showQuestionCard, setShowQuestionCard] = useState(false);

  const handleAddSelectedQuestions = (questionsFromBank) => {
    questionsFromBank.forEach((question) => {
      append({
        questionName: question.questionText,
        answers: [],
        isFromQuestionBank: true,
      });
    });
    setShowQuestionCard(false);
  };

  return (
    <div>
      <h5 className="font-extrabold ">
        <span className="mr-2">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
        </span>
        Questions
      </h5>
      {fields.map((question, index) => (
        <div key={question.id} className="mb-4 border p-4 rounded">
          <div className="flex p-2 justify-between gap-2 items-center">
            <p> Question {index + 1} </p>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-1 rounded "
            >
              <span>
                <FontAwesomeIcon icon={faMultiply} />
              </span>
            </button>
          </div>
          {/* Render the input field only if the question is not from the question bank */}
          {!question.isFromQuestionBank ? (
            <>
              <Controller
                name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${index}.questionName`}
                control={control}
                defaultValue={question.questionName || ""}
                rules={{ required: "Question Name is required" }}
                render={({ field, fieldState }) => (
                  <div className="mb-2">
                    <input
                      {...field}
                      className="border p-1 w-full"
                      placeholder="Question Name"
                    />
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
              <AnswerForm
                skill={skill}
                partIndex={partIndex}
                sectionIndex={sectionIndex}
                questionIndex={index}
                control={control}
              />
            </>
          ) : (
            <p>{question.questionName}</p> // Display question name for bank questions
          )}
        </div>
      ))}

      <div className="flex  gap-2">
        <button
          type="button"
          onClick={() => setShowQuestionCard(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Select Questions
          <span className="ml-3">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
        {/* Button to add a new question */}
        <button
          type="button"
          onClick={() =>
            append({ questionName: "", answers: [], isFromQuestionBank: false })
          }
          className="bg-green-500 text-white p-2 rounded"
        >
          Add New Question
          <span className="ml-3">
            <FontAwesomeIcon icon={faSun} />
          </span>
        </button>
      </div>

      {showQuestionCard && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <QuestionCard
            selectedQuestions={fields} // Pass already selected questions
            onSelectQuestions={handleAddSelectedQuestions}
            onClose={() => setShowQuestionCard(false)}
            disabledQuestions={fields} // Prevent adding duplicate questions from the bank
          />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
