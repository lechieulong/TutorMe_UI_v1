import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import AnswerForm from "./AnswerForm";
import QuestionCard from "./QuestionCard";
import TableInput from "./TableInput";
import {
  faMultiply,
  faQuestionCircle,
  faSun,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addQuestion } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const QuestionForm = ({
  skill,
  partIndex,
  sectionIndex,
  control,
  sectionType,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions`,
    control,
  });

  const dispatch = useDispatch();

  const [showQuestionCard, setShowQuestionCard] = useState(false);

  const handleAddSelectedQuestions = (questionsFromBank) => {
    const questionsToAdd = questionsFromBank.map((question) => ({
      questionName: "", // Default value for questionName
      answers: [], // Default empty array for answers
      isFromQuestionBank: true, // Mark as from question bank
      questionType: question.questionType, // Retain questionType if needed
      questionId: question.id, // Assuming `id` is the questionId you want to save
    }));

    dispatch(addQuestion(questionsToAdd));

    // Append questions to the form
    questionsToAdd.forEach((question) => {
      append(question);
    });

    setShowQuestionCard(false);
  };

  const isReading = skill === "Reading" && ![7, 8, 9, 11].includes(sectionType);

  const isListening = skill === "Listening" && [8, 4, 6].includes(sectionType);

  const showAnswerForm = isReading || isListening;

  return (
    <div>
      <h5 className="font-extrabold">
        <span className="mr-2">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
        </span>
        Questions
      </h5>

      {skill === "Listening" && sectionType === 3 && (
        <div className="mb-4 border p-4 rounded">
          <label className="block mb-2 font-bold">Enter Summary content:</label>
          <p className="mb-2 text-gray-600">
            Please summarize the listening content in a few sentences. You can
            include key points, important themes, or your personal insights.
            Example:{" "}
            <em>
              <b>
                "The listening segment discussed the [ ]. of effective
                communication, highlighting the key strategies for [] improving
                interpersonal skills."
              </b>
            </em>
            each <b>[] </b> represent for each question , and <b> [skill]</b>{" "}
            the text in bracket is answer
          </p>
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.summary`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                className="border p-2 w-full h-32 resize-none"
                placeholder="Type your summary here..."
              />
            )}
          />
        </div>
      )}

      {skill === "Listening" && sectionType === 1 && (
        <div className="mb-4 border p-4 rounded">
          <label className="block mb-2 font-bold">Enter Table Content:</label>
          <TableInput
            control={control}
            skill={skill}
            partIndex={partIndex}
            sectionIndex={sectionIndex}
          />
        </div>
      )}

      {fields.map((question, index) => (
        <div key={question.id} className="mb-4 border p-4 rounded">
          <div className="flex p-2 justify-between gap-2 items-center">
            <p> Question {index + 1} </p>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-1 rounded"
            >
              <span>
                <FontAwesomeIcon icon={faMultiply} />
              </span>
            </button>
          </div>
          {!question.isFromQuestionBank ? (
            <>
              {skill === "Listening" &&
                sectionType !== 8 &&
                sectionType !== 4 &&
                sectionType !== 6 && (
                  <p>
                    This example for input field,{" "}
                    <b>
                      "How is go going on the{" "}
                      <span className="text-red-300"> [answerNe] </span> kkkk "{" "}
                    </b>{" "}
                    answer is in "[]"
                  </p>
                )}
              {((skill === "Listening" && sectionType !== 4) ||
                (skill === "Reading" && sectionType !== 10) ||
                skill === "Speaking" ||
                skill === "Writing") && (
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
                          placeholder={
                            sectionType === 4 ||
                            sectionType === 5 ||
                            sectionType === 6 ||
                            sectionType === 7
                              ? "Heading"
                              : "Question Name"
                          }
                        />

                        {fieldState.error && (
                          <p className="text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </>
              )}

              {showAnswerForm && (
                <AnswerForm
                  skill={skill}
                  partIndex={partIndex}
                  sectionIndex={sectionIndex}
                  questionIndex={index}
                  control={control}
                  sectionType={sectionType}
                />
              )}
            </>
          ) : (
            <p>{question.questionName}</p>
          )}
        </div>
      ))}

      {(skill === "Listening" ||
        skill === "Reading" ||
        skill === "Writing" ||
        skill === "Speaking") && (
        <div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowQuestionCard(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Select Questions
              <span className="ml-3">
                <FontAwesomeIcon icon={faToggleOn} />
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                append({
                  questionName: "",
                  answers: [{ answerText: "", isCorrect: 0 }],
                  summary: "",
                  isFromQuestionBank: false,
                  questionType: sectionType,
                })
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
                selectedQuestions={fields}
                onSelectQuestions={handleAddSelectedQuestions}
                onClose={() => setShowQuestionCard(false)}
                disabledQuestions={fields}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
