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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

    dispatch(addQuestion(questionsToAdd)); // add question to store redux

    questionsToAdd.forEach((question) => {
      append({
        questionName: question.questionName,
        answers: question.answers,
        isFromQuestionBank: question.isFromQuestionBank,
        questionType: question.questionType,
        questionId: question.questionId,
      });
    });

    setShowQuestionCard(false);
  };

  const isListening = skill === "Listening" && sectionType !== 3;
  const isReading = skill === "Reading" && sectionType !== 11;

  const showAddQuestion =
    isListening || isReading || skill === "Writing" || skill === "Speaking";

  const listeningAnswerForm =
    skill === "Listening" &&
    (sectionType === 4 || sectionType === 6 || sectionType === 8);

  const readingAnswerForm =
    skill === "Reading" &&
    sectionType !== 11 &&
    sectionType !== 7 &&
    sectionType !== 8 &&
    sectionType !== 9;
  const showAnswerForm = listeningAnswerForm || readingAnswerForm;

  const readingQuestionForm =
    skill === "Reading" &&
    sectionType !== 2 &&
    sectionType !== 3 &&
    sectionType !== 10;
  const listeningListeningForm = skill === "Listening" && sectionType != 4;

  const showQuestionForm =
    listeningListeningForm ||
    readingQuestionForm ||
    skill === "Speaking" ||
    skill === "Writing";

  const readingMessage =
    skill === "Reading" &&
    (sectionType === 7 || sectionType === 8 || sectionType === 9);
  const listeningMessage =
    skill === "Listening" && (sectionType === 2 || sectionType === 7);
  const showMessageExample = readingMessage || listeningMessage;

  return (
    <div>
      <h5 className="font-extrabold">
        <span className="mr-2">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
        </span>
        Questions
      </h5>

      {((skill === "Listening" && sectionType === 3) ||
        (skill === "Reading" && sectionType === 11)) && (
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
              {showMessageExample && (
                <p>
                  this is example about message input field "hahah is not
                  perform [] are ok " "[]" is present for answer
                </p>
              )}
              {showQuestionForm && (
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
              {skill === "Listening" ||
                (skill === "Reading" && (
                  <div className="mb-4 border p-4 rounded">
                    <p className="mb-2 text-gray-600">Explain</p>
                    <Controller
                      name={`skills.${skill}.parts.${index}.sections.${sectionIndex}.questions.${index}.explain`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <div className="mb-2">
                          <CKEditor
                            editor={ClassicEditor}
                            data={field.value || ""} // Set value to CKEditor
                            config={{
                              toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "|",
                                "insertTable", // Add table button to the toolbar
                                "blockQuote",
                                "|",
                                "undo",
                                "redo",
                              ],
                              table: {
                                contentToolbar: [
                                  "tableColumn",
                                  "tableRow",
                                  "mergeTableCells",
                                  "tableProperties",
                                  "tableCellProperties",
                                ],
                              },
                              height: 300, // Optional: Customize height of editor
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              field.onChange(data); // Update value for validation
                            }}
                          />
                          {fieldState.error && (
                            <p className="text-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                ))}
            </>
          ) : (
            <>
              <p>{question.questionName}</p>
              <p>{question.questionType}</p>
              {question.answers.length > 0 &&
                question.answers.map((a) => (
                  <div>
                    <p>AnswerText: {a.answerText}</p>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}

      {showAddQuestion && (
        <div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setShowQuestionCard({ visible: true, sectionType })
              }
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
                  explain: "",
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
                sectionType={showQuestionCard.sectionType}
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
