import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import AnswerForm from "./AnswerForm";
import QuestionCard from "./QuestionCard";
import {
  faMultiply,
  faQuestionCircle,
  faSun,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addQuestion } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";

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
      questionName: question.questionName, // Default value for questionName
      answers: question.answers, // Default empty array for answers
      explain: "",
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

  const isListening =
    skill === "Listening" &&
    sectionType != 1 &&
    sectionType != 2 &&
    sectionType != 3 &&
    sectionType != 7;
  const isReading =
    skill === "Reading" &&
    sectionType !== 7 &&
    sectionType !== 8 &&
    sectionType !== 9 &&
    sectionType !== 10 &&
    sectionType !== 11;
  const showAddQuestion =
    isListening || isReading || skill === "Writing" || skill === "Speaking";

  const listeningAnswerForm =
    skill === "Listening" &&
    (sectionType === 4 ||
      sectionType === 6 ||
      sectionType === 8 ||
      sectionType === 5);

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

  const listeningQB = skill == "Listening" && sectionType == 8;
  const readingQB =
    skill == "Reading" &&
    (sectionType == 1 || sectionType == 2 || sectionType == 3);
  const showSelectQuestionBank =
    listeningQB || readingQB || skill === "Writing" || skill == "Speaking";

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
              {showQuestionForm && (
                <Controller
                  name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${index}.questionName`}
                  control={control}
                  defaultValue={question.questionName || ""}
                  rules={{ required: "Question Name is required" }}
                  render={({ field, fieldState }) => (
                    <div className="mb-2">
                      <textarea
                        {...field}
                        className="border p-1 w-full"
                        placeholder={
                          sectionType === 4 ||
                          sectionType === 6 ||
                          sectionType === 7
                            ? "Heading"
                            : "Question Name"
                        }
                        rows={2} // Optionally set a default height
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
              {/* {((skill == "Reading" && sectionType == 1) ||
                sectionType == 2 ||
                sectionType == 3 ||
                sectionType == 4 ||
                sectionType == 5 ||
                sectionType == 6 ||
                (skill == "Listening" && sectionType == 5) ||
                sectionType == 4 ||
                sectionType == 8) && (
                <div className="mb-4 border p-4 rounded">
                  <Controller
                    name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${index}.explain`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-2">
                          Question Explain
                        </label>
                        <Editor
                          apiKey={import.meta.env.VITE_TINI_APIKEY}
                          onEditorChange={field.onChange} // Directly bind to field.onChange
                          value={field.value} // Bind the value to field.value
                          init={{
                            height: "300px",
                            menubar:
                              "file edit view insert format tools table help",
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | bold italic underline | backcolor forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | removeformat | help | fullscreen | insertinput",
                            setup: (editor) => {
                              editor.ui.registry.addButton("insertinput", {
                                text: "Insert Input",
                                onAction: () => {
                                  const questionId = uuidv4(); // Generate unique questionId
                                  editor.insertContent(
                                    `<input type="text" class="editor-input" data-question-id="${questionId}" />`
                                  );
                                },
                              });
                            },
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px; margin:0; }",
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
              )} */}
            </>
          ) : (
            <>
              {((skill == "Reading" && sectionType == 1) ||
                (skill == "Listening" &&
                  (sectionType == 8 || sectionType == 5)) ||
                skill == "Writing" ||
                skill == "Speaking") && (
                <p>
                  <span className="font-bold">Question Name: </span>
                  {question.questionName}
                </p>
              )}

              {skill !== "Speaking" &&
                skill !== "Writing" &&
                question.answers.length > 0 && (
                  <>
                    {question.answers.map((answer) => (
                      <p key={answer.id}>
                        {(skill === "Reading" && sectionType === 1) ||
                        (skill === "Listening" &&
                          (sectionType === 8 || sectionType === 5)) ? (
                          <span className="font-bold">Answers:</span>
                        ) : (
                          <span className="font-bold">Question:</span>
                        )}{" "}
                        {answer.answerText}
                      </p>
                    ))}
                  </>
                )}
            </>
          )}
        </div>
      ))}
      {showAddQuestion && (
        <div>
          <div className="flex gap-2">
            {!(skill === "Writing" && fields.length > 0) && (
              <>
                {showSelectQuestionBank && (
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
                )}

                <button
                  type="button"
                  onClick={() =>
                    append({
                      questionName: "",
                      answers: [{ answerText: "", isCorrect: 0 }],
                      summary: "",
                      answer: "",
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
              </>
            )}
          </div>
          {showQuestionCard && (
            <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <QuestionCard
                selectedQuestions={fields}
                onSelectQuestions={handleAddSelectedQuestions}
                onClose={() => setShowQuestionCard(false)}
                sectionType={showQuestionCard.sectionType}
                disabledQuestions={fields}
                skill={
                  skill == "Reading"
                    ? 0
                    : skill == "Listening"
                    ? 1
                    : skill == "Writing"
                    ? 2
                    : 3
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
