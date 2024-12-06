import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  faLeftLong,
  faMultiply,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addQuestions,
  updateQuestion,
} from "../../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";
const QuestionFormBank = ({ setIsModalOpen, editQuestion }) => {
  const [questions, setQuestions] = useState([
    {
      questionName: "",
      skillType: 0,
      questionType: 1,
      part: 1,
      answers: [],
    },
  ]);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editQuestion) {
      setValue(`questions[0].questionName`, editQuestion.questionName);
      setValue(`questions[0].skillType`, editQuestion.skill);
      setValue(`questions[0].questionType`, editQuestion.questionType);
      setValue(`questions[0].part`, editQuestion.partNumber);
      setValue(`questions[0].answers`, editQuestion.answers);

      var updateQuestion = {
        questionName: editQuestion.questionName,
        skillType: editQuestion.skill,
        questionType: editQuestion.questionType,
        part: editQuestion.partNumber,
        answers: editQuestion.answers,
      };
      setQuestions([updateQuestion]);
    } else {
      setQuestions([
        {
          questionName: "",
          skillType: 0,
          questionType: 1,
          part: 1,
          answers: [],
        },
      ]);
    }
  }, [editQuestion, setValue]); // Add setValue as dependency to ensure it's called when `editQuestion` changes

  const skillTypes = [
    { value: 0, label: "Reading" },
    { value: 1, label: "Listening" },
    { value: 2, label: "Writing" },
    { value: 3, label: "Speaking" },
  ];

  const questionTypes = {
    0: [1, 2, 3], // Reading: Multiple Choice, True/False, Not Given
    1: [8], // Listening: Multiple Choice
    2: [0], // Writing: Default
    3: [0], // Speaking: Default
  };

  const parts = {
    0: [1, 2, 3], // Reading: 1, 2, 3
    1: [1, 2, 3, 4], // Listening: 1, 2, 3, 4
    2: [1, 2], // Writing: Default
    3: [1, 2, 3], // Speaking: Default
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionName: "", skillType: 0, questionType: 1, part: 1, answers: [] },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].answers.push({ answerText: "", isCorrect: 0 });
    setQuestions(newQuestions);
  };

  const handleDeleteAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const onSubmit = (data) => {
    if (editQuestion) {
      var updateQuestion = data.questions[0];
      dispatch(updateQuestion({ id: editQuestion.id, updateQuestion }));
    } else {
      dispatch(addQuestions(data));
    }
    setIsModalOpen(false);
  };

  const handleSkillTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].skillType = value;

    // Set questionType và part mặc định dựa trên skillType
    newQuestions[index].questionType = questionTypes[value]?.[0] || 0;
    newQuestions[index].part = parts[value]?.[0] || 0;

    setQuestions(newQuestions);
    setValue(
      `questions[${index}].questionType`,
      questionTypes[value]?.[0] || 0
    );
    setValue(`questions[${index}].part`, parts[value]?.[0] || 0);
  };

  const handleQuestionTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionType = value;
    setQuestions(newQuestions);
  };

  const handlePartChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].part = value;
    setQuestions(newQuestions);
  };

  return (
    <>
      <button
        className="border border-red-300 mb-2"
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        Back question banks
        <span className="ml-2">
          <FontAwesomeIcon icon={faLeftLong} />
        </span>
      </button>
      <div className="space-y-4 border border-gray-500 p-4">
        <h3 className="text-center font-bold text-xl "> New Question Form</h3>
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="bg-white p-4 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold">Question {questionIndex + 1}</p>
              <button
                onClick={() => handleDeleteQuestion(questionIndex)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                <FontAwesomeIcon icon={faMultiply} />
              </button>
            </div>
            {((question.skillType == 0 && question.questionType == 1) ||
              (question.skillType == 1 &&
                (question.questionType == 8 || question.questionType == 5)) ||
              question.skillType == 2 ||
              question.skillType == 3) && (
              <div>
                <label className="block text-sm font-semibold">
                  Question Name:
                </label>
                <Controller
                  name={`questions[${questionIndex}].questionName`}
                  control={control}
                  defaultValue={question?.questionName || ""}
                  rules={{ required: "Question name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  )}
                />

                {errors.questions?.[questionIndex]?.questionName && (
                  <p className="text-red-500 text-sm">
                    {errors.questions[questionIndex].questionName.message}
                  </p>
                )}
              </div>
            )}

            {!editQuestion && (
              <>
                <div>
                  <label className="block text-sm font-semibold">
                    Skill Type:
                  </label>
                  <Controller
                    name={`questions[${questionIndex}].skillType`}
                    control={control}
                    defaultValue={question.skillType}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Cập nhật giá trị cho react-hook-form
                          handleSkillTypeChange(
                            questionIndex,
                            Number(e.target.value)
                          ); // Cập nhật logic trong state
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        {skillTypes.map((skill) => (
                          <option key={skill.value} value={skill.value}>
                            {skill.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">
                    Question Type:
                  </label>
                  <select
                    value={question.questionType}
                    onChange={(e) =>
                      handleQuestionTypeChange(
                        questionIndex,
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {questionTypes[question.skillType]?.map((type) => (
                      <>
                        <option key={type} value={type}>
                          {type == 1 || type == 8
                            ? "Multiple Choice"
                            : type == 2
                            ? "True/False"
                            : type == 3
                            ? "Not Given"
                            : "Default"}
                        </option>
                      </>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold">Part:</label>
                  <select
                    value={question.part}
                    onChange={(e) =>
                      handlePartChange(questionIndex, Number(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {parts[question.skillType]?.map((part) => (
                      <option key={part} value={part}>
                        Part {part}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="space-y-2">
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex space-x-4 items-center">
                  <input
                    type="text"
                    value={answer.answerText}
                    onChange={(e) =>
                      handleAnswerChange(
                        questionIndex,
                        answerIndex,
                        "answerText",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Answer Text"
                  />
                  {question.skillType == 0 && question.questionType == 3 ? (
                    <select
                      value={answer.isCorrect}
                      onChange={(e) =>
                        handleAnswerChange(
                          questionIndex,
                          answerIndex,
                          "isCorrect",
                          Number(e.target.value)
                        )
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value={0}>Incorrect</option>
                      <option value={1}>Correct</option>
                      <option value={2}>Not Given</option>
                    </select>
                  ) : (
                    <select
                      value={answer.isCorrect}
                      onChange={(e) =>
                        handleAnswerChange(
                          questionIndex,
                          answerIndex,
                          "isCorrect",
                          Number(e.target.value)
                        )
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value={0}>Incorrect</option>
                      <option value={1}>Correct</option>
                    </select>
                  )}

                  <button
                    onClick={() =>
                      handleDeleteAnswer(questionIndex, answerIndex)
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded-full"
                  >
                    <FontAwesomeIcon icon={faMultiply} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddAnswer(questionIndex)}
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add Answer
              </button>
            </div>
          </div>
        ))}

        <div className="flex space-x-4">
          {!editQuestion && (
            <button
              onClick={handleAddQuestion}
              type="button"
              className="px-4 py-2  border border-gray-400 text-gray rounded-lg"
            >
              Add Question
            </button>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionFormBank;
